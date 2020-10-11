module Main exposing (main)

import Browser
import Browser.Events
import GameOfLife
import Html exposing (Html)
import Html.Attributes exposing (height, width)
import Json.Decode as D
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Model exposing (Camera, Model, Msg(..))
import WebGL exposing (Entity, Mesh, Shader)
import Xyz.Cube
import Xyz.Vertex exposing (Vertex)


main : Program () Model Msg
main =
    Browser.document
        { init = always ( Model.init, Cmd.none )
        , view =
            \model ->
                { title = "Game of life"
                , body = view model |> List.singleton
                }
        , update = update
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    let
        xyDecoder : D.Decoder Vec2
        xyDecoder =
            D.map2 Vec2.vec2
                (D.field "x" D.float)
                (D.field "y" D.float)
    in
    Sub.batch
        [ Browser.Events.onAnimationFrameDelta Animate
        , case model.dragger of
            Just _ ->
                Sub.batch
                    [ Browser.Events.onMouseMove (xyDecoder |> D.map Drag)
                    , Browser.Events.onMouseUp (D.succeed DragEnd)
                    ]

            Nothing ->
                Browser.Events.onMouseDown (xyDecoder |> D.map DragStart)
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Animate delta ->
            ( { model
                | theta = model.theta + (delta / 10000)
                , world =
                    if model.worldFrames == 0 then
                        GameOfLife.run model.world

                    else
                        model.world
                , worldFrames =
                    if model.worldFrames == 0 then
                        model.worldSpeed

                    else
                        model.worldFrames - 1
              }
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

        DragEnd ->
            ( { model
                | dragger = Nothing
                , drag =
                    model.dragger
                        |> Maybe.map (\x -> Vec2.add model.drag (Vec2.sub x.to x.from))
                        |> Maybe.withDefault model.drag
              }
            , Cmd.none
            )


viewport =
    { width = 800
    , height = 600
    }


view : Model -> Html msg
view model =
    WebGL.toHtml
        [ width viewport.width
        , height viewport.height
        ]
        (scene (Model.getDrag model) model)


scene : Vec2 -> Model -> List Entity
scene drag model =
    model.world
        |> GameOfLife.toList
        |> List.map (Tuple.mapBoth toFloat toFloat)
        |> List.map
            (\( x, y ) ->
                WebGL.entity
                    vertexShader
                    fragmentShader
                    (Xyz.Cube.colorful 0.9 0.9 0.9)
                    (uniforms model.camera (Vec3.vec3 x y 0) drag ( x, y ))
            )


uniforms : Camera -> Vec3 -> Vec2 -> ( Float, Float ) -> Uniforms
uniforms camera_ playerPos drag ( x, y ) =
    { rotation = Mat4.makeRotate (Vec2.getX drag * 0.05) (vec3 0 1 0)
    , translate = Mat4.makeTranslate (vec3 x 0 y)
    , perspective = perspective
    , camera = camera camera_
    , playerPos = playerPos
    , cameraFocus = camera_.focus
    , receiveShadow = 0.0
    }


type alias Uniforms =
    { rotation : Mat4
    , translate : Mat4
    , perspective : Mat4
    , camera : Mat4
    , playerPos : Vec3
    , cameraFocus : Vec3
    , receiveShadow : Float
    }


type alias Varyings =
    { v_color : Vec3
    }


camera : Camera -> Mat4
camera camera_ =
    Mat4.makeLookAt camera_.position camera_.focus (vec3 0 1 0)


aspect =
    toFloat viewport.width / toFloat viewport.height


perspective =
    Mat4.makePerspective 60 aspect 0.01 300


vertexShader : Shader Vertex Uniforms Varyings
vertexShader =
    [glsl|
        precision mediump float;

        attribute vec3 position;
        attribute vec3 color;

        uniform mat4 perspective;
        uniform mat4 camera;
        uniform mat4 translate;
        uniform mat4 rotation;

        varying vec3 v_color;

        void main () {
            gl_Position = perspective * camera * rotation * translate * vec4(position, 1.0);
            v_color = color;
        }
    |]


fragmentShader : Shader {} Uniforms Varyings
fragmentShader =
    [glsl|
        precision mediump float;
        varying vec3 v_color;
        void main () {
            gl_FragColor = vec4(v_color , 1.0);
        }
    |]
