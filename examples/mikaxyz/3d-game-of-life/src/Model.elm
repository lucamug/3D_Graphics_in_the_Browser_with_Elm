module Model exposing (..)

import GameOfLife
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 exposing (Vec3, vec3)


type Msg
    = Animate Float
    | DragStart Vec2
    | Drag Vec2
    | DragEnd


type alias Model =
    { theta : Float
    , dragger : Maybe { from : Vec2, to : Vec2 }
    , drag : Vec2
    , camera : Camera
    , worldSpeed : Int
    , worldFrames : Int
    , world : GameOfLife.World
    }


init : Model
init =
    { theta = 0
    , dragger = Nothing
    , drag = vec2 0 0
    , camera = Camera (vec3 10 10 10) (vec3 0 0 0) 1.0
    , worldSpeed = 1
    , worldFrames = 0
    , world =
        gosperGliderGun -25 -5
            --(block 3 3 ++ blinker -3 -3 ++ toad -10 5 ++ beacon -10 8)
            |> GameOfLife.worldWithCells
    }


getDrag model =
    model.dragger
        |> Maybe.map (\x -> Vec2.add model.drag (Vec2.sub x.to x.from))
        |> Maybe.withDefault model.drag


type alias Camera =
    { position : Vec3
    , focus : Vec3
    , zoom : Float
    }


block x y =
    [ GameOfLife.cellAtPosition (x + 0) (y + 0)
    , GameOfLife.cellAtPosition (x + 1) (y + 0)
    , GameOfLife.cellAtPosition (x + 0) (y + 1)
    , GameOfLife.cellAtPosition (x + 1) (y + 1)
    ]


blinker x y =
    [ GameOfLife.cellAtPosition (x + -1) (y + 0)
    , GameOfLife.cellAtPosition (x + 0) (y + 0)
    , GameOfLife.cellAtPosition (x + 1) (y + 0)
    ]


toad x y =
    [ GameOfLife.cellAtPosition (x + 0) (y + 0)
    , GameOfLife.cellAtPosition (x + 1) (y + 0)
    , GameOfLife.cellAtPosition (x + 2) (y + 0)
    , GameOfLife.cellAtPosition (x + -1) (y + 1)
    , GameOfLife.cellAtPosition (x + 0) (y + 1)
    , GameOfLife.cellAtPosition (x + 1) (y + 1)
    ]


beacon : Int -> Int -> List GameOfLife.Cell
beacon x y =
    block x y ++ block (x + 2) (y + 2)


gosperGliderGun : Int -> Int -> List GameOfLife.Cell
gosperGliderGun x y =
    """
........................O
......................O.O
............OO......OO............OO
...........O...O....OO............OO
OO........O.....O...OO
OO........O...O.OO....O.O
..........O.....O.......O
...........O...O
............OO
"""
        |> parseCells x y


parseCells : Int -> Int -> String -> List GameOfLife.Cell
parseCells dx dy str =
    let
        parseLine y line =
            line
                |> String.toList
                |> List.indexedMap (\x -> \char -> { x = x + dx, y = y + dy, char = char })
                |> List.filterMap
                    (\boo ->
                        if boo.char == 'O' then
                            Just (GameOfLife.cellAtPosition boo.x boo.y)

                        else
                            Nothing
                    )
    in
    str
        |> String.lines
        |> List.indexedMap parseLine
        |> List.concat
