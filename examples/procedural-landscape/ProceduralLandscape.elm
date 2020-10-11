module ProceduralLandscape exposing (main)

import Angle exposing (Angle)
import Array
import Browser
import Browser.Events
import Camera3d
import Color
import Direction3d
import Html exposing (Html)
import Html.Attributes
import Json.Decode as Decode exposing (Decoder)
import Length
import Pixels exposing (Pixels)
import Point3d
import Quantity exposing (Quantity)
import Scene3d
import Scene3d.Material as Material
import Scene3d.Mesh as Mesh exposing (Mesh)
import Simplex
import Triangle3d
import TriangularMesh
import Viewpoint3d


{-| Declare a coordinate system type (many apps will only need a single
"world coordinates" type, but you can call it whatever you want)
-}
type WorldCoordinates
    = WorldCoordinates


permutationTable =
    Simplex.permutationTableFromInt 42


simplexConfig : Simplex.FractalConfig
simplexConfig =
    { steps = 6, stepSize = 2, persistence = 2, scale = 1 }


fieldMesh : Mesh.Uniform WorldCoordinates
fieldMesh =
    let
        xs =
            List.range -100 100

        ys =
            List.range -100 100

        -- z x y = sin(2 * x) + 2 * sin (y) + 3
        z x y =
            Simplex.fractal2d simplexConfig permutationTable (x / 2.0) (y / 2.0) |> (*) 20

        corners =
            xs
                |> List.concatMap (\x -> ys |> List.map (\y -> ( toFloat x, toFloat y )))
                |> List.concatMap
                    (\( x, y ) ->
                        [ ( Point3d.centimeters x y (z x y)
                          , Point3d.centimeters (x + 1) y (z (x + 1) y)
                          , Point3d.centimeters (x + 1) (y + 1) (z (x + 1) (y + 1))
                          )
                        , ( Point3d.centimeters x y (z x y)
                          , Point3d.centimeters x (y + 1) (z x (y + 1))
                          , Point3d.centimeters (x + 1) (y + 1) (z (x + 1) (y + 1))
                          )
                        ]
                    )
    in
    corners
        |> List.map Triangle3d.fromVertices
        |> Mesh.facets


oceanQuad =
    let
        oceanHight =
            -1
    in
    Scene3d.quad (Material.nonmetal { baseColor = Color.blue, roughness = 0.5 })
        (Point3d.centimeters -100 -100 oceanHight)
        (Point3d.centimeters 100 -100 oceanHight)
        (Point3d.centimeters 100 100 oceanHight)
        (Point3d.centimeters -100 100 oceanHight)


view : Model -> Browser.Document msg
view model =
    let
        mountainEntity =
            Scene3d.mesh (Material.matte Color.brown) fieldMesh

        camera =
            Camera3d.perspective
                { viewpoint =
                    Viewpoint3d.orbitZ
                        { focalPoint = Point3d.origin
                        , distance = Length.centimeters 150
                        , azimuth = model.azimuth
                        , elevation = model.elevation
                        }
                , verticalFieldOfView = Angle.degrees 30
                }
    in
    { title = "Procedural landscape"
    , body =
        [ Html.div
            [ Html.Attributes.style "background-color" "#81a3c6"
            , Html.Attributes.style "height" "100vh"
            , Html.Attributes.style "display" "flex"
            , Html.Attributes.style "justify-content" "center"
            , Html.Attributes.style "align-items" "center"
            ]
            [ Scene3d.sunny
                { entities = [ mountainEntity, oceanQuad ]
                , camera = camera
                , upDirection = Direction3d.z
                , sunlightDirection = Direction3d.yz (Angle.degrees -150)
                , background = Scene3d.transparentBackground
                , clipDepth = Length.centimeters 1
                , shadows = False
                , dimensions = ( Pixels.int 1200, Pixels.int 600 )
                }
            ]
        ]
    }


type alias Model =
    { azimuth : Angle
    , elevation : Angle
    , orbiting : Bool
    }


type Msg
    = MouseDown
    | MouseUp
    | MouseMove (Quantity Float Pixels) (Quantity Float Pixels)


init : () -> ( Model, Cmd Msg )
init () =
    ( { azimuth = Angle.degrees -110
      , elevation = Angle.degrees 30
      , orbiting = False
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        MouseDown ->
            ( { model | orbiting = True }, Cmd.none )

        MouseUp ->
            ( { model | orbiting = False }, Cmd.none )

        MouseMove dx dy ->
            if model.orbiting then
                let
                    rotationRate =
                        Angle.degrees 0.5 |> Quantity.per Pixels.pixel

                    newAzimuth =
                        model.azimuth
                            |> Quantity.minus (dx |> Quantity.at rotationRate)

                    newElevation =
                        model.elevation
                            |> Quantity.plus (dy |> Quantity.at rotationRate)
                            |> Quantity.clamp (Angle.degrees -90) (Angle.degrees 90)
                in
                ( { model | azimuth = newAzimuth, elevation = newElevation }
                , Cmd.none
                )

            else
                ( model, Cmd.none )


decodeMouseMove : Decoder Msg
decodeMouseMove =
    Decode.map2 MouseMove
        (Decode.field "movementX" (Decode.map Pixels.float Decode.float))
        (Decode.field "movementY" (Decode.map Pixels.float Decode.float))


subscriptions : Model -> Sub Msg
subscriptions model =
    if model.orbiting then
        Sub.batch
            [ Browser.Events.onMouseMove decodeMouseMove
            , Browser.Events.onMouseUp (Decode.succeed MouseUp)
            ]

    else
        Browser.Events.onMouseDown (Decode.succeed MouseDown)


main : Program () Model Msg
main =
    Browser.document
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
