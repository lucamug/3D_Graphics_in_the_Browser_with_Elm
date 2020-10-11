module RALConfig exposing (main)

import Angle exposing (Angle)
import Axis3d
import Browser
import Browser.Events
import Camera3d exposing (Camera3d)
import Color
import Direction3d exposing (Direction3d)
import Frame3d
import Html exposing (Html)
import Html.Attributes
import Html.Events exposing (..)
import Html.Events.Extra.Pointer as Pointer
import Html.Events.Extra.Touch as Touch
import Html.Events.Extra.Mouse as Mouse
import Illuminance exposing (lux)
import Json.Decode as Decode exposing (Decoder)
import Length exposing (Meters, meters, centimeters)
import Pixels exposing (pixels)
import Point2d
import Point3d exposing (Point3d)
import Quantity
import Scene3d
import Scene3d.Chromaticity as Chromaticity
import Scene3d.Drawable as Drawable exposing (Drawable, Material)
import Scene3d.Exposure as Exposure
import Scene3d.Mesh as Mesh exposing (Mesh, NoNormals, NoTangents, NoUV, ShadowsDisabled, ShadowsEnabled, Triangles, WithNormals)
import Scene3d.Light as Light exposing (AmbientLighting, Light)
import Scene3d.Shape as Shape
import SketchPlane3d
import Triangle3d
import Vector2d exposing (..)
import Vector3d exposing (..)
import Viewpoint3d
import Luminance
import LuminousFlux exposing (lumens)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Events as Events
import Element.Border as Border
import Element.Input as Input
import Element.Keyed as Keyed

import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Math.Vector4 as Vec4 exposing (Vec4, vec4)

import Http
import HttpBuilder
import Url.Builder
import QRCode

import Prng.Uuid as Uuid
import Random.Pcg.Extended as Random exposing (Seed, initialSeed, step)


type RALCategory
    = ClassicGlossy
    | DesignMetallic
    | ClassicSemiMatte
    | DesignSemiMatte


type alias RALColor =
    { category : RALCategory
    , name : String
    , code : String
    , diffuseColor : Color.Color
    }


usdMaterialForRAL : String -> RALColor -> String
usdMaterialForRAL superScope ral =
    let
        matName = "RAL_" ++ ral.code
        col = Color.toRgba ral.diffuseColor
        rgbStr = "(" ++ String.fromFloat col.red ++", "++ String.fromFloat col.green ++ ", "++ String.fromFloat col.blue ++")"
        ( metallic, roughness ) = 
            case ral.category of
                DesignMetallic   -> ( "0.85", "0.2" )
                ClassicGlossy    -> ( "0.75", "0.5" )
                ClassicSemiMatte -> ( "0.35", "0.7" )
                DesignSemiMatte  -> ( "0.35", "0.7" )
    in
    """    
        def Material """++ "\"" ++matName ++"\""++"""
        {
            token outputs:surface.connect = </"""++ superScope ++"""/Materials/"""++ matName ++"""/surfaceShader.outputs:surface>

            def Shader "surfaceShader"
            {
                uniform token info:id = "UsdPreviewSurface"
                color3f inputs:diffuseColor = """++ rgbStr ++"""
                color3f inputs:emissiveColor = (0, 0, 0)
                float inputs:metallic = """++ metallic ++"""
                float inputs:occlusion = 0
                float inputs:opacity = """++ String.fromFloat col.alpha ++"""
                float inputs:roughness = """++ roughness ++"""
                token outputs:surface
            }
        }
"""


usdMaterials : String -> List RALColor -> String
usdMaterials superScope rals =
    let
        header = """
    def Scope "Materials"
    {
"""
        footer = """    }
"""
    in
    ( header 
    ++( String.concat 
            (List.map (\r -> usdMaterialForRAL superScope r) rals) 
      )
    ++footer
    )


type World
    = World


type alias Flags =
  { userAgent : String
  , seed : Int
  , seedExtension : List Int
  }



{-| Returns `Just` the element at the given index in the list,
or `Nothing` if the index is out of range.
-}
getAt : Int -> List a -> Maybe a
getAt idx xs =
    if idx < 0 then
        Nothing
    else
        List.head <| List.drop idx xs

{-| The mapAccuml function behaves like a combination of map and foldl; it applies a
function to each element of a list, passing an accumulating parameter from left to right,
and returning a final value of this accumulator together with the new list.
    mapAccuml f a0 [ x1, x2, x3 ] == ( a3, [ y1, y2, y3 ] )
    --        x1    x2    x3
    --        |     |     |
    --  a0 -- f --- f --- f -> a3
    --        |     |     |
    --        y1    y2    y3
Add a running total to a list of numbers:
    mapAccuml (\a x -> ( a + x, ( x, a + x ) )) 0 [ 2, 4, 8 ]
        --> ( 14, [ ( 2, 2 ), ( 4, 6 ), ( 8, 14 ) ] )
Map number by multiplying with accumulated sum:
    mapAccuml (\a x -> ( a + x, a * x )) 5 [ 2, 4, 8 ]
        --> ( 19, [ 10, 28, 88 ] )
-}
mapAccuml : (a -> b -> ( a, c )) -> a -> List b -> ( a, List c )
mapAccuml f acc0 list =
    let
        ( accFinal, generatedList ) =
            List.foldl
                (\x ( acc1, ys ) ->
                    let
                        ( acc2, y ) =
                            f acc1 x
                    in
                    ( acc2, y :: ys )
                )
                ( acc0, [] )
                list
    in
    ( accFinal, List.reverse generatedList )


{-| Reduce a list from the left, building up all of the intermediate results into a list.
    scanl (+) 0 [ 1, 2, 3, 4 ]
    --> [ 0, 1, 3, 6, 10 ]
-}
scanl : (a -> b -> b) -> b -> List a -> List b
scanl f b xs =
    let
        scan1 x accAcc =
            case accAcc of
                acc :: _ ->
                    f x acc :: accAcc

                [] ->
                    []

        -- impossible
    in
    List.reverse (List.foldl scan1 [ b ] xs)



type alias Model =
    { azimuth : Angle
    , elevation : Angle
    , distance : Float

    , touchStarted : List Touch.Touch 
    , touchMoveActive : Bool

    , moveStartedX : Float
    , moveStartedY : Float
    , mouseMoveActive : Bool

    , supportsArKit : Bool
    , lastError : Maybe String
    , currentSeed : Seed
    , currentUuid : Maybe Uuid.Uuid
    , baseUrl : String
    , downloadUrl : String

    , world : List (Drawable World)
    , blockHeight : Length.Length
    , blockWidth  : Length.Length
    , blockDepth  : Length.Length
    , palette : List RALColor
    , ralCode : String
    , color : Color.Color
    }


type Msg
    {-
    = MouseDown
    | MouseUp
    | MouseMove Float Float
-}
    = StartMove ( Float, Float )
    | Move ( Float, Float )
    | EndMove ( Float, Float )
    | CancelMove ( Float, Float )

    | StartMoveList (List Touch.Touch)
    | MoveList (List Touch.Touch)
    | EndMoveList (List Touch.Touch)
    | CancelMoveList (List Touch.Touch)

    | Export
    | ClearDownloadUrl
    | GotUrl (Result Http.Error String)
    -- the following Messages need to also re-popluateWorld 
    | SelectRAL String

supportsArKit ua =
  ( List.length (String.indexes "Safari" ua)) > 0 && 
  ((List.length (String.indexes "OS 12 " ua)) > 0 || (List.length (String.indexes "OS 13 " ua)) > 0 )

ralByCode : String -> List RALColor -> Maybe RALColor
ralByCode code colors =
    List.filterMap (\c -> if c.code == code then Just c else Nothing) colors |> List.head


init : Flags -> (Model, Cmd Msg)
init flags =
    let
        startSeed = initialSeed flags.seed flags.seedExtension
        startWidth = Length.meters 1.0
        startDepth = Length.meters 1.0
        startHeight = Length.meters 1.0
        startPalette = 
            [ RALColor ClassicGlossy    "Beige"           "1001" (Color.rgb 0.82 0.69 0.52)
            , RALColor ClassicGlossy    "Hellelfenbein"   "1015" (Color.rgb 0.90 0.82 0.71)
            , RALColor ClassicGlossy    "Rapsgelb"        "1021" (Color.rgb 0.96 0.71 0.00)
            , RALColor ClassicGlossy    "Verkehrsgelb"    "1023" (Color.rgb 0.97 0.71 0.00)
            , RALColor ClassicGlossy    "Rotorange"       "2001" (Color.rgb 0.73 0.28 0.11)
            , RALColor ClassicGlossy    "Hellrotorange"   "2008" (Color.rgb 0.93 0.42 0.13)
            , RALColor ClassicGlossy    "Rubinrot"        "3003" (Color.rgb 0.53 0.10 0.13)
            , RALColor ClassicGlossy    "Purpurot"        "3004" (Color.rgb 0.42 0.11 0.14)
            , RALColor ClassicGlossy    "Rotviolett"      "4002" (Color.rgb 0.55 0.24 0.29)
            , RALColor ClassicGlossy    "Bordeauxviolett" "4004" (Color.rgb 0.40 0.12 0.22)
            , RALColor ClassicGlossy    "Ultramarin"      "5002" (Color.rgb 0.00 0.22 0.48)
            , RALColor ClassicGlossy    "Brillantblau"    "5007" (Color.rgb 0.22 0.42 0.55)
            , RALColor ClassicGlossy    "Moosgrün"        "6005" (Color.rgb 0.07 0.26 0.20)
            , RALColor ClassicGlossy    "Tannengrün"      "6009" (Color.rgb 0.15 0.21 0.16)
            , RALColor ClassicGlossy    "Resedagrün"      "6011" (Color.rgb 0.42 0.49 0.35)
            , RALColor ClassicGlossy    "Silbergrau"      "7001" (Color.rgb 0.55 0.59 0.62)
            , RALColor ClassicGlossy    "Anthrazitgrau"   "7016" (Color.rgb 0.22 0.24 0.26)
            , RALColor ClassicSemiMatte "Staubgrau"       "7037" (Color.rgb 0.48 0.48 0.48)
            , RALColor ClassicGlossy    "Sepiabraun"      "8014" (Color.rgb 0.29 0.21 0.15)
            , RALColor ClassicGlossy    "Graubraun"       "8019" (Color.rgb 0.24 0.21 0.21)
            , RALColor ClassicGlossy    "Cremeweiß"       "9001" (Color.rgb 0.91 0.88 0.82)
            , RALColor ClassicSemiMatte "Signalschwarz"   "9004" (Color.rgb 0.17 0.17 0.17)
            , RALColor ClassicSemiMatte "Tiefschwarz"     "9005" (Color.rgb 0.05 0.05 0.06)
            , RALColor ClassicGlossy    "Weißaluminium"   "9006" (Color.rgb 0.63 0.63 0.63)
            , RALColor ClassicGlossy    "Graualuminium"   "9007" (Color.rgb 0.53 0.52 0.51)
            , RALColor ClassicGlossy    "Reinweiß"        "9010" (Color.rgb 0.95 0.93 0.88)
            , RALColor ClassicGlossy    "Graphitschwarz"  "9011" (Color.rgb 0.15 0.16 0.17)
            , RALColor ClassicGlossy    "Verkehrsweiß"    "9016" (Color.rgb 0.95 0.94 0.92)
            ]
        startRAL = RALColor ClassicGlossy "Verkehrsweiß" "9016" (Color.rgb 0.95 0.94 0.92)
    in
    ( { azimuth = Angle.degrees 235
      , elevation = Angle.degrees 30
      , distance = 4.0
      , touchStarted = []
      , touchMoveActive = False
      , moveStartedX = 0.0
      , moveStartedY = 0.0
      , mouseMoveActive = False
      , supportsArKit = supportsArKit flags.userAgent
      , lastError = Nothing
      , currentSeed = startSeed
      , currentUuid = Nothing
      , baseUrl = "http://quicklook.ar-launchpad.com" -- change this to your own domain, running an instance of the USDZerve backend
      , downloadUrl = ""
      , world = populateWorld startRAL.diffuseColor startWidth startDepth startHeight
      , blockWidth = startWidth
      , blockDepth = startDepth
      , blockHeight = startHeight
      , palette = startPalette
      , ralCode = startRAL.code
      , color = startRAL.diffuseColor
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        StartMoveList touches ->
            ( { model 
              | touchStarted = touches 
              , touchMoveActive = True
              }
            , Cmd.none
            )

        EndMoveList _ ->
            ( { model 
              | touchStarted = []
              , touchMoveActive = False
              }
            , Cmd.none
            )
        CancelMoveList _ ->
            ( { model 
              | touchStarted = []
              , touchMoveActive = False
              }
            , Cmd.none
            )
        MoveList touches ->
            if model.touchMoveActive then
                case (touches, model.touchStarted) of 
                    ([endPos],[startPos]) -> 
                        let
                            (x, y) = endPos.clientPos
                            (startX, startY) = startPos.clientPos
                            pan  = (x - startX)
                            tilt = (y - startY)
                            newAzimuth = model.azimuth |> Quantity.minus (Angle.degrees pan)
                            newElevation =
                                model.elevation
                                    |> Quantity.plus (Angle.degrees tilt)
                                    |> Quantity.clamp
                                        (Angle.degrees 10)
                                        (Angle.degrees 85)
                        in
                        ( { model 
                          | touchStarted = touches
                          , azimuth = newAzimuth
                          , elevation = newElevation
                          }
                        , Cmd.none 
                        )
                    ([endA, endB], [startA, startB]) ->
                        let
                            distEnd   = touchDistance endA   endB
                            distStart = touchDistance startA startB
                            quot = ((distStart / distEnd) - 1.0)
                        in 
                        if quot > 0.005 || quot < -0.005
                            then
                                let
                                    newDistance = model.distance * (1.0 + quot)
                                in
                                ( { model 
                                  | touchStarted = touches
                                  , distance = newDistance
                                  }
                                , Cmd.none
                                )
                            else 
                                let
                                    c = 3 -- 6
                                    (x, y) = endA.clientPos
                                    (startX, startY) = startA.clientPos
                                    panX =  (x - startX) / c
                                    panY = -(y - startY) / c
                                in
                                -- pan
                                ( { model | touchStarted = touches }, Cmd.none )
                    _ -> ( { model | touchStarted = touches }, Cmd.none)
            else
                ( model, Cmd.none )

        StartMove (startX, starY) ->
            ( { model 
              | mouseMoveActive = True 
              , moveStartedX = startX
              , moveStartedY = starY
              }
            , Cmd.none 
            )
        EndMove _ ->
            ( { model | mouseMoveActive = False }, Cmd.none)
        CancelMove _ ->
            ( { model | mouseMoveActive = False }, Cmd.none)

        Move ( x, y ) ->
            if model.mouseMoveActive then
                let
                    dx = model.moveStartedX - x
                    dy = model.moveStartedY - y
                    newAzimuth =
                        model.azimuth |> Quantity.plus (Angle.degrees dx)

                    newElevation =
                        model.elevation
                            |> Quantity.minus (Angle.degrees dy)
                            |> Quantity.clamp
                                (Angle.degrees 10)
                                (Angle.degrees 85)
                in
                ( { model 
                  | azimuth = newAzimuth
                  , elevation = newElevation 
                  , moveStartedX = x
                  , moveStartedY = y
                  }
                , Cmd.none
                )
            else
                ( model, Cmd.none )

        Export ->
            let
                ( newUuid, newSeed ) =
                    step Uuid.generator model.currentSeed
            in
            ( { model 
              | currentUuid = Just newUuid
              , currentSeed = newSeed
              , downloadUrl = (model.baseUrl++"/models/myRAL.usdz#allowContentScaling=0") -- for testing
              }
            , requestUSDZ model.baseUrl newUuid (exportScene model)
            )

        GotUrl (Ok url) ->
            ( { model | downloadUrl = url ++ "#allowContentScaling=0" }
            , Cmd.none
            )

        GotUrl (Err err) ->
            ( model --{ model | lastError = Just (errToString err) } 
            , Cmd.none
            )

        ClearDownloadUrl ->
            ( { model | downloadUrl = "" }
            , Cmd.none
            )

        SelectRAL code ->
            ( case ralByCode code model.palette of
                Just newColor -> 
                    { model 
                    | color = newColor.diffuseColor
                    , ralCode = code
                    , world = populateWorld newColor.diffuseColor model.blockWidth model.blockDepth model.blockHeight
                    , downloadUrl = ""
                    }
                Nothing -> model
            , Cmd.none
            )
{-
decodeMouseMove : Decoder Msg
decodeMouseMove =
    Decode.map2 MouseMove
        (Decode.field "movementX" Decode.float)
        (Decode.field "movementY" Decode.float)


subscriptions : Model -> Sub Msg
subscriptions model =
    if model.orbiting then
        Sub.batch
            [ Browser.Events.onMouseMove decodeMouseMove
            , Browser.Events.onMouseUp (Decode.succeed MouseUp)
            ]
    else
        Browser.Events.onMouseDown (Decode.succeed MouseDown)
-}

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.batch
    [ --onResize ResizeWindow
    ]


-- USDA related with UpAxis="Y"

exportSt : List (Float, Float) -> String
exportSt points =
    let
        pointList = 
            List.map 
                (\(x, y) -> 
                    (  "("  ++ String.fromFloat x
                    ++ ", " ++ String.fromFloat y
                    ++ ")"
                    )
                ) points
    in
    ( "[" ++ String.join ", " pointList ++ "]" )


exportPoints : List (Float, Float, Float) -> String
exportPoints points =
    let
        pointList = 
            List.map 
                (\(x, y, z) -> 
                    (  "("  ++ String.fromFloat x
                    ++ ", " ++ String.fromFloat y
                    ++ ", " ++ String.fromFloat z
                    ++ ")"
                    )
                ) points
    in
    ( "[" ++ String.join ", " pointList ++ "]" )


exportBlock : String -> String -> Length.Length -> Length.Length -> Length.Length -> Point3d Meters World -> String
exportBlock name ralCode lw ld lh pos =
    let
        w = Length.inCentimeters lw
        h = Length.inCentimeters lh
        d = Length.inCentimeters ld

        vert = [(w, h, d), (w, h, 0), (0, h, 0), (0, h, d), (w, 0, d), (w, 0, 0), (0, 0, 0), (0, 0, d)]

        v = Point3d.toRecord Length.inCentimeters pos -- USD normally works in centimeters

        vStr = String.fromFloat v.x ++ ", "++ String.fromFloat v.z ++ ", "++ String.fromFloat v.y -- note the flip of Y and Z

        extendStr = ("[(0, 0, 0), (" ++ String.fromFloat w ++ ", " ++ String.fromFloat h ++ ", " ++ String.fromFloat d ++ ")]")
    in
    """
def Xform """ ++ ("\"") ++ name ++ ("\"") ++"""
{
    matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (""" ++ vStr ++ """, 1) )
    uniform token[] xformOpOrder = ["xformOp:transform"]

    def Xform "Geom"
    {
        matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )
        uniform token[] xformOpOrder = ["xformOp:transform"]

        def Mesh "WoodTextured"
        {
            matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )
            uniform token[] xformOpOrder = ["xformOp:transform"]
            float3[] extent = """ ++ extendStr ++ """
            int[] faceVertexCounts = [4, 4, 4, 4, 4, 4]
            int[] faceVertexIndices = [0, 1, 2, 3, 4, 7, 6, 5, 0, 4, 5, 1, 1, 5, 6, 2, 2, 6, 7, 3, 4, 0, 3, 7]
            rel material:binding = </ral/Materials/RAL_"""++ ralCode++""">
            point3f[] points = """ ++ exportPoints vert ++ """
            normal3f[] primvars:normals = [(-0, 1, -0), (-0, -1, 0), (1, -0, -0), (-0, 0, -1), (-1, 0, 0), (0, -0, 1)] (
                interpolation = "faceVarying"
            )
            int[] primvars:normals:indices = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5]
            uniform token subdivisionScheme = "none"
        }
    }
}
"""


exportScene : Model -> String
exportScene model =
    let
        exportedItems =
            [[ (exportBlock "RALsample" model.ralCode model.blockWidth model.blockDepth model.blockHeight Point3d.origin) ]]

        prolog = """#usda 1.0
(
    customLayerData = {
        string creator = "Web based configurator 0.90beta"
    }
    defaultPrim = "ral"
    metersPerUnit = 0.01
    upAxis = "Y"
)

def Xform "ral" (
    assetInfo = {
        string name = "ral"
    }
    kind = "component"
)
{
    def Scope "Geom"
    {
        def Xform "myRAL_tex"
        {
            matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )
            uniform token[] xformOpOrder = ["xformOp:transform"]

            def Xform "Geom"
            {
                matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )
                uniform token[] xformOpOrder = ["xformOp:transform"]

                def Xform "RAL_set"
                {
                    matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )
                    uniform token[] xformOpOrder = ["xformOp:transform"]

                    def Xform "RAL_grp"
                    {
"""
        place = -- center the group of items
            { x = -(Length.inCentimeters model.blockWidth ) / 2.0
            , y = -(Length.inCentimeters model.blockDepth ) / 2.0
            , z = -(Length.inCentimeters model.blockHeight) / 2.0
            } -- USD normally works in centimeters

        -- note the flip of Y and Z while placing the group of items
        epilog = """
                        matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (""" ++ String.fromFloat place.x ++ ", "++ String.fromFloat place.z ++ ", "++ String.fromFloat place.y ++ """, 1) )
                        uniform token[] xformOpOrder = ["xformOp:transform"]
                    }
                }
            }
        }
    }"""
        endScope = """
}
"""
    in
    -- we split in prolog, list and epilog, because the elm parser cannot handle massive line counts in expressions
    (  prolog 
    ++ (String.join "" (List.concat exportedItems)) 
    ++ epilog
    ++ usdMaterials "ral" model.palette
    ++ endScope
    )


urlDecoder : Decode.Decoder String
urlDecoder =
    Decode.string


requestUSDZ : String -> Uuid.Uuid -> String -> Cmd Msg
requestUSDZ base uuid usda =
    Url.Builder.crossOrigin
        base
        [ "USDZerveApp", "api", "Model" ]
        [ Url.Builder.string "uuid" (Uuid.toString uuid)
        , Url.Builder.string "productKey" "SecretKey" -- change this for your App
        , Url.Builder.string "procedure" "usda2z" -- how the BODY content should be treated to create the USDZ arcive (i.e. convert ASCII to Crate and Zip with Texture(s))
        ]
        |> HttpBuilder.post
        |> HttpBuilder.withStringBody "text/plain" usda
        |> HttpBuilder.withTimeout 10000
        |> HttpBuilder.withExpect (Http.expectJson GotUrl urlDecoder)
        |> HttpBuilder.request


-- Scene3d with WebGL

floor : Drawable World
floor =
    let
        floorMesh = Shape.block (Length.meters 3) (Length.meters 3) (Length.centimeters 1)
    in
    Drawable.physical 
        { baseColor = Color.white, roughness = 0.25, metallic = False }
        floorMesh
        |> Drawable.placeIn (Frame3d.atPoint (Point3d.meters 0 0 -0.01))


sunlight : Light World
sunlight =
    Light.directional
        Chromaticity.daylight
        (lux 16000)
        (Direction3d.negativeZ
            |> Direction3d.rotateAround Axis3d.x (Angle.degrees  20)
            |> Direction3d.rotateAround Axis3d.z (Angle.degrees -20)
        )


ambientLighting : AmbientLighting World
ambientLighting =
    Light.overcast
        { zenithDirection = Direction3d.positiveZ
        , zenithLuminance = Luminance.nits 12000
        , chromaticity = Chromaticity.daylight
        }


{-
cameraMatrix3d : { m11 : Float, m21 : Float, m31 : Float, m41 : Float, m12 : Float, m22 : Float, m32 : Float, m42 : Float, m13 : Float, m23 : Float, m33 : Float, m43 : Float, m14 : Float, m24 : Float, m34 : Float, m44 : Float } -> String
cameraMatrix3d { m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44 } =
    [ m11, -m21, m31, m41, m12, -m22, m32, m42, m13, -m23, m33, m43, m14, -m24, m34, m44 ]
        |> List.map String.fromFloat
        |> List.intersperse ","
        |> List.foldr (++) ""
        |> (\s -> "matrix3d(" ++ s ++ ")")


objectMatrix3d : { m11 : Float, m21 : Float, m31 : Float, m41 : Float, m12 : Float, m22 : Float, m32 : Float, m42 : Float, m13 : Float, m23 : Float, m33 : Float, m43 : Float, m14 : Float, m24 : Float, m34 : Float, m44 : Float } -> String
objectMatrix3d { m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44 } =
    [ m11, m21, m31, m41, -m12, -m22, -m32, -m42, m13, m23, m33, m43, m14, m24, m34, m44 ]
        |> List.map String.fromFloat
        |> List.intersperse ","
        |> List.foldr (++) ""
        |> (\s -> "matrix3d(" ++ s ++ ")")


uiColumn : Float -> Float -> Mat4 -> List (Element.Attribute msg) -> List (Element.Element msg) -> Html.Html msg
uiColumn width height matrix attrs elements =
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        , Html.Attributes.style "background-color" "rgba(0,0,0,0)"
        , Html.Attributes.style "transform-style" "preserve-3d"
        , Html.Attributes.style "width" (String.fromFloat width ++ "px")
        , Html.Attributes.style "height" (String.fromFloat height ++ "px")
        , Html.Attributes.style "transform" ("translate3d(-50%, -50%, 0) " ++ objectMatrix3d (Mat4.toRecord matrix))
        ]
        [ layout
            [ htmlAttribute (Html.Attributes.style "width"    "100%")
            , htmlAttribute (Html.Attributes.style "height"   "100%")
            ]
            ( column 
                attrs
                elements
            )
        ]


cssCamera : Float -> Int -> Int -> Mat4 -> List (Html.Html Msg) -> Html.Html Msg
cssCamera fov width height matrix =
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "transform-style" "preserve-3d"
        , Html.Attributes.style "width" (String.fromInt width ++ "px")
        , Html.Attributes.style "height" (String.fromInt height ++ "px")
        , Html.Attributes.style "transform"
            (""
                ++ "translate3d(0,0,"
                ++ String.fromFloat fov
                ++ "px)"
                ++ cameraMatrix3d (Mat4.toRecord matrix)
                ++ "translate3d("
                ++ String.fromInt (width // 2)
                ++ "px,"
                ++ String.fromInt (height // 2)
                ++ "px,"
                ++ "0)"
            )
        ]
-}

-- selectableColor = rgb255  35  45  65
selectedColor   = rgb255 120 120 120
darkGray        = rgb255  60  60  60
brightGray      = rgb255 240 240 240
colBtnColor     = rgb 0.15 0.6 0.15
plateBtnColor   = rgb 0.2 0.2 0.8
itemBtnColor    = rgb (0.9*0.8) (0.78*0.8) (0.64*0.8)

itemColor            = Color.rgb 0.9 0.78 0.64
highlightColumnColor = Color.rgb 0.2 0.8  0.2
highlightPlateColor  = Color.rgb 0.2 0.2  0.8


addEllipsis : List (Element.Attribute Msg) -> List (Element.Attribute Msg)
addEllipsis attrList = 
  attrList ++
  [ htmlAttribute <| Html.Attributes.style "overflow" "hidden" 
  , htmlAttribute <| Html.Attributes.style "text-overflow" "ellipsis" 
  , htmlAttribute <| Html.Attributes.style "display" "block" 
--, htmlAttribute <| Html.Attributes.style "white-space" "nowrap" 
  ]


centerText : Element.Attribute Msg
centerText =
  htmlAttribute <| Html.Attributes.style "text-align" "center"


buttonStyle : Color.Color -> Color.Color -> List (Element.Attribute Msg)
buttonStyle bg fg =
  [ Background.color (Element.fromRgb (Color.toRgba bg))
  , Font.color (Element.fromRgb (Color.toRgba fg))
  , Border.rounded 4
  , padding 4
  --, width (fill |> minimum 100)
  , centerText
  ]

populateWorld : Color.Color -> Length.Length -> Length.Length -> Length.Length -> List (Drawable World)
populateWorld color w d h =
    let
        blockMesh = 
            Shape.block w d h
                |> Mesh.enableShadows
        mat = { baseColor = color, roughness = 0.1, metallic = True }
        frame = Frame3d.atPoint Point3d.origin
        w2 = Length.centimeters (Length.inCentimeters w / 2.0)
        d2 = Length.centimeters (Length.inCentimeters d / 2.0)
        h2 = Length.centimeters (Length.inCentimeters h / 2.0)
        drawnItem =
            Drawable.physical mat blockMesh
                    |> Drawable.withShadow blockMesh
                    |> Drawable.placeIn frame
                    |> Drawable.translateIn Direction3d.negativeX w2
                    |> Drawable.translateIn Direction3d.negativeY d2
                    |> Drawable.translateIn Direction3d.positiveZ h2
    in
    ( floor :: [ drawnItem ]
    )

-- TOUCH helper

touchList : Touch.Event -> List Touch.Touch
touchList touchEvent =
  touchEvent.touches


touchDistance : Touch.Touch -> Touch.Touch -> Float
touchDistance a b =
  let
    (x1, y1) = a.clientPos
    (x2, y2) = b.clientPos
  in 
    sqrt ((x2-x1)^2.0 + (y2-y1)^2.0)


-- POINTER helper

relativePos : Pointer.Event -> ( Float, Float )
relativePos event =
  event.pointer.offsetPos


-- VIEW

view : Model -> Html Msg
view model =
    let
        viewpoint =
            Viewpoint3d.orbit
                { focalPoint = Point3d.meters 0 0 0
                , groundPlane = SketchPlane3d.xy
                , azimuth = model.azimuth
                , elevation = model.elevation
                , distance = Length.meters model.distance
                }

        camera =
            Camera3d.perspective
                { viewpoint = viewpoint
                , verticalFieldOfView = Angle.degrees 45
                , clipDepth = Length.meters 0.1
                }
    in
    layout
        [ Font.size 18 
        , htmlAttribute (Html.Attributes.style "overflow" "hidden")
        , htmlAttribute (Html.Attributes.style "width"    "100%")
        , htmlAttribute (Html.Attributes.style "height"   "100%")
        ]
        ( column 
            [ inFront (
                if model.downloadUrl /= ""
                    then 
                    column 
                        [ width (px 300), padding 10, Background.color (rgba 1 1 1 1)
                        , centerY, centerX
                        , Border.dashed, Border.width 2
                        , Font.size 16
                        , centerText
                        , pointer
                        ]
                        [ el [alignTop, alignRight, Font.size 32] (text "×")
                        , html (
                            Html.div 
                            [ Html.Attributes.style "width"  "280px"
                            , Html.Attributes.style "height" "240px"
                            , onClick ClearDownloadUrl
                            ]
                            [ ( QRCode.encode model.downloadUrl
                                    |> Result.map QRCode.toSvg
                                    |> Result.withDefault
                                        (Html.text "Error while encoding to QRCode.")
                                )
                            ]
                            )
                        , el [centerX] (text "Scan this QRCode with an iPhone")
                        , el [centerX] (text "or iPad running iOS12 or newer.")
                        ]
                    else none
                )
            , inFront
                ( row [ width fill, spacing 6, centerX ]
                    [ column
                        [ alignRight, alignTop, padding 6, spacing 6 ]
                        [ if model.downloadUrl == ""
                            then
                            row 
                                [ width fill, padding 10, spacing 10, centerX ] 
                                [ Input.button []
                                    { onPress = Just Export
                                    , label = 
                                        paragraph 
                                        [ Background.color selectedColor
                                        , Font.color darkGray
                                        , Border.rounded 4
                                        , padding 8
                                        , spacing 8
                                        --, centerText
                                        ]
                                        [ text "Create"
                                        , image 
                                            [ width (px 47), height (px 54) ] 
                                            { src = "assets/arkit-icon.svg"
                                            , description="AR Quicklook button"
                                            }
                                        ]
                                    }
                                ]
                            else
                            row 
                                [ width fill, padding 10 ] 
                                [ downloadAs 
                                    []
                                    { label= 
                                        image 
                                            [ width (px 47), height (px 54) ] 
                                            { src = "assets/arkit-icon.svg" 
                                            , description = "AR Quicklook button"
                                            }
                                    , filename = "myRAL.usdz"
                                    , url = model.downloadUrl
                                    }
                                ]
                        ]
                    ]
                )
            , width fill
            , alignLeft
            ]
            [ el
                [ pointer
                , htmlAttribute (Touch.onStart  (touchList >> StartMoveList  ))
                , htmlAttribute (Touch.onMove   (touchList >> MoveList       ))
                , htmlAttribute (Touch.onCancel (touchList >> CancelMoveList ))
                , htmlAttribute (Touch.onEnd    (touchList >> EndMoveList    ))
                , htmlAttribute (Mouse.onDown   (.clientPos >> StartMove ))
                , htmlAttribute (Mouse.onMove   (.clientPos >> Move      ))
                , htmlAttribute (Mouse.onUp     (.clientPos >> EndMove   ))
                ] 
                ( html ( Scene3d.render []
                    { ambientLighting = Just ambientLighting
                    , lights = Scene3d.oneLight sunlight { castsShadows = True }
                    , camera = camera
                    , width = Pixels.pixels 800
                    , height = Pixels.pixels 400
                    --, width = Pixels.pixels 375 -- iPhone X, XS, 11Pro
                    --, height = Pixels.pixels 200 
                    , exposure = Exposure.fromEv100 14
                    , whiteBalance = Chromaticity.daylight
                    }
                    model.world
                ))
            , wrappedRow [ width fill, height (fill |> maximum 350), spacing 10, padding 10, scrollbarY ]
                ( List.map 
                    ( \c -> -- create a color menu
                        let
                            colorRec = Color.toRgba c.diffuseColor
                            colorSum =  colorRec.red + colorRec.green + colorRec.blue
                            fgColor = if colorSum > 0.85 then Color.rgb255 5 5 5 else Color.rgb255 240 240 240
                        in
                        Input.button [ width (px 300) ]
                            { onPress = Just (SelectRAL c.code)
                            , label = 
                                (row [ width fill, spacing 10 ]
                                [ el 
                                    ((buttonStyle c.diffuseColor fgColor) ++ [ width (fillPortion 4), height (px 50), centerY ]) 
                                    (text ("RAL "++c.code))
                                , column
                                    [ width (fillPortion 6), height fill, spacing 5 ]
                                    [ text c.name
                                    , paragraph [ width fill, Font.size 12 ] 
                                        [ text "Glanzgrad "
                                        , text 
                                            ( case c.category of
                                                ClassicGlossy    -> "75 +/- 10 GE"
                                                ClassicSemiMatte -> "35 +/- 5 GE"
                                                DesignSemiMatte  -> "35 +/- 5 GE"
                                                DesignMetallic   -> "75 +/- 10 GE"
                                            )
                                        ]
                                    ]
                                ])
                            }
                    )
                    model.palette
                )
            ]
        )

main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


-- C:\Apache24\bin\httpd.exe
-- cd examples; elm make RALConfig.elm --optimize --output=C:\Apache24\htdocs\RALConfig.js
-- cd examples; elm make RALConfig.elm --optimize --output=C:\inetpub\wwwroot\RALConfig.js
-- cd examples; elm make RALConfig.elm --optimize --output=RALConfig.js

