module Landscape exposing (main)

import Browser
import Browser.Events
import Html exposing (Html, main_)
import Html.Attributes exposing (height, style, width)
import Json.Decode as D
import Keyboard
import Landscape.Cube
import Landscape.Generator
import Landscape.Vertex exposing (Vertex)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import WebGL exposing (Entity, Mesh, Shader)


main : Program () Model Msg
main =
    Browser.document
        { init = always ( initModel, Cmd.none )
        , view = doc
        , update = update
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    let
        vectorDecoder : D.Decoder Vec2
        vectorDecoder =
            D.map2 Vec2.vec2
                (D.field "x" D.float)
                (D.field "y" D.float)

        drags =
            case model.dragger of
                Just _ ->
                    Sub.batch
                        [ Browser.Events.onMouseMove (vectorDecoder |> D.map Drag)
                        , Browser.Events.onMouseUp (vectorDecoder |> D.map DragEnd)
                        ]

                Nothing ->
                    Browser.Events.onMouseDown (vectorDecoder |> D.map DragStart)
    in
    Sub.batch
        [ drags
        , Browser.Events.onAnimationFrameDelta Animate
        , Keyboard.subscriptions { tagger = KeyboardMsg }
        ]


landscapeOptions =
    { divisions = 127
    , seed = 42
    , freq = 0.3
    , width = 10
    , length = 10
    , height = 1
    , color = vec3 0.4 0.9 0.1
    }


playerHeight =
    0.6


elevationAtPoint : Float -> Float -> Float
elevationAtPoint =
    Landscape.Generator.elevationAtPoint landscapeOptions



-- MODEL


type alias Model =
    { theta : Float
    , dragger : Maybe { from : Vec2, to : Vec2 }
    , drag : Vec2
    , keyboard : Keyboard.State
    , player : Vec2
    , meshes :
        { player : Mesh Vertex
        , landscape : Mesh Vertex
        }
    }


initModel : Model
initModel =
    { theta = 0
    , dragger = Nothing
    , drag = vec2 0 0
    , keyboard = Keyboard.init
    , player = vec2 0 0
    , meshes =
        { player = Landscape.Cube.colorful (playerHeight / 4) playerHeight (playerHeight / 4)
        , landscape =
            Landscape.Generator.mesh landscapeOptions
                |> (\( vertices, indices ) -> WebGL.indexedTriangles vertices indices)
        }
    }


getDrag : Model -> Vec2
getDrag model =
    model.dragger
        |> Maybe.map (\x -> Vec2.add model.drag (Vec2.sub x.to x.from))
        |> Maybe.withDefault model.drag



-- UPDATE


type Msg
    = Animate Float
    | DragStart Vec2
    | Drag Vec2
    | DragEnd Vec2
    | KeyboardMsg Keyboard.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Animate elapsed ->
            ( { model | theta = model.theta + (elapsed / 10000) }
                |> movePlayer (elapsed / 500)
            , Cmd.none
            )

        DragStart pos ->
            ( { model | dragger = Just { from = pos, to = pos } }, Cmd.none )

        Drag pos ->
            ( { model
                | dragger = Maybe.map (\drag -> { drag | to = pos }) model.dragger
              }
            , Cmd.none
            )

        DragEnd _ ->
            ( { model
                | dragger = Nothing
                , drag =
                    model.dragger
                        |> Maybe.map (\x -> Vec2.add model.drag (Vec2.sub x.to x.from))
                        |> Maybe.withDefault model.drag
              }
            , Cmd.none
            )

        KeyboardMsg msg_ ->
            ( { model | keyboard = Keyboard.update msg_ model.keyboard }
            , Cmd.none
            )


movePlayer : Float -> Model -> Model
movePlayer d model =
    let
        x =
            if model.keyboard |> Keyboard.isKeyDown Keyboard.ArrowRight then
                d

            else if model.keyboard |> Keyboard.isKeyDown Keyboard.ArrowLeft then
                -d

            else
                0

        y =
            if model.keyboard |> Keyboard.isKeyDown Keyboard.ArrowUp then
                -d

            else if model.keyboard |> Keyboard.isKeyDown Keyboard.ArrowDown then
                d

            else
                0
    in
    { model | player = Vec2.add model.player (vec2 x y) }



-- VIEW


doc : Model -> Browser.Document Msg
doc model =
    { title = "Elm/WebGl Experiment"
    , body = view model |> List.singleton
    }


viewport =
    { width = 800
    , height = 600
    }


view : Model -> Html msg
view model =
    main_
        [ style "position" "absolute"
        , style "top" "0"
        , style "left" "0"
        , style "width" "100%"
        , style "height" "100%"
        , style "background-color" "black"
        , style "display" "flex"
        , style "align-items" "center"
        , style "justify-content" "center"
        ]
        [ WebGL.toHtml
            [ width viewport.width
            , height viewport.height
            , style "background-color" "#16161D"
            ]
            (scene (getDrag model) model)
        ]



-- SCENE


scene : Vec2 -> Model -> List Entity
scene drag model =
    let
        uniforms =
            sceneUniforms drag

        ( px, py ) =
            ( Vec2.getX model.player, Vec2.getY model.player )

        pz x y =
            elevationAtPoint x y + (playerHeight / 2)
    in
    [ WebGL.entity
        vertexShader
        fragmentShader
        model.meshes.landscape
        uniforms
    , WebGL.entity
        vertexShader
        fragmentShader
        model.meshes.player
        (playerUniforms
            (Mat4.makeTranslate (vec3 px (pz px py) py))
            uniforms.rotation
        )
    ]


type alias Uniforms =
    { rotation : Mat4
    , translate : Mat4
    , perspective : Mat4
    , camera : Mat4
    , directionalLight : Vec3
    }


type alias Varyings =
    { v_color : Vec3
    , v_normal : Vec3
    , v_position : Vec3
    , v_lighting : Vec3
    }


directionalLight =
    Vec3.fromRecord { x = 1, y = 0.7, z = 0.2 }


camera =
    Mat4.makeLookAt (vec3 0 2 8) (vec3 0 0 0) (vec3 0 1 0)


perspective =
    let
        aspect =
            toFloat viewport.width / toFloat viewport.height
    in
    Mat4.makePerspective 45 aspect 0.01 100


sceneUniforms : Vec2 -> Uniforms
sceneUniforms drag =
    { rotation =
        Mat4.identity
            |> Mat4.rotate (Vec2.getY drag * 0.01) (vec3 1 0 0)
            |> Mat4.rotate (Vec2.getX drag * 0.01) (vec3 0 1 0)
    , translate = Mat4.identity
    , perspective = perspective
    , camera = camera
    , directionalLight = directionalLight
    }


playerUniforms : Mat4 -> Mat4 -> Uniforms
playerUniforms position rotation =
    { rotation = rotation
    , translate = position
    , perspective = perspective
    , camera = camera
    , directionalLight = directionalLight
    }


vertexShader : Shader Vertex Uniforms Varyings
vertexShader =
    [glsl|
        precision mediump float;

        attribute vec3 position;
        attribute vec3 color;
        attribute vec3 normal;

        uniform mat4 perspective;
        uniform mat4 camera;
        uniform mat4 rotation;
        uniform mat4 translate;
        uniform vec3 directionalLight;

        varying vec3 v_color;
        varying vec3 v_normal;
        varying vec3 v_position;
        varying highp vec3 v_lighting;


        void main () {
            gl_Position = perspective * camera * rotation * translate * vec4(position, 1.0);
            
            highp vec3 ambientLight = vec3(0.1, 0.1, 0.1);
            highp vec3 directionalLightColor = vec3(1, 1, 1);
            highp vec3 directionalVector = normalize(directionalLight);
            highp vec4 transformedNormal = rotation * vec4(normalize(normal), 1.0);
            highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

            v_lighting = ambientLight + (directionalLightColor * directional);
            v_color = color;
            v_normal = normal;
            v_position = position;
        }
    |]


fragmentShader : Shader {} Uniforms Varyings
fragmentShader =
    [glsl|
        precision mediump float;


        uniform mat4 perspective;
        uniform mat4 camera;
        uniform mat4 rotation;
        uniform vec3 directionalLight;

        varying vec3 v_color;
        varying vec3 v_normal;
        varying vec3 v_position;
        varying vec3 v_lighting;

        void main () {
            gl_FragColor = vec4(v_color * v_lighting, 1.0);
        }
    |]
