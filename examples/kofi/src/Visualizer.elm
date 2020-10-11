port module Visualizer exposing (danceParser, main)

import Angle exposing (Angle)
import Array exposing (Array)
import Axis3d exposing (Axis3d)
import Base64
import Bitwise
import Browser
import Browser.Events
import Camera3d
import Char
import Color exposing (Color)
import Dict exposing (Dict)
import Direction3d exposing (Direction3d)
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Illuminance
import Length exposing (Length)
import Luminance
import Math.Vector2 exposing (Vec2, vec2)
import Math.Vector4 exposing (Vec4, vec4)
import Parser as P exposing ((|.), (|=))
import Pixels
import Plane3d
import Point3d
import Quantity exposing (Quantity(..))
import Scene3d
import Scene3d.Chromaticity
import Scene3d.Drawable as Drawable exposing (Drawable, Material)
import Scene3d.Exposure
import Scene3d.Light
import Scene3d.Mesh as Mesh
import Scene3d.Shape as Shape
import Vector3d exposing (Vector3d)
import Viewpoint3d
import WebGL


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


type alias Model =
    { width : Float
    , height : Float
    , dance : Dance
    , clock : Clock
    , noteEnd : Float
    }


type alias Flags =
    { width : Float
    , height : Float
    , hash : String
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        dance =
            if List.member flags.hash [ "", "#", "#!" ] then
                defaultDance

            else
                case P.run hashParser flags.hash of
                    Err reason ->
                        defaultDance

                    Ok (Ok loadedDance) ->
                        loadedDance

                    Ok (Err code) ->
                        { defaultDance | error = True, code = code }
    in
    ( { width = flags.width
      , height = flags.height
      , dance = dance
      , clock = initialClock
      , noteEnd = 0
      }
    , Cmd.none
    )


type Msg
    = Resize Int Int
    | GotMidiMessage ( Float, List Int )
    | SetCode String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ dance } as model) =
    case msg of
        Resize width height ->
            pure { model | width = toFloat width, height = toFloat height }

        GotMidiMessage ( now, data ) ->
            pure (applyMidi now data model)

        SetCode code ->
            case P.run planParser code of
                Err reason ->
                    pure { model | dance = { dance | error = True, code = code } }

                Ok plan ->
                    ( { model | dance = { dance | error = False, code = code, plan = plan } }
                    , setHash ("#!" ++ Base64.encode code)
                    )


nextPose : String -> Dance -> Pose
nextPose note dance =
    Dict.get note dance.plan |> Maybe.withDefault dance.next


port setHash : String -> Cmd msg


pure : a -> ( a, Cmd msg )
pure a =
    ( a, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ midiMessage GotMidiMessage
        , Browser.Events.onResize Resize
        ]



-- DANCE-LANG


type alias Dance =
    { error : Bool
    , code : String
    , plan : Dict String Pose
    , prev : Pose
    , next : Pose
    }


type alias Pose =
    { head : Move
    , torso : Move
    , leftArm : Move
    , rightArm : Move
    , leftLeg : Move
    , rightLeg : Move
    , scene : Move
    , light : Move
    }


type alias Move =
    { rotate : Vector3d Length.Meters ()
    , translate : Vector3d Length.Meters ()
    , fill : Color
    }


defaultDance : Dance
defaultDance =
    let
        code =
            String.trimLeft """
C
head      left 0.2
torso     left 0.2     roll 5
leftarm   down 0.15    left 0.15   back 1
rightarm  forward 1    pitch -15
rightleg  pitch 30
scene     fill blue    back 10

G
head      right 0.2
torso     right 0.2    roll -5
rightarm  down 0.15    right 0.15  back 1
leftarm   forward 1    pitch -15
leftleg   pitch 30
scene     fill purple  back 5

A
head      up 0.5       fill green
leftarm   up 1         left .5    roll 30
rightarm  up 1         right .5   roll -30
light     down 1       fill green
"""
    in
    P.run danceParser code
        |> Result.withDefault
            { error = True
            , code = code
            , prev = neutralPose
            , next = neutralPose
            , plan = Dict.empty
            }


neutralPose : Pose
neutralPose =
    { head = noMove
    , torso = noMove
    , leftArm = noMove
    , rightArm = noMove
    , leftLeg = noMove
    , rightLeg = noMove
    , scene = { noMove | translate = Vector3d.meters 0 5 -20, fill = Color.black }
    , light =
        { noMove
            | translate =
                Vector3d.withLength (Length.meters 1)
                    (Direction3d.zxY (Angle.degrees 45) (Angle.degrees 195))
        }
    }


hashParser : P.Parser (Result String Dance)
hashParser =
    P.succeed identity
        |. P.chompWhile (\x -> x == '#' || x == '!')
        |= P.getChompedString (P.chompWhile (\_ -> True))
        |. P.end
        |> P.andThen
            (\x ->
                case Base64.decode x of
                    Err reason ->
                        P.problem reason

                    Ok code ->
                        P.run danceParser code
                            |> Result.mapError (\_ -> code)
                            |> P.succeed
            )


danceParser : P.Parser Dance
danceParser =
    P.succeed
        (\code plan ->
            let
                ( prev, next ) =
                    case Dict.values plan of
                        a :: b :: _ ->
                            ( a, b )

                        [ one ] ->
                            ( one, one )

                        [] ->
                            ( neutralPose, neutralPose )
            in
            { error = False, code = code, prev = prev, next = next, plan = plan }
        )
        |= P.getSource
        |= planParser


planParser : P.Parser (Dict String Pose)
planParser =
    P.succeed identity
        |. P.spaces
        |= P.loop Dict.empty poseParser


poseParser : Dict String Pose -> P.Parser (P.Step (Dict String Pose) (Dict String Pose))
poseParser poses =
    P.succeed (\note pose loop -> loop (Dict.insert note pose poses))
        |= noteParser
        |. P.spaces
        |= P.loop neutralPose partParser
        |. P.spaces
        |= P.oneOf [ P.succeed P.Done |. P.end, P.succeed P.Loop ]


noteParser : P.Parser String
noteParser =
    let
        isNote code =
            65 <= code && code <= 71
    in
    P.chompIf (isNote << Char.toCode)
        |. P.oneOf [ P.symbol "#", P.succeed () ]
        |> P.getChompedString


partParser : Pose -> P.Parser (P.Step Pose Pose)
partParser old =
    P.oneOf
        [ partKeywordParser
            |> P.andThen
                (\setter ->
                    P.succeed P.Loop
                        |. P.spaces
                        |= P.loop ( old, setter ) moveParser
                        |. P.spaces
                )
        , P.succeed (P.Done old)
        ]


partKeywordParser : P.Parser (Move -> Pose -> Pose)
partKeywordParser =
    P.oneOf
        [ P.succeed (\x a -> { a | head = merge a.head x }) |. P.keyword "head"
        , P.succeed (\x a -> { a | torso = merge a.torso x }) |. P.keyword "torso"
        , P.succeed (\x a -> { a | leftArm = merge a.leftArm x }) |. P.keyword "leftarm"
        , P.succeed (\x a -> { a | rightArm = merge a.rightArm x }) |. P.keyword "rightarm"
        , P.succeed (\x a -> { a | leftLeg = merge a.leftLeg x }) |. P.keyword "leftleg"
        , P.succeed (\x a -> { a | rightLeg = merge a.rightLeg x }) |. P.keyword "rightleg"
        , P.succeed (\x a -> { a | scene = merge a.scene x }) |. P.keyword "scene"
        , P.succeed (\x a -> { a | light = merge a.light x }) |. P.keyword "light"
        ]


moveParser :
    ( Pose, Move -> Pose -> Pose )
    -> P.Parser (P.Step ( Pose, Move -> Pose -> Pose ) Pose)
moveParser ( old, setter ) =
    P.oneOf
        [ P.succeed (|>)
            |= moveKeywordParser
            |= P.succeed (\x -> P.Loop ( setter x old, setter ))
            |. P.spaces
        , P.succeed (P.Done old)
        ]


moveKeywordParser : P.Parser Move
moveKeywordParser =
    P.oneOf
        [ P.succeed (\dir x -> { noMove | rotate = vectorIn dir x })
            |= P.oneOf
                [ P.succeed Direction3d.x |. P.keyword "pitch"
                , P.succeed Direction3d.y |. P.keyword "yaw"
                , P.succeed Direction3d.z |. P.keyword "roll"
                ]
            |. P.spaces
            |= numberParser
        , P.succeed (\dir x -> { noMove | translate = vectorIn dir x })
            |= P.oneOf
                [ P.succeed Direction3d.positiveY |. P.keyword "up"
                , P.succeed Direction3d.negativeY |. P.keyword "down"
                , P.succeed Direction3d.positiveX |. P.keyword "right"
                , P.succeed Direction3d.negativeX |. P.keyword "left"
                , P.succeed Direction3d.positiveZ |. P.keyword "forward"
                , P.succeed Direction3d.negativeZ |. P.keyword "back"
                ]
            |. P.spaces
            |= numberParser
        , P.succeed (\x -> { noMove | fill = x })
            |. P.keyword "fill"
            |. P.spaces
            |= P.oneOf
                [ P.succeed Color.darkRed |. P.keyword "red"
                , P.succeed Color.darkOrange |. P.keyword "orange"
                , P.succeed Color.darkYellow |. P.keyword "yellow"
                , P.succeed Color.darkGreen |. P.keyword "green"
                , P.succeed Color.darkBlue |. P.keyword "blue"
                , P.succeed Color.darkPurple |. P.keyword "purple"
                , P.succeed Color.darkBrown |. P.keyword "brown"
                ]
        ]


numberParser : P.Parser Float
numberParser =
    P.oneOf [ P.succeed negate |. P.symbol "-" |= P.float, P.float ]


merge : Move -> Move -> Move
merge a b =
    { rotate = Vector3d.plus a.rotate b.rotate
    , translate = Vector3d.plus a.translate b.translate
    , fill =
        if b.fill == Color.white then
            a.fill

        else
            b.fill
    }


vectorIn : Direction3d () -> Float -> Vector3d Length.Meters ()
vectorIn dir length =
    Vector3d.withLength (Length.meters length) dir


noMove : Move
noMove =
    { rotate = Vector3d.zero
    , translate = Vector3d.zero
    , fill = Color.white
    }



-- MIDI CLOCK


type alias Clock =
    { index : Int
    , lastUpdated : Float
    , samples : Array Float
    , quarterNote : Float
    }


initialClock : Clock
initialClock =
    Clock 0 0 Array.empty 1000


clockFromSamples : Float -> Int -> Array Float -> Clock
clockFromSamples lastUpdated index samples =
    Clock index lastUpdated samples <|
        (6 * Array.foldl (+) 0 samples / toFloat (Array.length samples))


samplesToKeep : Int
samplesToKeep =
    24 * 4 * 4


applyMidi : Float -> List Int -> Model -> Model
applyMidi now data ({ dance } as model) =
    case data of
        -- CLOCK
        [ 248 ] ->
            { model | clock = updateClock now model.clock }

        -- NOTE ON
        [ status, midinote, _ ] ->
            if Bitwise.shiftRightBy 4 status /= 9 then
                model

            else
                case Array.get (modBy 12 midinote) notes of
                    Nothing ->
                        model

                    Just note ->
                        { model
                            | noteEnd = now + model.clock.quarterNote
                            , dance = { dance | prev = dance.next, next = nextPose note dance }
                        }

        _ ->
            model


updateClock : Float -> Clock -> Clock
updateClock now clock =
    let
        diff =
            now - clock.lastUpdated
    in
    if Array.length clock.samples < samplesToKeep then
        clockFromSamples now clock.index (Array.push diff clock.samples)

    else
        clockFromSamples now (clock.index + 1) <|
            Array.set (modBy samplesToKeep clock.index) diff clock.samples


notes : Array String
notes =
    Array.fromList [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ]


port midiMessage : (( Float, List Int ) -> msg) -> Sub msg



-- HTML


view : Model -> Html Msg
view model =
    Html.main_ []
        [ viewSubject model
        , Html.textarea
            [ Html.Events.onInput SetCode
            , Html.Attributes.autofocus True
            , Html.Attributes.spellcheck False
            , Html.Attributes.classList [ ( "error", model.dance.error ) ]
            ]
            [ Html.text model.dance.code ]
        ]


viewSubject : Model -> Html msg
viewSubject model =
    let
        cameraPlacement =
            curveVector model
                model.dance.prev.scene.translate
                model.dance.next.scene.translate

        eyePoint =
            Point3d.xyz
                (Vector3d.xComponent cameraPlacement)
                (Vector3d.yComponent cameraPlacement)
                (Quantity.negate (Vector3d.zComponent cameraPlacement))

        lightColor =
            curveColor model
                model.dance.prev.light.fill
                model.dance.next.light.fill

        lightDirection =
            curveVector model
                model.dance.prev.light.translate
                model.dance.next.light.translate
                |> Vector3d.mirrorAcross Plane3d.zx
                |> Vector3d.direction
                |> Maybe.withDefault Direction3d.x

        viewpoint =
            Viewpoint3d.lookAt
                { focalPoint = Point3d.meters 0 -2 0
                , eyePoint = eyePoint
                , upDirection = Direction3d.y
                }

        camera =
            Camera3d.perspective
                { viewpoint = viewpoint
                , verticalFieldOfView = Angle.degrees 30
                , clipDepth = Length.meters 0.1
                }

        light =
            Scene3d.Light.directional
                (Scene3d.Chromaticity.fromColor lightColor)
                (Illuminance.lux 10000)
                lightDirection

        ambientLighting =
            Scene3d.Light.overcast
                { zenithDirection = Direction3d.z
                , chromaticity = Scene3d.Chromaticity.daylight
                , zenithLuminance = Luminance.nits 5000
                }
    in
    WebGL.toHtmlWith []
        [ Html.Attributes.width (round model.width)
        , Html.Attributes.height (round model.height)
        , Html.Attributes.style "width" (String.fromFloat model.width ++ "px")
        , Html.Attributes.style "height" (String.fromFloat model.height ++ "px")
        , Html.Attributes.style "display" "block"
        ]
    <|
        backgroundEntity model
            :: Scene3d.toEntities []
                { camera = camera
                , width = Pixels.pixels model.width
                , height = Pixels.pixels model.height
                , ambientLighting = Just ambientLighting
                , lights = Scene3d.oneLight light { castsShadows = False }
                , exposure = Scene3d.Exposure.fromMaxLuminance (Luminance.nits 10000)
                , whiteBalance = Scene3d.Chromaticity.daylight
                }
                [ animate model head .head
                , animate model torso.drawable .torso
                    |> torso.translation
                , animate model arm.drawable .leftArm
                    |> arm.translation
                    |> Drawable.translateIn Direction3d.negativeX armOffset
                , animate model arm.drawable .rightArm
                    |> arm.translation
                    |> Drawable.translateIn Direction3d.positiveX armOffset
                , animate model leg.drawable .leftLeg
                    |> leg.translation
                    |> Drawable.translateIn Direction3d.negativeX legOffset
                , animate model leg.drawable .rightLeg
                    |> leg.translation
                    |> Drawable.translateIn Direction3d.positiveX legOffset
                ]



-- BACKGROUND


backgroundEntity : Model -> WebGL.Entity
backgroundEntity model =
    WebGL.entity backgroundVertexShader backgroundFragmentShader backgroundMesh <|
        { backgroundColor =
            let
                { red, green, blue, alpha } =
                    Color.toRgba <|
                        curveColor model
                            model.dance.prev.scene.fill
                            model.dance.next.scene.fill
            in
            vec4 red green blue alpha
        }


backgroundMesh : WebGL.Mesh { position : Vec2 }
backgroundMesh =
    let
        vertex x y =
            { position = vec2 x y }
    in
    WebGL.triangles
        [ ( vertex -1 -1, vertex 1 -1, vertex 1 1 )
        , ( vertex -1 -1, vertex 1 1, vertex -1 1 )
        ]


backgroundVertexShader : WebGL.Shader { position : Vec2 } { backgroundColor : Vec4 } {}
backgroundVertexShader =
    [glsl|
        precision mediump float;
        attribute vec2 position;
        void main() { gl_Position = vec4(position.x, position.y, 0.0, 1.0); }
    |]


backgroundFragmentShader : WebGL.Shader {} { backgroundColor : Vec4 } {}
backgroundFragmentShader =
    [glsl|
        precision mediump float;
        uniform vec4 backgroundColor;
        void main() { gl_FragColor = backgroundColor; }
    |]



-- BODY PARTS


type alias Mesh a =
    Mesh.Mesh a (Mesh.Triangles Mesh.WithNormals Mesh.NoUV Mesh.NoTangents Mesh.ShadowsDisabled)


type alias Limb a =
    { drawable : Color -> Drawable a
    , translation : Drawable a -> Drawable a
    }


head : Color -> Drawable a
head color =
    bodyPart color headMesh


headMesh : Mesh a
headMesh =
    Shape.sphere { radius = var.headRadius, subdivisions = 72 }


torso : Limb a
torso =
    pill torsoRadius var.torsoLength <| Quantity.plus var.spacing var.headRadius


arm : Limb a
arm =
    pill var.limbRadius var.armLength <| Quantity.plus var.spacing var.headRadius


leg : Limb a
leg =
    pill var.limbRadius var.legLength <|
        Quantity.sum [ var.headRadius, var.spacing, var.torsoLength, var.spacing ]


pill : Length -> Length -> Length -> Limb a
pill radius length offset =
    let
        height =
            Quantity.minus (Quantity.twice radius) length

        halfHeight =
            Quantity.half height

        end =
            Shape.sphere { radius = radius, subdivisions = 72 }

        trunk =
            Shape.cylinder { radius = radius, height = height, subdivisions = 72 }
    in
    { drawable =
        \color ->
            Drawable.group
                [ Drawable.translateIn Direction3d.negativeZ halfHeight (bodyPart color end)
                , Drawable.translateIn Direction3d.positiveZ halfHeight (bodyPart color end)
                , Drawable.translateIn Direction3d.negativeZ halfHeight (bodyPart color trunk)
                ]
                |> Drawable.rotateAround Axis3d.x (Angle.degrees 90)
    , translation =
        Quantity.sum [ offset, radius, halfHeight ]
            |> Drawable.translateIn Direction3d.negativeY
    }


bodyPart : Color -> Mesh a -> Drawable a
bodyPart color =
    Drawable.physical { baseColor = color, roughness = 0.25, metallic = False }


torsoRadius : Length
torsoRadius =
    Quantity.half (Quantity.plus var.headRadius var.limbRadius)


armOffset : Length
armOffset =
    Quantity.sum [ torsoRadius, var.spacing, var.limbRadius ]


legOffset : Length
legOffset =
    Quantity.plus var.spacing var.limbRadius


var =
    { spacing = Length.meters 0.075
    , headRadius = Length.meters 0.85
    , limbRadius = Length.meters 0.375
    , armLength = Length.meters 2.0
    , legLength = Length.meters 2.8
    , torsoLength = Length.meters 2.5
    , movement = Length.meters 0.85
    }



-- ANIMATE


animate : Model -> (Color -> Drawable ()) -> (Pose -> Move) -> Drawable ()
animate model drawable part =
    let
        prev =
            part model.dance.prev

        next =
            part model.dance.next

        rotation =
            curveVector model prev.rotate next.rotate

        translation =
            curveVector model prev.translate next.translate

        color =
            curveColor model prev.fill next.fill
    in
    drawable color
        |> Drawable.rotateAround
            (Vector3d.direction rotation
                |> Maybe.withDefault Direction3d.x
                |> Axis3d.through Point3d.origin
            )
            (Angle.degrees (unQuantity (Vector3d.length rotation)))
        |> Drawable.translateBy translation


curveColor : Model -> Color -> Color -> Color
curveColor model a b =
    let
        aRgba =
            Color.toRgba a

        bRgba =
            Color.toRgba b
    in
    Color.rgba
        (curve model aRgba.red bRgba.red)
        (curve model aRgba.green bRgba.green)
        (curve model aRgba.blue bRgba.blue)
        (curve model aRgba.alpha bRgba.alpha)


curveVector : Model -> Vector3d Length.Meters a -> Vector3d Length.Meters a -> Vector3d Length.Meters a
curveVector model a b =
    Vector3d.meters
        (curveQuantity model (Vector3d.xComponent a) (Vector3d.xComponent b))
        (curveQuantity model (Vector3d.yComponent a) (Vector3d.yComponent b))
        (curveQuantity model (Vector3d.zComponent a) (Vector3d.zComponent b))


curveQuantity : Model -> Quantity Float a -> Quantity Float a -> Float
curveQuantity model a b =
    curve model (unQuantity a) (unQuantity b)


curve : Model -> Float -> Float -> Float
curve model a b =
    let
        t =
            clamp 0 1 <|
                ((model.noteEnd - model.clock.lastUpdated) / model.clock.quarterNote)
    in
    cubicBezier (1 - t) a b


cubicBezier : Float -> Float -> Float -> Float
cubicBezier t p0 p3 =
    let
        controlPoint1 =
            0.85

        controlPoint2 =
            1.15

        p1 =
            p0 + controlPoint1 * (p3 - p0)

        p2 =
            p0 + controlPoint2 * (p3 - p0)
    in
    (p0 * ((1 - t) ^ 3))
        + (p1 * 3 * ((1 - t) ^ 2) * t)
        + (p2 * 3 * (1 - t) * (t ^ 2))
        + (p3 * (t ^ 3))


unQuantity : Quantity number a -> number
unQuantity (Quantity x) =
    x
