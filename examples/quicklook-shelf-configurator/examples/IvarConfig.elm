module IvarConfig exposing (main)

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


type World
    = World


type alias Flags =
  { userAgent : String
  , seed : Int
  , seedExtension : List Int
  }


type IvarWidth
  = Narrow
  | Wide

widthInCm : IvarWidth -> Float
widthInCm iw =
    case iw of
        Narrow -> 42.0
        Wide -> 83.0


gapInCm = 1.0

plateHeight = Length.centimeters 2.0

slotStepInCm = 3.2


type IvarDepth
  = Shallow 
  | Deep

depthInCm : IvarDepth -> Float
depthInCm id =
    case id of
        Shallow -> 30.0
        Deep -> 50.0


type IvarHeight
  = Tall
  | Medium
  | Small

heightInCm : IvarHeight -> Float
heightInCm ih =
    case ih of
        Small -> 124.0
        Medium -> 179.0
        Tall -> 226.0


type IvarTurn
  = TurnLeft
  | TurnRight

type Ivar
  = IvarCorner IvarHeight IvarTurn  Int (List Int)
  | IvarColumn IvarHeight IvarWidth Int (List Int)

type UIMode
  = Show 
  | Plates
  | Extend

maxSlot : IvarHeight -> Int
maxSlot h =
  case h of 
    Tall   -> 69
    Medium -> 54
    Small  -> 37


newColumn : IvarHeight -> IvarWidth -> Ivar
newColumn h w =
  case h of 
    Tall   -> IvarColumn h w 0 [ 0, 12, 24, 37, 54, 69 ]
    Medium -> IvarColumn h w 0 [ 0, 12, 24, 37, 54 ]
    Small  -> IvarColumn h w 0 [ 0, 12, 24, 37 ]

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
    , basket : List Ivar
    , world : List (Drawable World)
    , columnSelected : Maybe Int
    , futureHeight : IvarHeight
    , futureWidth : IvarWidth
    , depth : IvarDepth
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
    | ToggleDepth
    | AddLeft Ivar 
    | AddRight Ivar
    | SelectNextColumn
    | SelectPrevColumn
    | ToggleWidthOrDir
    | SetHeight IvarHeight
    | Remove
    | AddPlate
    | SelectNextPlate
    | SelectPrevPlate
    | MovePlate Bool 
    | RemovePlate


supportsArKit ua =
  ( List.length (String.indexes "Safari" ua)) > 0 && 
  ((List.length (String.indexes "OS 12 " ua)) > 0 || (List.length (String.indexes "OS 13 " ua)) > 0 )


init : Flags -> (Model, Cmd Msg)
init flags =
    let
        newBasket = -- offer a shelf with 3 different columns prepopulated with plates at top and bottom
            [ IvarColumn Tall   Wide   0 [3,         maxSlot Tall   ] 
            , IvarColumn Medium Narrow 0 [3, 15, 25, maxSlot Medium ]
            , IvarColumn Small  Wide   0 [3,         maxSlot Small  ]
            ]
        startSeed = initialSeed flags.seed flags.seedExtension
        startDepth = Shallow
        startColumn = Just 1
    in
    ( { azimuth = Angle.degrees 235
      , elevation = Angle.degrees 30
      , distance = 8
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
      , basket = newBasket 
      , world = populateWorld startColumn startSeed startDepth newBasket
      , columnSelected = startColumn -- select middle column
      , futureHeight = Medium -- make added columns of medium height
      , futureWidth = Wide -- make added columns default to wide
      , depth = startDepth
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
              , downloadUrl = (model.baseUrl++"/models/Sample.usdz#allowContentScaling=0") -- for testing
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

        ToggleDepth ->
            let
                newDepth = if model.depth == Deep then Shallow else Deep
            in
            ( { model
              | depth = newDepth 
              , world = populateWorld model.columnSelected model.currentSeed newDepth model.basket
              }
            , Cmd.none
            )

        AddRight item ->
            let
                newBasket = model.basket ++ [item]
                newSel = Just (List.length model.basket)
            in
            ( { model
              | basket = newBasket
              , columnSelected = newSel
              , world = populateWorld newSel model.currentSeed model.depth newBasket
              }
            , Cmd.none 
            )

        AddLeft item ->
            let
                newBasket = item :: model.basket
                newSel = Just 0
            in
            
            ( { model
              | basket = newBasket
              , columnSelected = newSel
              , world = populateWorld newSel model.currentSeed model.depth newBasket
              }
            , Cmd.none 
            )

        SelectNextColumn ->
            let
                newSel = case ( model.columnSelected, List.length model.basket) of
                    ( Just i, len_ ) -> if i+1 == len_ then Just 0 else Just (i+1)
                    ( _, 0 ) -> Nothing
                    ( Nothing, len_ ) -> Just 0
            in
            ( { model
              | columnSelected = newSel
              , world = populateWorld newSel model.currentSeed model.depth model.basket
              } 
            , Cmd.none 
            )

        SelectPrevColumn ->
            let
                newSel = case ( model.columnSelected, List.length model.basket) of
                    ( Just i, len_ ) -> if i == 0 then Just (len_-1) else Just (i-1)
                    ( _, 0 ) -> Nothing
                    ( Nothing, len_ ) -> Just (len_-1)
            in
            ( { model
              | columnSelected = newSel
              , world = populateWorld newSel model.currentSeed model.depth model.basket
              }
            , Cmd.none 
            )

        ToggleWidthOrDir ->
            let
                ( newBasket, mbNewWidths) = 
                  List.unzip <|
                    List.map 
                        ( \(i, ivar) ->
                        if model.columnSelected == Just i
                            then case ivar of 
                                IvarColumn h w sel plates ->
                                    let
                                        newWidth = (if w == Narrow then Wide else Narrow)
                                    in
                                    ( IvarColumn h newWidth sel plates, Just newWidth)
                                IvarCorner h t sel plates ->
                                    ( IvarCorner h (if t == TurnLeft then TurnRight else TurnLeft) sel plates, Nothing)
                            else ( ivar, Nothing )
                        ) <| List.indexedMap Tuple.pair model.basket                
            in
            ( { model
              | futureWidth = Maybe.withDefault model.futureWidth (List.head (List.filterMap identity mbNewWidths))
              , basket = newBasket
              , world = populateWorld model.columnSelected model.currentSeed model.depth newBasket
              }
            , Cmd.none 
            )

        SetHeight nH ->
            let
                cap sel mIdx plates =
                    let
                        newPlates = List.filter (\idx -> idx <= mIdx) plates
                        len_ = List.length plates
                        newSel = if sel >= len_ then len_-1 else sel
                    in
                        ( newSel, newPlates )
                maxIdx = (maxSlot nH) +1
                newBasket =
                    List.map 
                        ( \(i, ivar) -> 
                        if model.columnSelected == Just i
                            then case ivar of
                            IvarColumn h w sel plates ->
                                let
                                    ( nS, nP ) = cap sel maxIdx plates
                                in
                                IvarColumn nH w nS nP
                            IvarCorner h d sel plates -> 
                                let
                                    ( nS, nP ) = cap sel maxIdx plates
                                in
                                IvarCorner nH d nS nP
                            else ivar
                        ) <| List.indexedMap Tuple.pair model.basket
            in
            ( { model
              | futureHeight = nH
              , basket = newBasket
              , world = populateWorld model.columnSelected model.currentSeed model.depth newBasket
              }
            , Cmd.none 
            )

        Remove ->
            let 
                oldLen = List.length model.basket
                newSel =
                    case ( model.columnSelected, oldLen ) of 
                    ( Nothing, _ ) -> Just 0
                    ( Just 0,  _ ) -> Just 0
                    ( Just i,  _ ) -> if i > (oldLen-2) then Just (oldLen-2) else Just (i-1)
                newBasket =
                    List.filterMap
                    ( \(i, ivar) ->
                        if model.columnSelected == Just i
                            then Nothing
                            else Just ivar
                    ) <| List.indexedMap Tuple.pair model.basket
            in
            ( { model
              | basket = newBasket
              , columnSelected = newSel
              , world = populateWorld newSel model.currentSeed model.depth newBasket
              }
            , Cmd.none
            )

        AddPlate ->
            let
                newBasket =
                    List.map 
                        ( \(i, ivar) ->
                          if model.columnSelected == Just i
                            then 
                              case ivar of 
                                IvarColumn h w sel plates ->
                                    let
                                        (newSel, newSlot) =
                                          if (List.length plates) - sel > 1
                                            then ( sel+1, ((Maybe.withDefault 5 (getAt sel plates)) + (Maybe.withDefault 7 (getAt (sel+1) plates))) // 2)
                                            else ( sel  , ((Maybe.withDefault 5 (getAt sel plates)) + (Maybe.withDefault 7 (getAt (sel-1) plates))) // 2)
                                    in
                                    IvarColumn h w newSel (List.sort (newSlot::plates))
                                IvarCorner h b sel plates ->
                                    let
                                        (newSel, newSlot) =
                                          if (List.length plates) - sel > 1
                                            then ( sel+1, ((Maybe.withDefault 5 (getAt sel plates)) + (Maybe.withDefault 7 (getAt (sel+1) plates))) // 2)
                                            else ( sel  , ((Maybe.withDefault 5 (getAt sel plates)) + (Maybe.withDefault 7 (getAt (sel-1) plates))) // 2)
                                    in
                                    IvarCorner h b (sel+1) (List.sort (newSlot::plates))
                            else ivar
                        ) <| List.indexedMap Tuple.pair model.basket
            in
            ( { model
              | basket = newBasket
              , world = populateWorld model.columnSelected model.currentSeed model.depth newBasket
              }
            , Cmd.none 
            )

        SelectNextPlate ->
            let
                newBasket =
                    List.map 
                        ( \(i, ivar) ->
                        if model.columnSelected == Just i 
                          then
                            case ivar of 
                                IvarColumn h w sel plates -> IvarColumn h w (if sel+1 >= List.length plates then 0 else sel+1) plates
                                IvarCorner h d sel plates -> IvarCorner h d (if sel+1 >= List.length plates then 0 else sel+1) plates
                          else
                            ivar
                        ) <| List.indexedMap Tuple.pair model.basket
            in
            ( { model
              | basket = newBasket
              , world = populateWorld model.columnSelected model.currentSeed model.depth newBasket
              }
            , Cmd.none 
            )

        SelectPrevPlate ->
            let
                newBasket =
                    List.map 
                        ( \(i, ivar) ->
                        if model.columnSelected == Just i 
                            then
                            case ivar of
                                IvarColumn h w sel plates -> IvarColumn h w (if sel == 0 then ( (List.length plates)-1 ) else sel-1) plates
                                IvarCorner h d sel plates -> IvarCorner h d (if sel == 0 then ( (List.length plates)-1 ) else sel-1) plates
                            else
                            ivar
                        ) <| List.indexedMap Tuple.pair model.basket
            in
            ( { model
              | basket = newBasket
              , world = populateWorld model.columnSelected model.currentSeed model.depth newBasket
              }
            , Cmd.none
            )

        MovePlate boolUp ->
            let
                movePlate sel maxIdx plates =
                  List.map
                    ( \(i, slot) -> 
                    if i == sel 
                        then 
                        if boolUp 
                            then if slot < maxIdx then slot+1 else slot
                            else if slot > 1      then slot-1 else slot
                        else 
                        slot
                    ) <| List.indexedMap Tuple.pair plates
                newBasket =
                    List.map 
                        ( \(i, ivar) ->
                        if model.columnSelected == Just i 
                            then
                                case ivar of
                                    IvarColumn h w sel plates -> IvarColumn h w sel (movePlate sel (maxSlot h) plates)
                                    IvarCorner h d sel plates -> IvarCorner h d sel (movePlate sel (maxSlot h) plates)
                            else
                            ivar
                        ) <| List.indexedMap Tuple.pair model.basket
            in
            ( { model
              | basket = newBasket
              , world = populateWorld model.columnSelected model.currentSeed model.depth newBasket
              }
            , Cmd.none
            )

        RemovePlate ->
            let
                remove sel plates =
                    let
                        newPlates =
                          List.filterMap
                            ( \(pi, x) -> if sel == pi then Nothing else Just x
                            ) 
                            <| List.indexedMap Tuple.pair plates
                        newSel = if sel >= List.length newPlates then sel-1 else sel
                    in
                    (newSel, newPlates)
                newBasket =
                   List.map 
                        ( \(i, ivar) -> 
                        if model.columnSelected == Just i
                            then
                                case ivar of 
                                    IvarColumn h w sel plates ->
                                        let
                                            ( nS, nP) = remove sel plates
                                        in
                                        IvarColumn h w nS nP
                                    IvarCorner h b sel plates ->
                                        let
                                            ( nS, nP) = remove sel plates
                                        in
                                        IvarCorner h b nS nP
                            else
                                ivar
                        ) <| List.indexedMap Tuple.pair model.basket
            in 
            ( { model
              | basket = newBasket
              , world = populateWorld model.columnSelected model.currentSeed model.depth newBasket
              }
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


exportStand : String -> (Bool, Float, Float) -> IvarHeight -> IvarDepth -> Point3d Meters World -> String
exportStand name (doMirror, sOffset, tOffset) ih id pos =
    let
        -- our sample set of st values was made for the tall stand with headroom for t-Offsets up to +/0.1
        tMin = 0.11371803
        t1 = 0.30251896
        t2 = 0.33020902
        t3 = 0.35790002
        tMax = 0.894095
 
        maxY = heightInCm ih
        maxHeight = heightInCm Tall

        t4 = ((tMax-tMin)/maxHeight*maxY)+tMin 

        (zOffset, sScale) = 
            case id of
                Shallow -> ( 0.0, 1.0 )
                Deep    -> ( 20.0, 50.0/30.0 )

        vert = 
            [ (-2.2, 0, 1.5), (-2.2, 0, -1.5), (2.2, 0, -1.5), (2.2, 0, 1.5)
            , (-2.2, maxY, 1.5), (-2.2, maxY, -1.5), (2.2, maxY, -1.5), (2.2, maxY, 1.5)
            , (-2.2, 0, 31.5+zOffset), (-2.2, 0, 28.5+zOffset), (2.2, 0, 28.5+zOffset), (2.2, 0, 31.5+zOffset)
            , (-2.2, maxY, 31.5+zOffset), (-2.2, maxY, 28.5+zOffset), (2.2, maxY, 28.5+zOffset), (2.2, maxY, 31.5+zOffset)
            , (0.5, maxY-7.0, -0.28), (0.5, maxY-2.56, -0.28)
            , (0.5, maxY-7.0, 29.72+zOffset), (0.5, maxY-2.56, 29.72+zOffset)
            , (-0.5, maxY-7.0, -0.28), (-0.5, maxY-2.56, -0.28)
            , (-0.5,maxY-7.0, 29.72+zOffset), (-0.5, maxY-2.56, 29.72+zOffset)
            , (0.5, 10.44, -0.28), (0.5, 14.84, -0.28)
            , (0.5, 10.44, 29.72+zOffset), (0.5, 14.84, 29.72+zOffset)
            , (-0.5, 10.44, -0.28), (-0.5, 14.84, -0.28)
            , (-0.5, 10.44, 29.72+zOffset), (-0.5, 14.84, 29.72+zOffset)
            ]

        st = List.map (\(s,t) -> (s*sScale + sOffset, (t + tOffset) * (if doMirror then -1.0 else 1.0)))
            [ (0.589047, t2), (0.570167, t2), (0.570167, t1), (0.589047, t1)
            , (0.532407, t2), (0.532407, t1), (0.551287, t1), (0.551287, t2)
            , (0.494647, tMin), (0.494647, t4), (0.475767, t4), (0.475767, tMin)
            , (0.373814, t4), (0.373814, tMin), (0.401505, tMin), (0.401505, t4)
            , (0.513527, tMin), (0.513527, t4), (0.494647, t4), (0.494647, tMin)
            , (0.456887, tMin), (0.456887, t4), (0.429196, t4), (0.429196, tMin)
            , (0.532407, t2), (0.551287, t2), (0.551287, t3), (0.532407, t3)
            , (0.551287, t2), (0.551287, t1), (0.570167, t1), (0.570167, t2)
            , (0.475767, tMin), (0.475767, t4), (0.456887, t4), (0.456887, tMin)
            , (0.401505, t4), (0.401505, tMin), (0.429196, tMin), (0.429196, t4)
            , (0.532407, tMin), (0.532407, t4), (0.513527, t4), (0.513527, tMin)
            , (0.373814, tMin), (0.373814, t4), (0.346123, t4), (0.346123, tMin)
            , (0.64317, t1), (0.61548, t1), (0.61548, tMin), (0.64317, tMin)
            , (0.551287, t3), (0.551287, t2), (0.557581, t2), (0.557581, t3)
            , (0.61548, t1), (0.587789, t1), (0.587789, tMin), (0.61548, tMin)
            , (0.563874, t3), (0.563874, t2), (0.570167, t2), (0.570167, t3)
            , (0.655757, t1), (0.649464, t1), (0.649464, tMin), (0.655757, tMin)
            , (0.66205, t1), (0.655757, t1), (0.655757, tMin), (0.66205, tMin)
            , (0.560098, t1), (0.532407, t1), (0.532407, tMin), (0.560098, tMin)
            , (0.557581, t3), (0.557581, t2), (0.563874, t2), (0.563874, t3)
            , (0.560098, tMin), (0.587789, tMin), (0.587789, t1), (0.560098, t1)
            , (0.570167, t3), (0.570167, t2), (0.576461, t2), (0.576461, t3)
            , (0.649464, t1), (0.64317, t1), (0.64317, tMin), (0.649464, tMin)
            , (0.668344, t1), (0.66205, t1), (0.66205, tMin), (0.668344, tMin)
            ]

        v = Point3d.toRecord Length.inCentimeters pos -- USD normally works in centimeters

        vStr = String.fromFloat v.x ++ ", "++ String.fromFloat v.z ++ ", "++ String.fromFloat v.y -- note the flip of Y and Z

        extendStr = ("[(-2.2, 0, -1.5), (2.2, " ++ String.fromFloat maxY ++ ", 31.5)]")

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
            float3[] extent = """ ++ extendStr ++ """
            int[] faceVertexCounts = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
            int[] faceVertexIndices = [0, 1, 2, 3, 4, 7, 6, 5, 0, 4, 5, 1, 1, 5, 6, 2, 2, 6, 7, 3, 4, 0, 3, 7, 8, 9, 10, 11, 12, 15, 14, 13, 8, 12, 13, 9, 9, 13, 14, 10, 10, 14, 15, 11, 12, 8, 11, 15, 16, 17, 19, 18, 18, 19, 23, 22, 22, 23, 21, 20, 20, 21, 17, 16, 18, 22, 20, 16, 23, 19, 17, 21, 24, 25, 27, 26, 26, 27, 31, 30, 30, 31, 29, 28, 28, 29, 25, 24, 26, 30, 28, 24, 31, 27, 25, 29]
            rel material:binding = </ivar/Materials/Material>
            point3f[] points = """ ++ exportPoints vert ++ """
            normal3f[] primvars:normals = [(-0, -1, -0), (-0, 1, -0), (-1, 0, -0), (0, 0, -1), (1, -0, 0), (-0, -0, 1)] (
                interpolation = "faceVarying"
            )
            int[] primvars:normals:indices = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 4, 4, 4, 4, 5, 5, 5, 5, 2, 2, 2, 2, 3, 3, 3, 3, 0, 0, 0, 0, 1, 1, 1, 1, 4, 4, 4, 4, 5, 5, 5, 5, 2, 2, 2, 2, 3, 3, 3, 3, 0, 0, 0, 0, 1, 1, 1, 1]
            texCoord2f[] primvars:st = """ ++ exportSt st ++ """ (
                interpolation = "faceVarying"
            )
            int[] primvars:st:indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95]
            uniform token subdivisionScheme = "none"
        }
    }
}
"""


exportPlate : String -> (Bool, Float, Float) -> IvarWidth -> IvarDepth -> Point3d Meters World -> String
exportPlate name (doMirror, sOffset, tOffset) iw id pos =
    let
        ( d, sScale ) = 
            case id of
                Shallow -> (30.0, 1.0)
                Deep -> (50.0, 50.0/30.0)

        ( w, tScale ) = 
            case iw of 
                Wide -> (83.0, 1.0)
                Narrow -> (42.0, 42.0/83.0)

        vert = [(w, 1, d), (w, 1, 0), (0, 1, 0), (0, 1, d), (w, -1, d), (w, -1, 0), (0, -1, 0), (0, -1, d)]

        st = 
            List.map
                (\(s, t) -> ( s*sScale + sOffset, (t*tScale + tOffset) * (if doMirror then -1.0 else 1.0)) )
                [ (0.405118, 0.23580998), (0.594687, 0.23580998), (0.594687, 0.760284  ), (0.405118, 0.760284)
                , (0.406955, 0.760284  ), (0.406955, 0.23580998), (0.596524, 0.23580998), (0.596524, 0.760284)
                , (0.404918, 0.237104  ), (0.404918, 0.22509801), (0.594487, 0.22509801), (0.594487, 0.237104)
                , (0.606693, 0.760284  ), (0.594687, 0.760284  ), (0.594687, 0.23580998), (0.606693, 0.23580998)
                , (0.592534, 0.764044  ), (0.592534, 0.77605   ), (0.402965, 0.77605   ), (0.402965, 0.764044)
                , (0.39185,  0.23776299), (0.403856, 0.23776299), (0.403856, 0.762237  ), (0.39185 , 0.762237)
                ]

        v = Point3d.toRecord Length.inCentimeters pos -- USD normally works in centimeters

        vStr = String.fromFloat v.x ++ ", "++ String.fromFloat v.z ++ ", "++ String.fromFloat v.y -- note the flip of Y and Z

        extendStr = ("[(0, -1, 0), (" ++ String.fromFloat w ++ ", 1, " ++ String.fromFloat d ++ ")]")
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
            rel material:binding = </ivar/Materials/Material>
            point3f[] points = """ ++ exportPoints vert ++ """
            normal3f[] primvars:normals = [(-0, 1, -0), (-0, -1, 0), (1, -0, -0), (-0, 0, -1), (-1, 0, 0), (0, -0, 1)] (
                interpolation = "faceVarying"
            )
            int[] primvars:normals:indices = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5]
            texCoord2f[] primvars:st = """ ++ exportSt st ++ """ (
                interpolation = "faceVarying"
            )
            int[] primvars:st:indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
            uniform token subdivisionScheme = "none"
        }
    }
}
"""


exportItem : Int -> IvarHeight -> IvarDepth -> Point3d Meters World -> (Bool, Float, Float) -> Angle -> Ivar -> List String
exportItem colIdx h d columnPosition (doMirror, sOffset, tOffset) angle item =
    case item of
        IvarColumn _ iw _ slots ->
            ( exportStand 
                ("Stand_"++String.fromInt colIdx) 
                (doMirror, sOffset, tOffset) h d 
                columnPosition 
            ) ::
            ( List.map 
                (\(idx, slot) -> 
                    exportPlate 
                        ("Plate_"++ String.fromInt colIdx ++"_" ++String.fromInt idx) 
                        (case idx of 
                            1 -> (doMirror, tOffset, sOffset)
                            2 -> (not doMirror, -tOffset, sOffset)
                            4 -> (not doMirror, sOffset, tOffset)
                            _ -> (doMirror, sOffset, tOffset)
                        )
                        iw d 
                        (Point3d.translateBy (Vector3d.centimeters 0 0 ((toFloat slot+1) * slotStepInCm)) columnPosition )
                        --(Vector3d.plus columnPosition (Vector3d.centimeters 0 0 ((toFloat slot+1) * 3.2)))
                )
              (List.indexedMap Tuple.pair slots)
            )
        _ -> []


exportScene : Model -> String
exportScene model =
    let
        (endState, exportedItems) =
            mapAccuml 
                (\state (idx,item) ->
                    let
                        ( (sOffset, tOffset), nextSeed ) =
                            Random.step (Random.pair (Random.float -0.1 0.1) (Random.float -0.1 0.1)) state.seed
                        ( doMirror, _ ) = Random.step (Random.bool) state.seed
                        (currHeight, nextState) =
                            case item of
                                IvarColumn ih Wide _ _ -> 
                                    ( maxIvarHeight ih state.maxHeight
                                    , State (Point3d.translateBy (Vector3d.centimeters (83.0+1.0) 0 0) state.pos) nextSeed (Angle.degrees 0) ih False
                                    )
                                IvarColumn ih Narrow _ _ -> 
                                    ( maxIvarHeight ih state.maxHeight
                                    , State (Point3d.translateBy (Vector3d.centimeters (42.0+1.0) 0 0) state.pos) nextSeed (Angle.degrees 0) ih False
                                    )
                                IvarCorner ih it _ _ -> 
                                    ( maxIvarHeight ih state.maxHeight
                                    , State state.pos nextSeed (Angle.degrees 0) ih False
                                    )
                    in
                    (nextState, exportItem idx currHeight model.depth state.pos (doMirror, sOffset, tOffset) state.angle item)
                )
                ( State Point3d.origin model.currentSeed (Angle.degrees 0) Small False )
                ( List.indexedMap Tuple.pair model.basket )

        prolog = """#usda 1.0
(
    customLayerData = {
        string creator = "Web based configurator 0.90beta"
    }
    defaultPrim = "ivar"
    metersPerUnit = 0.01
    upAxis = "Y"
)

def Xform "ivar" (
    assetInfo = {
        string name = "ivar"
    }
    kind = "component"
)
{
    def Scope "Geom"
    {
        def Xform "myIVAR_tex"
        {
            matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )
            uniform token[] xformOpOrder = ["xformOp:transform"]

            def Xform "Geom"
            {
                matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )
                uniform token[] xformOpOrder = ["xformOp:transform"]

                def Xform "IVAR_set"
                {
                    matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )
                    uniform token[] xformOpOrder = ["xformOp:transform"]

                    def Xform "Wood_grp"
                    {
"""
        placeOffset = 
            Vector3d.from 
                ( Point3d.centimeters 0
                    -( case model.depth of
                        Shallow -> 30.0
                        Deep -> 50.0
                    )
                    0
                )
                endState.pos
                |> Vector3d.scaleBy -0.5
        place = -- center the group of items
            Vector3d.toRecord Length.inCentimeters -- USD normally works in centimeters
                placeOffset
        -- note the flip of Y and Z while placing the group of items
        epilog = """
                        matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (""" ++ String.fromFloat place.x ++ ", "++ String.fromFloat place.z ++ ", "++ String.fromFloat place.y ++ """, 1) )
                        uniform token[] xformOpOrder = ["xformOp:transform"]
                    }
                }
            }
        }
    }

    def Scope "Materials"
    {
        def Material "Material"
        {
            token outputs:surface.connect = </ivar/Materials/Material/surfaceShader.outputs:surface>

            def Shader "surfaceShader"
            {
                uniform token info:id = "UsdPreviewSurface"
                color3f inputs:diffuseColor.connect = </ivar/Materials/Material/diffuseColor_texture.outputs:rgb>
                color3f inputs:emissiveColor = (0, 0, 0)
                float inputs:metallic = 0
                normal3f inputs:normal = (1, 1, 1)
                float inputs:occlusion = 0
                float inputs:opacity = 1
                float inputs:roughness = 0.9
                token outputs:surface
            }

            def Shader "texCoordReader"
            {
                uniform token info:id = "UsdPrimvarReader_float2"
                token inputs:varname = "st"
                float2 outputs:result
            }

            def Shader "diffuseColor_texture"
            {
                uniform token info:id = "UsdUVTexture"
                asset inputs:file = @0/kiefer_4096.jpg@
                texCoord2f inputs:st.connect = </ivar/Materials/Material/texCoordReader.outputs:result>
                token inputs:wrapS = "repeat"
                token inputs:wrapT = "repeat"
                float3 outputs:rgb
            }
        }
    }
}
"""
    in
    -- we split in prolog, list and epilog, because the elm parser cannot handle massive line counts in expressions
    (  prolog 
    ++ (String.join "" (List.concat exportedItems)) 
    ++ (exportStand "Stand_99" (False, 0.0, 0.0) endState.maxHeight model.depth endState.pos) 
    ++ epilog
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
        , Url.Builder.string "procedure" "usdatex2z" -- how the BODY content should be treated to create the USDZ arcive (i.e. convert ASCII to Crate and Zip with Texture(s))
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
        floorMesh = Shape.block (Length.meters 7.5) (Length.meters 3) (Length.centimeters 1)
    in
    Drawable.physical 
        { baseColor = Color.white, roughness = 0.25, metallic = False }
        floorMesh
        |> Drawable.placeIn (Frame3d.atPoint (Point3d.meters 0 0 -0.01))


ivarPlate : IvarWidth -> IvarDepth -> Point3d Meters World -> Angle -> Color.Color -> Int -> Drawable World
ivarPlate iw id columnPosition angle color slot = 
    let
        wInCm = widthInCm iw
        w = Length.centimeters wInCm
        offset = Length.centimeters ((wInCm + gapInCm)/2.0)
        plateMesh = 
            Shape.block w (Length.centimeters (depthInCm id)) plateHeight 
                |> Mesh.enableShadows
    in
    Drawable.physical 
        { baseColor = color, roughness = 0.8, metallic = False } 
        plateMesh
            |> Drawable.withShadow plateMesh
            |> Drawable.placeIn (Frame3d.atPoint columnPosition)
            |> Drawable.translateIn Direction3d.positiveX offset
            |> Drawable.translateIn Direction3d.positiveZ (Length.centimeters ((toFloat slot+1) * slotStepInCm))
            --|> Drawable.rotateAround Direction3d.positiveZ angle


ivarStand : IvarHeight -> IvarDepth -> Point3d Meters World -> Angle -> Color.Color -> List (Drawable World)
ivarStand ih id columnPosition angle color =
    let
        w1 = Length.centimeters 2.0
        w2 = Length.centimeters 3.5
        hs = Length.centimeters 4.0
        hInCm = heightInCm ih
        (h, h2) = (Length.centimeters hInCm, Length.centimeters (hInCm/2.0))
        (zBottom, zTop) = (Length.centimeters 12.0, Length.centimeters (hInCm-8.0))
        d1 = Length.centimeters 2.0
        d = depthInCm id
        (pd, pd2) = (Length.centimeters d, Length.centimeters ((d/2.0) + gapInCm))
        poleMesh  = Shape.block w2 d1 h  |> Mesh.enableShadows
        stickMesh = Shape.block w1 pd hs |> Mesh.enableShadows
        mat = { baseColor = color, roughness = 0.8, metallic = False }
        frame = Frame3d.atPoint columnPosition
    in
    [ Drawable.physical mat poleMesh
        |> Drawable.withShadow poleMesh
        |> Drawable.placeIn frame
        |> Drawable.translateIn Direction3d.negativeY pd2
        |> Drawable.translateIn Direction3d.positiveZ h2
    , Drawable.physical mat poleMesh
        |> Drawable.withShadow poleMesh
        |> Drawable.placeIn frame
        |> Drawable.translateIn Direction3d.positiveY pd2
        |> Drawable.translateIn Direction3d.positiveZ h2
    , Drawable.physical mat stickMesh
        |> Drawable.withShadow stickMesh
        |> Drawable.placeIn frame
        |> Drawable.translateIn Direction3d.positiveZ zTop
    , Drawable.physical mat stickMesh
        |> Drawable.withShadow stickMesh
        |> Drawable.placeIn frame
        |> Drawable.translateIn Direction3d.positiveZ zBottom
    ]


drawItem : Bool -> IvarHeight -> IvarDepth -> Point3d Meters World -> Angle -> Ivar -> List (Drawable World)
drawItem isSelected h d columnPosition angle item =
    case item of
        IvarColumn _ iw selSlot slots ->
            let
                columnColor = 
                    if isSelected 
                        then highlightColumnColor 
                        else itemColor 
            in
            ( ivarStand h d columnPosition angle columnColor) ++
            ( List.map 
                (\(idx, s) -> 
                    let
                        plateColor = 
                            if (selSlot==idx) && isSelected
                                then highlightPlateColor 
                                else columnColor
                    in
                    ivarPlate iw d columnPosition angle plateColor s
                )
              (List.indexedMap Tuple.pair slots)
            )
        _ -> []


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
        , zenithLuminance = Luminance.nits 8000
        , chromaticity = Chromaticity.daylight
        }


maxIvarHeight : IvarHeight -> IvarHeight -> IvarHeight 
maxIvarHeight h1 h2 = 
    case (h1, h2) of
        (Tall, _) -> Tall
        (_, Tall) -> Tall
        (Medium, _) -> Medium
        (_, Medium) -> Medium
        _ -> Small


type alias State =
    { pos : Point3d Meters World
    , seed : Seed
    , angle : Angle
    , maxHeight : IvarHeight
    , isSelected : Bool
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

buttonStyle bg =
  [ Background.color bg
  , Font.color brightGray
  , Border.rounded 4
  , padding 4
  --, width (fill |> minimum 100)
  , centerText
  ]

populateWorld : Maybe Int -> Seed -> IvarDepth -> List Ivar -> List (Drawable World)
populateWorld columnSelected currentSeed depth basket =
    let
        (endState, drawnItems) =
            mapAccuml 
                (\state (i,item) ->
                    let
                        isSelected = (columnSelected == Just i)
                        ( currHeight, nextState ) =
                            case item of
                                IvarColumn ih width _ _ ->
                                    let
                                        w = case width of
                                            Wide -> 83.0
                                            Narrow -> 42.0
                                        nextPoint =
                                            Point3d.translateBy (Vector3d.centimeters (w+1.0) 0 0) state.pos
                                    in
                                    ( maxIvarHeight ih state.maxHeight
                                    , State nextPoint currentSeed (Angle.degrees 0) ih isSelected
                                    )
                                IvarCorner ih it     _ _ -> 
                                    ( maxIvarHeight ih state.maxHeight
                                    , State state.pos currentSeed (Angle.degrees 0) ih isSelected
                                    )
                    in
                    ( nextState, drawItem isSelected currHeight depth state.pos state.angle item )
                )
                ( State Point3d.origin currentSeed (Angle.degrees 0) Small False )
                ( List.indexedMap Tuple.pair basket )
        placeOffset = 
            Vector3d.from 
                Point3d.origin
                endState.pos
                |> Vector3d.scaleBy -0.5
        drawnItemsWithLastStand =
            Drawable.group ( List.concat 
                ((ivarStand endState.maxHeight depth endState.pos endState.angle (if endState.isSelected then highlightColumnColor else itemColor)):: drawnItems )
            ) 
            |> Drawable.translateBy placeOffset
    in
    ( floor :: [drawnItemsWithLastStand]
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
        {-
        eye =
            vec3 (1 - 2 * 5 / 1024.0) -(1 - 2 * 6 / 768.0) 1
                |> Vec3.normalize
                |> Vec3.scale 600

        lookAt =
            Mat4.makeLookAt eye (vec3 0 0 -2) Vec3.j

        fov = 768.0 / 2.0 / tan (degrees (45 * 0.5))

        onTheFloor x =
            Mat4.makeRotate (degrees 90.0) (Vec3.vec3 1 0 0) |> Mat4.translate3 x -180 100
        -}
    in
    layout 
        [ Font.size 18 
        , htmlAttribute (Html.Attributes.style "overflow" "hidden")
        , htmlAttribute (Html.Attributes.style "width"    "100%")
        , htmlAttribute (Html.Attributes.style "height"   "100%")
        --, htmlAttribute (Html.Attributes.style "transform-style" "preserve-3d")
        --, htmlAttribute (Html.Attributes.style "perspective" (String.fromFloat fov ++"px"))
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
                    else
                        ( row 
                            [ width fill
                            , paddingXY 50 200
                            , htmlAttribute (Touch.onStart  (touchList >> StartMoveList  ))
                            , htmlAttribute (Touch.onMove   (touchList >> MoveList       ))
                            , htmlAttribute (Touch.onCancel (touchList >> CancelMoveList ))
                            , htmlAttribute (Touch.onEnd    (touchList >> EndMoveList    ))
                            , htmlAttribute (Mouse.onDown   (.clientPos >> StartMove ))
                            , htmlAttribute (Mouse.onMove   (.clientPos >> Move      ))
                            , htmlAttribute (Mouse.onUp     (.clientPos >> EndMove   ))
                            , pointer
                            ]
                            [ paragraph 
                                [ width fill, height fill, centerX, centerY, centerText ]
                                [ text "Use one finger to rotate, or pinch to zoom"]
                            ]
                        )
                )
            , inFront 
                ( row [ width fill, spacing 6, centerX ] {-html 
                ( cssCamera
                    fov
                    1024
                    768
                    lookAt -}
                    [ column
                        [ alignRight, alignTop, padding 6, spacing 6 ]
                        [ if model.downloadUrl == ""
                            then
                            row 
                                [ width fill, padding 10, spacing 10, centerX ] 
                                [ Input.button [] --[ moveRight (toFloat (model.canvasWidth - 120)) ]
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
                                    [] --[ moveRight (toFloat (model.canvasWidth - 120)) ] 
                                    { label= 
                                        image 
                                            [ width (px 47), height (px 54) ] 
                                            { src = "assets/arkit-icon.svg" 
                                            , description = "AR Quicklook button"
                                            }
                                    , filename = "myIvar.usdz"
                                    , url = model.downloadUrl
                                    }
                                ]
                        ]
                    , column --uiColumn 200 200 (onTheFloor -220)
                        [ alignRight, alignTop, padding 6, spacing 6 ] 
                        [ Input.button (buttonStyle itemBtnColor)
                            { onPress = Just (AddLeft ( IvarColumn model.futureHeight model.futureWidth 0 [3, maxSlot model.futureHeight] ))
                            , label = text "Add Left" 
                            }
                        ]
                    , column --uiColumn 300 200 (onTheFloor 40)
                        [ centerX, alignTop, padding 6, spacing 6 ] 
                        [ row 
                            [ centerX, spacing 6 ] 
                            [ Input.button (buttonStyle colBtnColor)
                                { onPress = Just (SetHeight Small)
                                , label = text "small"
                                }
                            , Input.button (buttonStyle colBtnColor) 
                                { onPress = Just (SetHeight Medium)
                                , label = text "medium"
                                }
                            , Input.button (buttonStyle colBtnColor)
                                { onPress = Just (SetHeight Tall)
                                , label = text "tall"
                                }
                            ]
                        , row 
                            [ centerX, spacing 6 ] 
                            [ Input.button (buttonStyle colBtnColor)
                                { onPress = Just SelectPrevColumn
                                , label = text "<"
                                }
                            , Input.button (buttonStyle colBtnColor)
                                { onPress= Just ToggleDepth
                                , label= text "Depth"
                                }
                            , Input.button (buttonStyle colBtnColor)
                                { onPress = Just ToggleWidthOrDir
                                , label = text "Width"
                                }
                            , Input.button (buttonStyle colBtnColor)
                                { onPress = Just Remove
                                , label = text "Del"
                                }
                            , Input.button (buttonStyle colBtnColor)
                                { onPress = Just SelectNextColumn
                                , label = text ">"
                                }
                            ]
                        , row 
                            [ centerX, spacing 6 ]
                            [ Input.button (buttonStyle plateBtnColor)
                                { onPress = Just SelectNextPlate
                                , label = text "^"
                                }
                            , Input.button (buttonStyle plateBtnColor)
                                { onPress = Just (MovePlate True)
                                , label = text "Up"
                                }
                            , Input.button (buttonStyle plateBtnColor)
                                { onPress = Just RemovePlate
                                , label = text "Del"
                                }
                            , Input.button (buttonStyle plateBtnColor)
                                { onPress = Just AddPlate
                                , label = text "+"
                                }
                            , Input.button (buttonStyle plateBtnColor)
                                { onPress = Just (MovePlate False)
                                , label = text "Down"
                                }
                            , Input.button (buttonStyle plateBtnColor)
                                { onPress = Just SelectPrevPlate
                                , label = text "v"
                                }
                            ]
                        ]
                    , column --uiColumn 200 200 (onTheFloor 220)
                        [ alignLeft, alignTop, padding 6, spacing 6 ] 
                        [ Input.button (buttonStyle itemBtnColor)
                            { onPress = Just (AddRight ( IvarColumn model.futureHeight model.futureWidth 0 [3, maxSlot model.futureHeight] ))
                            , label = text "Add Right" 
                            }
                        ]
                    ]
                --)
                )
            , width fill
            , alignLeft
            ]
            [ html 
                ( Scene3d.render []
                    { ambientLighting = Just ambientLighting
                    , lights = Scene3d.oneLight sunlight { castsShadows = True }
                    , camera = camera
                    , width = Pixels.pixels 1024
                    , height = Pixels.pixels 768
                    , exposure = Exposure.fromEv100 14
                    , whiteBalance = Chromaticity.daylight
                    }
                    model.world
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
-- cd examples; elm make IvarConfig.elm --optimize --output=C:\Apache24\htdocs\IvarConfig.js
-- cd examples; elm make IvarConfig.elm --optimize --output=C:\inetpub\wwwroot\IvarConfig.js
-- cd examples; elm make IvarConfig.elm --optimize --output=IvarConfig.js
