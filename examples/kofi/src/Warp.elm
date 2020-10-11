port module Warp exposing (main)

import Browser
import Browser.Events
import Html exposing (..)
import Html.Attributes
import Html.Events
import Json.Decode as D
import Math.Vector2 exposing (Vec2, vec2)
import Math.Vector3 exposing (Vec3, vec3)
import Svg exposing (Svg)
import Svg.Attributes exposing (viewBox)
import Task
import WebGL exposing (Mesh, Shader)
import WebGL.Texture exposing (Texture)


-- ELM ARCHITECTURE


type alias Model =
    { time : Float
    , error : Bool
    , bitmoji : Maybe Texture
    , userId : String
    , dance : Dance { comicId : String }
    , editMode : Maybe EditMode
    , toCustomization : D.Decoder Customization
    }


type EditMode
    = MovingAnchors
    | EditingTiming


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , subscriptions = subscriptions
        , update = update
        }


init : () -> ( Model, Cmd Msg )
init () =
    let
        kofi =
            "4b014b97-f9a9-480e-8e7f-3c74def6e9f6"
    in
    load
        { time = 0
        , error = False
        , bitmoji = Nothing
        , userId = kofi
        , dance = lean
        , editMode = Nothing
        , toCustomization = D.fail ""
        }


load : Model -> ( Model, Cmd Msg )
load model =
    let
        url =
            baseUrl
                ++ model.dance.comicId
                ++ "-"
                ++ model.userId
                ++ "-v1.png?transparent=1&palette=1"
    in
    WebGL.Texture.loadWith WebGL.Texture.nonPowerOfTwoOptions url
        |> Task.attempt GotBitmoji
        |> Tuple.pair model


type Msg
    = Diff Float
    | GotBitmoji (Result WebGL.Texture.Error Texture)
    | NewBitmoji (Result D.Error ( String, String ))
    | SetDance (Dance { comicId : String })
    | SetEditMode (Maybe EditMode)
    | StartCustomization (D.Decoder Customization)
    | Customize Customization
    | StopCustomization


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ dance } as model) =
    case msg of
        Diff time ->
            pure { model | time = model.time + time }

        GotBitmoji (Err _) ->
            pure { model | error = True }

        GotBitmoji (Ok bitmoji) ->
            pure { model | error = False, bitmoji = Just bitmoji }

        NewBitmoji (Err _) ->
            pure { model | error = True }

        NewBitmoji (Ok ( userId, comicId )) ->
            load { model | userId = userId, dance = { dance | comicId = comicId } }

        SetDance dance_ ->
            load { model | dance = dance_ }

        SetEditMode editMode ->
            pure { model | editMode = editMode }

        StartCustomization toCustomization ->
            pure { model | toCustomization = toCustomization }

        Customize customization ->
            pure { model | dance = customize customization dance }

        StopCustomization ->
            pure { model | toCustomization = D.fail "" }


pure : a -> ( a, Cmd msg )
pure a =
    ( a, Cmd.none )


port imageDrop : (D.Value -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ imageDrop (NewBitmoji << D.decodeValue parseIds)
        , Browser.Events.onAnimationFrameDelta Diff
        , Browser.Events.onMouseUp (D.succeed StopCustomization)
        ]


view : Model -> Html Msg
view model =
    main_ [ Html.Attributes.style "max-width" (px bitmojiSize) ]
        [ div [ Html.Attributes.style "position" "relative" ]
            [ WebGL.toHtml
                [ Html.Attributes.width bitmojiSize
                , Html.Attributes.height bitmojiSize
                ]
                (viewCanvas model)
            , case model.editMode of
                Nothing ->
                    text ""

                Just editMode ->
                    Svg.svg
                        [ Html.Attributes.style "position" "absolute"
                        , Html.Attributes.style "top" "0"
                        , Html.Attributes.style "left" "0"
                        , Html.Attributes.width bitmojiSize
                        , Html.Attributes.height bitmojiSize
                        , Svg.Attributes.viewBox "0 0 1 1"
                        , Html.Events.on "mousemove" (D.map Customize model.toCustomization)
                        ]
                        [ viewAnchor editMode
                            A
                            model.dance.aTimeMultiplier
                            model.dance.aPhase
                            model.dance.aTarget
                            model.dance.aMovement
                        , viewAnchor editMode
                            B
                            model.dance.bTimeMultiplier
                            model.dance.bPhase
                            model.dance.bTarget
                            model.dance.bMovement
                        , viewAnchor editMode
                            C
                            model.dance.cTimeMultiplier
                            model.dance.cPhase
                            model.dance.cTarget
                            model.dance.cMovement
                        , viewAnchor editMode
                            D
                            model.dance.dTimeMultiplier
                            model.dance.dPhase
                            model.dance.dTarget
                            model.dance.dMovement
                        ]
            ]
        , fieldset []
            [ radio "presets" SetDance model.dance <|
                [ ( lean, "The Lean" )
                , ( disco, "Disco Wave" )
                ]
            , hr [] []
            , span []
                [ strong [] [ text "Customize" ]
                , em [] [ text " (requires mouse)" ]
                ]
            , showIf model.error <|
                div [ Html.Attributes.class "warning" ]
                    [ b [] [ Html.text "That doesn't seem like a Bitmoji..." ] ]
            , ol []
                [ li []
                    [ text "Install the "
                    , a [ Html.Attributes.href chromeExtensionUrl, Html.Attributes.target "_blank" ]
                        [ text "official Bitmoji Chrome extension" ]
                    ]
                , li [] [ text "Drag-and-drop your Bitmoji here" ]
                ]
            , radio "edit" SetEditMode model.editMode <|
                [ ( Nothing, "Hide controls" )
                , ( Just MovingAnchors, "Move anchors" )
                , ( Just EditingTiming, "Edit timing" )
                ]
            ]
        ]


viewCanvas : Model -> List WebGL.Entity
viewCanvas model =
    case model.bitmoji of
        Nothing ->
            []

        Just bitmoji ->
            [ WebGL.entity vertexShader fragmentShader mesh <|
                { time = model.time / 1000
                , bitmoji = bitmoji
                , aTimeMultiplier = model.dance.aTimeMultiplier
                , aPhase = model.dance.aPhase
                , aTarget = model.dance.aTarget
                , aMovement = model.dance.aMovement
                , bTimeMultiplier = model.dance.bTimeMultiplier
                , bPhase = model.dance.bPhase
                , bTarget = model.dance.bTarget
                , bMovement = model.dance.bMovement
                , cTimeMultiplier = model.dance.cTimeMultiplier
                , cPhase = model.dance.cPhase
                , cTarget = model.dance.cTarget
                , cMovement = model.dance.cMovement
                , dTimeMultiplier = model.dance.dTimeMultiplier
                , dPhase = model.dance.dPhase
                , dTarget = model.dance.dTarget
                , dMovement = model.dance.dMovement
                }
            ]


viewAnchor : EditMode -> Anchor -> Float -> Float -> Vec2 -> Vec2 -> Svg Msg
viewAnchor editMode anchor timeMultiplier phase target movement =
    let
        x =
            Math.Vector2.getX target

        y =
            1 - Math.Vector2.getY target

        width =
            Math.Vector2.getX movement

        height =
            Math.Vector2.getY movement
    in
    Svg.g [] <|
        case editMode of
            MovingAnchors ->
                [ crossPath x y width height <|
                    [ Svg.Attributes.style "cursor:move"
                    , customizeOnMouseDown <|
                        D.map (Target anchor) (D.map2 vec2 offsetX offsetYInverse)
                    ]
                , verticalAxis x y height <|
                    customizeOnMouseDown <|
                        D.map (MovementY anchor << distance y) offsetY
                , horizontalAxis x y width <|
                    customizeOnMouseDown <|
                        D.map (MovementX anchor << distance x) offsetX
                ]

            EditingTiming ->
                [ crossPath x y phase timeMultiplier []
                , verticalAxis x y timeMultiplier <|
                    customizeOnMouseDown <|
                        D.map (TimeMultiplier anchor << distance y) offsetY
                , horizontalAxis x y phase <|
                    customizeOnMouseDown <|
                        D.map (Phase anchor << distance x) offsetX
                ]


crossPath : Float -> Float -> Float -> Float -> List (Attribute msg) -> Svg msg
crossPath x y width height attrs =
    let
        d =
            Svg.Attributes.d <|
                String.join " " <|
                    List.map (String.join " ") <|
                        [ [ "M", String.fromFloat x, String.fromFloat y ]
                        , [ "v", String.fromFloat (-height / 2) ]
                        , [ "v", String.fromFloat height ]
                        , [ "v", String.fromFloat (-height / 2) ]
                        , [ "h", String.fromFloat (-width / 2) ]
                        , [ "h", String.fromFloat width ]
                        ]
    in
    Svg.path (d :: attrs) []


verticalAxis : Float -> Float -> Float -> Attribute msg -> Svg msg
verticalAxis centerX centerY value attr =
    Svg.circle
        [ Svg.Attributes.style "cursor:ns-resize"
        , Svg.Attributes.r "0.01"
        , Svg.Attributes.cx <| String.fromFloat centerX
        , Svg.Attributes.cy <| String.fromFloat (centerY + value / 2)
        , attr
        ]
        []


horizontalAxis : Float -> Float -> Float -> Attribute msg -> Svg msg
horizontalAxis centerX centerY value attr =
    Svg.circle
        [ Svg.Attributes.style "cursor:ew-resize"
        , Svg.Attributes.r "0.01"
        , Svg.Attributes.cx <| String.fromFloat (centerX + value / 2)
        , Svg.Attributes.cy <| String.fromFloat centerY
        , attr
        ]
        []


radio : String -> (a -> msg) -> a -> List ( a, String ) -> Html msg
radio name toMsg value options =
    let
        radio_ ( thisValue, thisLabel ) =
            label []
                [ input
                    [ Html.Attributes.name name
                    , Html.Attributes.type_ "radio"
                    , Html.Attributes.value thisLabel
                    , Html.Attributes.checked (thisValue == value)
                    , onChange thisLabel (toMsg thisValue)
                    ]
                    []
                , text " "
                , text thisLabel
                ]
    in
    div [] <| List.map radio_ options


onChange : String -> msg -> Attribute msg
onChange this msg =
    Html.Events.on "change" <|
        D.andThen
            (\x ->
                if x == this then
                    D.succeed msg
                else
                    D.fail ""
            )
            Html.Events.targetValue


customizeOnMouseDown : D.Decoder Customization -> Attribute Msg
customizeOnMouseDown decoder =
    Html.Events.onMouseDown <| StartCustomization decoder


px : Float -> String
px value =
    String.fromFloat value ++ "px"


showIf : Bool -> Html msg -> Html msg
showIf check el =
    if check then
        el
    else
        text ""


offsetX : D.Decoder Float
offsetX =
    D.map (\x -> x / bitmojiSize) (D.field "offsetX" D.float)


offsetY : D.Decoder Float
offsetY =
    D.map (\y -> y / bitmojiSize) (D.field "offsetY" D.float)


offsetYInverse : D.Decoder Float
offsetYInverse =
    D.map (\y -> 1 - y) offsetY


distance : Float -> Float -> Float
distance center offset =
    (offset - center) * 2



-- MESH


mesh : Mesh { position : Vec3 }
mesh =
    WebGL.triangles
        [ ( { position = vec3 -1 1 0 }
          , { position = vec3 1 1 0 }
          , { position = vec3 -1 -1 0 }
          )
        , ( { position = vec3 -1 -1 0 }
          , { position = vec3 1 1 0 }
          , { position = vec3 1 -1 0 }
          )
        ]



-- SHADERS


type alias Uniforms =
    Dance { time : Float, bitmoji : Texture }


vertexShader : Shader { position : Vec3 } Uniforms { vFragCoord : Vec2 }
vertexShader =
    [glsl|
        precision mediump float;
        attribute vec3 position;
        varying vec2 vFragCoord;
        void main () {
            gl_Position = vec4(position, 1.0);
            vFragCoord = (position.xy + 1.0) / 2.0;
        }
    |]


fragmentShader : Shader {} Uniforms { vFragCoord : Vec2 }
fragmentShader =
    [glsl|
        precision mediump float;
        varying vec2      vFragCoord;
        uniform float     time;
        uniform sampler2D bitmoji;

        const int   animSteps = 60;
        const float animDist  = 0.003;
        const float pi        = 3.141592653589793;

        uniform float aTimeMultiplier;
        uniform float aPhase;
        uniform vec2  aTarget;
        uniform vec2  aMovement;

        uniform float bTimeMultiplier;
        uniform float bPhase;
        uniform vec2  bTarget;
        uniform vec2  bMovement;

        uniform float cTimeMultiplier;
        uniform float cPhase;
        uniform vec2  cTarget;
        uniform vec2  cMovement;

        uniform float dTimeMultiplier;
        uniform float dPhase;
        uniform vec2  dTarget;
        uniform vec2  dMovement;

        vec2 dance(float time, vec2 uv, vec2 target, vec2 movement) {
            vec2 diff = abs(uv - target);
            vec2 value = vec2(0.);
            for(int step = 0; step < animSteps; step++) {
                if (length(diff) < length(float(step)*animDist)) {
                    value += (movement/1000.)*time;
                }
            }
            return value;
        }

        void main(void) {
            vec2 uv = vFragCoord;
            vec2 img = vec2(uv);

            img += dance(sin(time*aTimeMultiplier*100. + aPhase*pi), uv, aTarget, aMovement);
            img += dance(sin(time*bTimeMultiplier*100. + bPhase*pi), uv, bTarget, bMovement);
            img += dance(sin(time*cTimeMultiplier*100. + cPhase*pi), uv, cTarget, cMovement);
            img += dance(sin(time*dTimeMultiplier*100. + dPhase*pi), uv, dTarget, dMovement);

            gl_FragColor = texture2D(bitmoji, img);
        }
    |]



-- BITMOJI "API"


bitmojiSize : number
bitmojiSize =
    398


parseIds : D.Decoder ( String, String )
parseIds =
    D.andThen parseIds_ D.string


parseIds_ : String -> D.Decoder ( String, String )
parseIds_ raw =
    if not <| String.startsWith baseUrl raw then
        D.fail ""
    else
        case dropUntilUserId (String.split "-" raw) of
            Nothing ->
                D.fail ""

            Just userId ->
                String.dropLeft (String.length baseUrl) raw
                    |> String.split ("-" ++ userId)
                    |> List.head
                    |> Maybe.map (D.succeed << Tuple.pair userId)
                    |> Maybe.withDefault (D.fail "")


dropUntilUserId : List String -> Maybe String
dropUntilUserId segments =
    case segments of
        [] ->
            Nothing

        [ a, b, c, d, e, _ ] ->
            Just (String.join "-" [ a, b, c, d, e ])

        _ :: rest ->
            dropUntilUserId rest


baseUrl : String
baseUrl =
    "https://render.bitstrips.com/v2/cpanel/"


chromeExtensionUrl : String
chromeExtensionUrl =
    "https://chrome.google.com/webstore/detail/bitmoji/bfgdeiadkckfbkeigkoncpdieiiefpig?hl=en"


{-| DANCE

Choose which 4 points (a, b, c, d) to animate in the Bitmoji image!

     TimeMultiplier: rate of movement. Bigger means faster.
     Phase: radians by which to offset movement. Bigger means more delayed.
     Target: coordinates [0, 1]. Point to target.
     Movement: distance in target coordinate system [0, 1]. How far to animate.

-}
type alias Dance a =
    { a
        | aTimeMultiplier : Float
        , aPhase : Float
        , aTarget : Vec2
        , aMovement : Vec2
        , bTimeMultiplier : Float
        , bPhase : Float
        , bTarget : Vec2
        , bMovement : Vec2
        , cTimeMultiplier : Float
        , cPhase : Float
        , cTarget : Vec2
        , cMovement : Vec2
        , dTimeMultiplier : Float
        , dPhase : Float
        , dTarget : Vec2
        , dMovement : Vec2
    }


lean : Dance { comicId : String }
lean =
    { comicId = "49490f4e-eabb-4cab-bcb6-69f361d66706"

    -- HEAD
    , aTimeMultiplier = 0.16
    , aPhase = -1 / 2
    , aTarget = vec2 0.5 0.7
    , aMovement = vec2 0 0.2

    -- HIPS
    , bTimeMultiplier = 0.08
    , bPhase = 0
    , bTarget = vec2 0.5 0.3
    , bMovement = vec2 0.6 0

    -- FEET
    , cTimeMultiplier = 0.16
    , cPhase = -1 / 2
    , cTarget = vec2 0.5 0.1
    , cMovement = vec2 0 0.1

    -- ???
    , dTimeMultiplier = 0.1
    , dPhase = 0.1
    , dTarget = vec2 0.2 0.2
    , dMovement = vec2 0.1 0.1
    }


disco : Dance { comicId : String }
disco =
    { comicId = "5ee3832d-7743-43c8-b6d7-ea47f11a1798"

    -- LEFT ARM
    , aTimeMultiplier = 0.08
    , aPhase = 0
    , aTarget = vec2 0.1 0.6
    , aMovement = vec2 0.2 0.3

    -- HIPS
    , bTimeMultiplier = 0.08
    , bPhase = -1 / 2
    , bTarget = vec2 0.5 0.3
    , bMovement = vec2 0.5 -0.2

    -- RIGHT ARM
    , cTimeMultiplier = 0.08
    , cPhase = -1
    , cTarget = vec2 0.7 0.4
    , cMovement = vec2 0.3 0.5

    -- HEAD
    , dTimeMultiplier = 0.08
    , dPhase = -1 / 2
    , dTarget = vec2 0.45 0.7
    , dMovement = vec2 0.05 -0.15
    }


type Customization
    = TimeMultiplier Anchor Float
    | Phase Anchor Float
    | Target Anchor Vec2
    | MovementX Anchor Float
    | MovementY Anchor Float


type Anchor
    = A
    | B
    | C
    | D


customize : Customization -> Dance a -> Dance a
customize customization dance =
    case customization of
        TimeMultiplier A value ->
            { dance | aTimeMultiplier = value }

        Phase A value ->
            { dance | aPhase = value }

        Target A value ->
            { dance | aTarget = value }

        MovementX A value ->
            { dance | aMovement = Math.Vector2.setX value dance.aMovement }

        MovementY A value ->
            { dance | aMovement = Math.Vector2.setY value dance.aMovement }

        TimeMultiplier B value ->
            { dance | bTimeMultiplier = value }

        Phase B value ->
            { dance | bPhase = value }

        Target B value ->
            { dance | bTarget = value }

        MovementX B value ->
            { dance | bMovement = Math.Vector2.setX value dance.bMovement }

        MovementY B value ->
            { dance | bMovement = Math.Vector2.setY value dance.bMovement }

        TimeMultiplier C value ->
            { dance | cTimeMultiplier = value }

        Phase C value ->
            { dance | cPhase = value }

        Target C value ->
            { dance | cTarget = value }

        MovementX C value ->
            { dance | cMovement = Math.Vector2.setX value dance.cMovement }

        MovementY C value ->
            { dance | cMovement = Math.Vector2.setY value dance.cMovement }

        TimeMultiplier D value ->
            { dance | dTimeMultiplier = value }

        Phase D value ->
            { dance | dPhase = value }

        Target D value ->
            { dance | dTarget = value }

        MovementX D value ->
            { dance | dMovement = Math.Vector2.setX value dance.dMovement }

        MovementY D value ->
            { dance | dMovement = Math.Vector2.setY value dance.dMovement }
