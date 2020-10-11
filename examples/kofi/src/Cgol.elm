module Cgol exposing (..)

import Browser
import Browser.Events
import Html
import Html.Attributes
import Html.Events
import Set exposing (Set)
import Svg exposing (Svg, circle, defs, linearGradient, stop, svg, text)
import Svg.Attributes exposing (..)
import Time


blinker : List Cell
blinker =
    parse 1 [ "OOO" ]


smallSpaceship : List Cell
smallSpaceship =
    parse 1
        [ "OOO"
        , ".O."
        , "..O"
        ]


middleSpaceship : List Cell
middleSpaceship =
    parse 2
        [ "..O"
        , "O...O"
        , ".....O"
        , "O....O"
        , ".OOOOO"
        ]


gun : List Cell
gun =
    parse 17
        [ "........................O"
        , "......................O.O"
        , "............OO......OO............OO"
        , "...........O...O....OO............OO"
        , "OO........O.....O...OO"
        , "OO........O...O.OO....O.O"
        , "..........O.....O.......O"
        , "...........O...O"
        , "............OO"
        ]


parse : Int -> List String -> List Cell
parse xOffset raw =
    let
        middle =
            List.length raw // 2

        dotIsDead x y char =
            if char == '.' then
                Nothing
            else
                Just ( -middle + y, x - xOffset )

        unRaw y line =
            String.toList line
                |> List.indexedMap (\x char -> dotIsDead x y char)
                |> List.filterMap identity
    in
    List.concat (List.indexedMap unRaw raw)


type alias Model =
    { previous : World
    , current : World
    , delta : Float
    , stepDuration : Float
    , glyph : Glyph
    , curve : Curve
    }


type alias World =
    Set Cell


type alias Cell =
    ( Int, Int )


init : Model
init =
    { previous = Set.empty
    , current = Set.fromList middleSpaceship
    , delta = 0
    , stepDuration = 450
    , glyph = Dot
    , curve = CubicBezier
    }


view : Model -> Svg Msg
view model =
    let
        ( ( oldFirstX, oldFirstY ), ( oldLastX, oldLastY ) ) =
            northwestSourtheastCorners 5 model.previous

        ( ( newFirstX, newFirstY ), ( newLastX, newLastY ) ) =
            northwestSourtheastCorners 5 model.current
    in
    Html.main_ []
        [ Html.node "style" [] [ text styles ]
        , Html.div []
            [ Html.text "Speed: "
            , Html.input
                [ Html.Attributes.type_ "range"
                , Html.Attributes.min "16"
                , Html.Attributes.max "1000"
                , Html.Attributes.style "direction" "rtl"
                , Html.Events.onInput SetStepDuration
                , Html.Attributes.value (String.fromFloat model.stepDuration)
                ]
                []
            ]
        , Html.div []
            [ Html.text "Curve shape: "
            , Html.button [ Html.Events.onClick (SetCurve CubicBezier) ] [ text "Cubic Bezier" ]
            , Html.button [ Html.Events.onClick (SetCurve Linear) ] [ text "Linear" ]
            ]
        , Html.div []
            [ Html.text "Cell shape: "
            , Html.button [ Html.Events.onClick (SetGlyph Dot) ] [ text "Dot" ]
            , Html.button [ Html.Events.onClick (SetGlyph Star) ] [ text "Star" ]
            , Html.button [ Html.Events.onClick (SetGlyph Box) ] [ text "Box" ]
            , Html.button [ Html.Events.onClick (SetGlyph Pedal) ] [ text "Pedal" ]
            ]
        , Html.div []
            [ Html.text "Pattern: "
            , Html.button [ Html.Events.onClick (SetPattern middleSpaceship) ] [ text "Spaceship" ]
            , Html.button [ Html.Events.onClick (SetPattern gun) ] [ text "Gun" ]
            , Html.button [ Html.Events.onClick (SetPattern blinker) ] [ text "Blinker" ]
            , Html.button [ Html.Events.onClick (SetPattern smallSpaceship) ] [ text "Mystery" ]
            ]
        , svg
            [ viewBox
                (withCurve model oldFirstX newFirstX)
                (withCurve model oldFirstY newFirstY)
                (withCurve model (oldLastX - oldFirstX) (newLastX - newFirstX))
                (withCurve model (oldLastY - oldFirstY) (newLastY - newFirstY))
            ]
          <|
            defs []
                [ linearGradient [ id "pedal", x1 "0%", y1 "0%", x2 "100%", y2 "100%" ]
                    [ stop [ offset "0%", style "stop-color:red;stop-opacity:0.8" ] []
                    , stop [ offset "100%", style "stop-color:navy;stop-opacity:1" ] []
                    ]
                ]
                :: grid (space model) (List.range newFirstX newLastX) (List.range newFirstY newLastY)
        ]


space : Model -> Cell -> Maybe (Svg msg)
space model cell =
    let
        nowAlive =
            alive model.current cell

        wasAlive =
            alive model.previous cell
    in
    if nowAlive && wasAlive {- STAYING ALIIIIVE -} then
        Just <| viewGlyph model.glyph 1 cell
    else if nowAlive {- REVIVING -} then
        Just <| viewGlyph model.glyph (withCurve model 0 1) cell
    else if wasAlive {- DYING -} then
        Just <| viewGlyph model.glyph (withCurve model 1 0) cell
    else
        Nothing


type Msg
    = NewAnimationFrameDelta Float
    | SetPattern (List Cell)
    | SetGlyph Glyph
    | SetCurve Curve
    | SetStepDuration String
    | Next


update : Msg -> Model -> Model
update msg model =
    case msg of
        NewAnimationFrameDelta value ->
            { model | delta = value + model.delta }

        SetPattern cells ->
            { model | previous = Set.empty, current = Set.fromList cells }

        SetGlyph glyph ->
            { model | glyph = glyph }

        SetCurve curve ->
            { model | curve = curve }

        SetStepDuration raw ->
            case String.toFloat raw of
                Nothing ->
                    model

                Just value ->
                    { model | stepDuration = value }

        Next ->
            let
                ( ( firstX, firstY ), ( lastX, lastY ) ) =
                    northwestSourtheastCorners 1 model.current
            in
            { current =
                Set.fromList <|
                    grid (next model.current)
                        (List.range firstX lastX)
                        (List.range firstY lastY)
            , previous = model.current
            , delta = 0
            , stepDuration = model.stepDuration
            , glyph = model.glyph
            , curve = model.curve
            }


next : World -> Cell -> Maybe Cell
next world cell =
    let
        count =
            List.length <| List.filter (alive world) (neighbors cell)
    in
    if count == 3 || count == 2 && alive world cell then
        Just cell
    else
        Nothing


alive : World -> Cell -> Bool
alive world cell =
    Set.member cell world


neighbors : Cell -> List Cell
neighbors ( x, y ) =
    -- ABOVE
    [ ( x - 1, y - 1 )
    , ( x + 0, y - 1 )
    , ( x + 1, y - 1 )

    -- BESIDE
    , ( x - 1, y + 0 )
    , ( x + 1, y + 0 )

    -- BELOW
    , ( x - 1, y + 1 )
    , ( x + 0, y + 1 )
    , ( x + 1, y + 1 )
    ]



-- BOX STUFF


northwestSourtheastCorners : Int -> World -> ( Cell, Cell )
northwestSourtheastCorners padding world =
    let
        ( xs, ys ) =
            Set.foldl (\( x, y ) -> Tuple.mapBoth ((::) x) ((::) y)) ( [], [] ) world

        zeroOr =
            Maybe.withDefault 0
    in
    ( ( zeroOr (List.minimum xs) - padding, zeroOr (List.minimum ys) - padding )
    , ( zeroOr (List.maximum xs) + padding, zeroOr (List.maximum ys) + padding )
    )


withCurve : Model -> Int -> Int -> Float
withCurve model from to =
    let
        f =
            case model.curve of
                Linear ->
                    linear

                CubicBezier ->
                    cubicBezier
    in
    f (clamp 0 1 (model.delta / model.stepDuration)) (toFloat from) (toFloat to)


grid : (Cell -> Maybe a) -> List Int -> List Int -> List a
grid f rangeX rangeY =
    List.concatMap (\x -> List.filterMap (\y -> f ( x, y )) rangeY) rangeX


viewBox : Float -> Float -> Float -> Float -> Svg.Attribute msg
viewBox x1 x2 x3 x4 =
    Svg.Attributes.viewBox <|
        String.fromFloat x1
            ++ " "
            ++ String.fromFloat x2
            ++ " "
            ++ String.fromFloat x3
            ++ " "
            ++ String.fromFloat x4


last : List a -> Maybe a
last list =
    case list of
        [] ->
            Nothing

        _ :: x :: [] ->
            Just x

        _ :: rest ->
            last rest


styles : String
styles =
    """
    html, body {
        margin:0;
        padding:0;
    }
    main {
        height:100vh;
        width:100%;
        display:flex;
        display:flex;
        flex-direction:column;
    }
    svg {
        flex: 1;
    }
    * {
        transform-style: preserve-3d;
    }
    """



-- CURVE
-- https://en.wikipedia.org/wiki/Bézier_curve


type Curve
    = Linear
    | CubicBezier


linear : Float -> Float -> Float -> Float
linear t p0 p1 =
    p0 + t * (p1 - p0)


controlPoint1 =
    1.05


controlPoint2 =
    0.75


cubicBezier : Float -> Float -> Float -> Float
cubicBezier t p0 p3 =
    let
        p1 =
            p0 + controlPoint1 * (p3 - p0)

        p2 =
            p0 + controlPoint2 * (p3 - p0)
    in
    (p0 * ((1 - t) ^ 3))
        + (p1 * 3 * ((1 - t) ^ 2) * t)
        + (p2 * 3 * (1 - t) * (t ^ 2))
        + (p3 * (t ^ 3))



-- GLYPH


size : Float
size =
    0.4


type Glyph
    = Dot
    | Star
    | Box
    | Pedal


viewGlyph : Glyph -> Float -> ( Int, Int ) -> Svg msg
viewGlyph shape multiplier ( x, y ) =
    let
        f =
            case shape of
                Dot ->
                    dot

                Star ->
                    star

                Box ->
                    box

                Pedal ->
                    pedal
    in
    f multiplier (toFloat x) (toFloat y)


dot : Float -> Float -> Float -> Svg msg
dot multiplier x y =
    circle
        [ fill "black"
        , cx (decimal x)
        , cy (decimal y)
        , r (decimal (size * multiplier))
        ]
        []


star : Float -> Float -> Float -> Svg msg
star multiplier x y =
    let
        center =
            decimal x ++ " " ++ decimal y ++ " "
    in
    Svg.path
        [ fill "transparent"
        , stroke "orange"
        , strokeWidth <| decimal (multiplier * 0.2)
        , d <|
            ("M " ++ decimal (x - size) ++ " " ++ decimal y)
                ++ ("Q " ++ center ++ decimal x ++ " " ++ decimal (y - size))
                ++ ("Q " ++ center ++ decimal (x + size) ++ " " ++ decimal y)
                ++ ("Q " ++ center ++ decimal x ++ " " ++ decimal (y + size))
                ++ ("Q " ++ center ++ decimal (x - size) ++ " " ++ decimal y)
        ]
        []


box : Float -> Float -> Float -> Svg msg
box multiplier x y =
    let
        measuredLength =
            3.3
    in
    Svg.path
        [ fill "green"
        , fillOpacity (decimal multiplier)
        , stroke "black"
        , strokeDasharray (decimal measuredLength)
        , strokeDashoffset <| decimal ((1 - multiplier) * measuredLength)
        , strokeWidth "0.2"
        , d <|
            ("M " ++ decimal (x - size) ++ " " ++ decimal (y - size))
                ++ ("H " ++ decimal (x + size))
                ++ ("V " ++ decimal (y + size))
                ++ ("H " ++ decimal (x - size))
                ++ ("V " ++ decimal (y - size))
        ]
        []


pedal : Float -> Float -> Float -> Svg msg
pedal multiplier x y =
    Svg.path
        [ fill "url(#pedal)"
        , fillOpacity <| decimal multiplier
        , style <|
            if multiplier <= 0.001 then
                "display: none"
            else
                "transform: rotate3d("
                    ++ decimal x
                    ++ ","
                    ++ decimal y
                    ++ ", 0,"
                    ++ decimal ((1 - multiplier) * 270)
                    ++ "deg);"
        , d <|
            ("M " ++ decimal (x - size) ++ " " ++ decimal y)
                ++ ("Q "
                        ++ decimal (x - size)
                        ++ " "
                        ++ decimal (y - size)
                        ++ " "
                        ++ decimal x
                        ++ " "
                        ++ decimal (y - size)
                   )
                ++ ("Q "
                        ++ decimal (x + size)
                        ++ " "
                        ++ decimal (y - size)
                        ++ " "
                        ++ decimal (x + size)
                        ++ " "
                        ++ decimal y
                   )
                ++ ("Q "
                        ++ decimal (x + size)
                        ++ " "
                        ++ decimal (y + size)
                        ++ " "
                        ++ decimal x
                        ++ " "
                        ++ decimal (y + size)
                   )
                ++ ("Q "
                        ++ decimal (x - size)
                        ++ " "
                        ++ decimal (y + size)
                        ++ " "
                        ++ decimal (x - size)
                        ++ " "
                        ++ decimal y
                   )
        ]
        []


decimal : Float -> String
decimal =
    String.fromFloat



-- PROGRAM


subscriptions model =
    Sub.batch
        [ Time.every model.stepDuration (\_ -> Next)
        , Browser.Events.onAnimationFrameDelta NewAnimationFrameDelta
        ]


main =
    Browser.element
        { init = \() -> ( init, Cmd.none )
        , update = \msg model -> ( update msg model, Cmd.none )
        , subscriptions = subscriptions
        , view = view
        }
