module Main exposing (..)

import Html exposing (Html)
import Html.Attributes exposing (style)
import Svg exposing (Svg)
import Svg.Attributes as Attributes
import OpenSolid.Svg as Svg
import OpenSolid.Geometry.Types exposing (..)
import OpenSolid.Point3d as Point3d
import OpenSolid.Direction2d as Direction2d
import OpenSolid.SketchPlane3d as SketchPlane3d
import Time exposing (Time)
import AnimationFrame
import Color
import Color.Convert


type alias Face =
    { points : List Point3d
    , color : String
    }


grid : Time -> List Face
grid time =
    let
        f ( x, y ) =
            let
                r =
                    sqrt (x ^ 2 + y ^ 2)

                z =
                    r * pi / 15 * sin (pi / 80 * r + time / 100)
            in
                z

        gridElement ( x, y ) =
            let
                color =
                    Color.hsl (f ( x, y ) / 10) 0.7 0.4
                        |> Color.Convert.colorToHex

                point ( x, y ) =
                    Point3d ( x, y, f ( x, y ) )

                points =
                    [ point ( x - 10, y - 10 )
                    , point ( x, y - 10 )
                    , point ( x, y )
                    , point ( x - 10, y )
                    ]
            in
                Face
                    points
                    color

        range =
            (List.range -12 12) |> List.map (toFloat >> (*) 10)

        matrix =
            range
                |> List.concatMap
                    (\x ->
                        range |> List.map (\y -> ( x, y ))
                    )
    in
        matrix
            |> List.map gridElement


sketchPlane : Time -> SketchPlane3d
sketchPlane time =
    SketchPlane3d.xy
        |> SketchPlane3d.rotateAroundOwn SketchPlane3d.xAxis (degrees -0.025 * time)
        |> SketchPlane3d.rotateAroundOwn SketchPlane3d.yAxis (degrees 0.05 * time)


svgProjection : Time -> List (Svg Msg)
svgProjection time =
    let
        draw face =
            Svg.polygon2d
                [ Attributes.stroke "white"
                , Attributes.strokeWidth "0.5"
                , Attributes.strokeOpacity "0.5"
                , Attributes.fill face.color
                , Attributes.fillOpacity "0.5"
                ]
                (Polygon2d face.points)

        plane =
            sketchPlane time
    in
        time
            |> grid
            |> sortByDistanceToPlane (SketchPlane3d.plane plane)
            |> List.map
                (\face ->
                    { points =
                        (face.points
                            |> List.map (Point3d.projectInto plane)
                        )
                    , color = face.color
                    }
                        |> draw
                )


sortByDistanceToPlane : Plane3d -> List Face -> List Face
sortByDistanceToPlane plane faces =
    let
        minDistance face =
            face.points
                |> List.map (Point3d.signedDistanceFrom plane)
                |> List.minimum
                |> Maybe.withDefault 0
    in
        faces
            |> List.sortBy minDistance


container : ( Float, Float ) -> ( Float, Float ) -> List (Svg Msg) -> Html Msg
container ( minX, minY ) ( maxX, maxY ) svgs =
    let
        width =
            maxX - minX

        height =
            maxY - minY

        topLeftFrame =
            Frame2d
                { originPoint = Point2d ( minX, maxY )
                , xDirection = Direction2d.x
                , yDirection = Direction2d.flip Direction2d.y
                }
    in
        Html.div []
            [ Svg.svg
                [ Attributes.width (toString width)
                , Attributes.height (toString height)
                ]
                (svgs
                    |> List.map
                        (\svg ->
                            (Svg.relativeTo topLeftFrame svg)
                        )
                )
            ]


view : Model -> Html Msg
view model =
    let
        styles =
            [ ( "backgroundColor", "#000000" )
            , ( "height", "-1%" )
            , ( "display", "flex" )
            , ( "justify-content", "center" )
            , ( "flex-wrap", "wrap" )
            ]

        svgs =
            [ 0.25, -0.5, -0.25 ]
                |> List.map
                    (\speed ->
                        container ( -200, -200 ) ( 200, 200 ) (svgProjection (speed * model))
                    )
    in
        Html.div [ style styles ] svgs


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    Time


init : ( Model, Cmd Msg )
init =
    ( 0, Cmd.none )



-- UPDATE


type Msg
    = Tick Time


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick newTime ->
            ( newTime, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    AnimationFrame.times Tick



-- alternative Geometry


cube : List Face
cube =
    [ -- top
      Face
        [ Point3d ( -50, -50, -50 )
        , Point3d ( 50, -50, -50 )
        , Point3d ( 50, -50, 50 )
        , Point3d ( -50, -50, 50 )
        ]
        "#9CD253"
      -- bottom
    , Face
        [ Point3d ( -50, 50, -50 )
        , Point3d ( 50, 50, -50 )
        , Point3d ( 50, 50, 50 )
        , Point3d ( -50, 50, 50 )
        ]
        "#60B5CC"
      -- back
    , Face
        [ Point3d ( -50, -50, -50 )
        , Point3d ( 50, -50, -50 )
        , Point3d ( 50, 50, -50 )
        , Point3d ( -50, 50, -50 )
        ]
        "#34495E"
      -- front
    , Face
        [ Point3d ( -50, -50, 50 )
        , Point3d ( 50, -50, 50 )
        , Point3d ( 50, 50, 50 )
        , Point3d ( -50, 50, 50 )
        ]
        "#5A6275"
      --left
    , Face
        [ Point3d ( -50, -50, -50 )
        , Point3d ( -50, 50, -50 )
        , Point3d ( -50, 50, 50 )
        , Point3d ( -50, -50, 50 )
        ]
        "#E5A63A"
      --right
    , Face
        [ Point3d ( 50, -50, -50 )
        , Point3d ( 50, 50, -50 )
        , Point3d ( 50, 50, 50 )
        , Point3d ( 50, -50, 50 )
        ]
        "#A63AE5"
    ]
