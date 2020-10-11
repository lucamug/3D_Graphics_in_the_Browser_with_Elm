module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (width, height, style)
import Math.Vector2 as Vec2 exposing (vec2, Vec2, getX, getY)
import WebGL exposing (Mesh, Shader)
import WebGL.Texture as Texture exposing (Texture, Error)
import AnimationFrame
import Task
import Time exposing (Time)


type alias Model =
    { c : Vec2
    , maybeTexture : Maybe WebGL.Texture
    , screenWidth : Int
    , screenHeight : Int
    , timeElapsed : Time
    }


type Msg
    = Animate Float
    | TextureLoad Texture
    | TextureError Error


main : Program Never Model Msg
main =
    Html.program
        { init = ( initialModel, loadTexture )
        , view = view
        , subscriptions = subscriptions
        , update = update
        }


initialModel : Model
initialModel =
    { c = vec2 0.0 0.0
    , maybeTexture = Nothing
    , screenWidth = 1000
    , screenHeight = 1000
    , timeElapsed = 0
    }


loadTexture : Cmd Msg
loadTexture =
    Texture.load "./texture/colormap.png"
        |> Task.attempt
            (\result ->
                case result of
                    Err err ->
                        TextureError err

                    Ok val ->
                        TextureLoad val
            )


view : Model -> Html Msg
view model =
    div
        [ style
            [ ( "background-color", "#000" )
            , ( "display", "flex" )
            , ( "justify-content", "center" )
            , ( "flex-wrap", "wrap" )
            , ( "height", "100%" )
            ]
        ]
        [ fractalView model ]


fractalView : Model -> Html Msg
fractalView { c, maybeTexture, screenWidth, screenHeight } =
    WebGL.toHtml
        [ width screenWidth, height screenHeight ]
        (case maybeTexture of
            Nothing ->
                []

            Just texture ->
                [ WebGL.entity
                    vertexShader
                    fragmentShader
                    mesh
                    { c = c
                    , texture = texture
                    , screenWidth = screenWidth
                    , screenHeight = screenHeight
                    }
                ]
        )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Animate value ->
            let
                cX =
                    sin (0.0006 * (getX model.c + model.timeElapsed + value))

                cY =
                    sin (0.0002 * (getY model.c + model.timeElapsed + value))
            in
                { model | c = vec2 cX cY, timeElapsed = model.timeElapsed + value } ! []

        TextureLoad texture ->
            { model | maybeTexture = Just texture } ! []

        TextureError _ ->
            Debug.crash "Error loading texture"


subscriptions : Model -> Sub Msg
subscriptions model =
    AnimationFrame.diffs Animate


type alias Vertex =
    { position : Vec2 }


type alias Uniforms =
    { c : Vec2, texture : WebGL.Texture, screenWidth : Int, screenHeight : Int }


mesh : Mesh Vertex
mesh =
    WebGL.triangles
        [ ( (Vertex (vec2 -1 -1))
          , (Vertex (vec2 -1 1))
          , (Vertex (vec2 1 1))
          )
        , ( (Vertex (vec2 1 -1))
          , (Vertex (vec2 -1 -1))
          , (Vertex (vec2 1 1))
          )
        ]


vertexShader : Shader Vertex Uniforms {}
vertexShader =
    [glsl|
      precision mediump float;
      attribute vec2 position;

      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    |]


fragmentShader : Shader {} Uniforms {}
fragmentShader =
    [glsl|
      precision mediump float;
      uniform vec2 c;
      uniform sampler2D texture;
      uniform int screenWidth;
      uniform int screenHeight;

      const int max_iterations = 80;

      vec2 complex_square(vec2 v) {
        return vec2(
          v.x * v.x - v.y * v.y,
          v.x * v.y * 2.0
        );
      }

      vec2 julia_function(vec2 z, vec2 c) {
        return c + complex_square(z);
      }

      float iteration_count_to_texture_position(int count) {
        if(count == max_iterations) {
          return 0.0;
        } else {
          return float(count)/float(max_iterations);
        }
      }

      void main() {
        vec2 z = 3.5*vec2((gl_FragCoord.x - 0.5*float(screenWidth))/float(screenWidth), (gl_FragCoord.y - 0.5*float(screenHeight))/float(screenHeight));

        int count = max_iterations;

        for(int i = 0 ; i < max_iterations; i++)  {
          z = julia_function(z, c) ;

          if(dot(z, z) > 800.0) {
            count = i;
            break;
          }
        }

        gl_FragColor = texture2D(texture, vec2(iteration_count_to_texture_position(count), 0.0));
      }
    |]
