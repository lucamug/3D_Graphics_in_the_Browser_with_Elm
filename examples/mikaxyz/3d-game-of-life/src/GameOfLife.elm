module GameOfLife exposing (..)

import Set


type Cell
    = Cell { x : Int, y : Int }


cellAtPosition : Int -> Int -> Cell
cellAtPosition x y =
    Cell { x = x, y = y }


type World
    = World (List Cell)


worldWithCells : List Cell -> World
worldWithCells cells =
    World cells



--


isAlive : World -> Cell -> Bool
isAlive (World cells) cell =
    if isInWorld (World cells) cell then
        cells
            |> List.filter (isNeighbor cell)
            |> List.length
            |> (\x -> x == 2 || x == 3)

    else
        cells
            |> List.filter (isNeighbor cell)
            |> List.length
            |> (==) 3


isInWorld : World -> Cell -> Bool
isInWorld (World cells) cell =
    cells
        |> List.member cell


isNeighbor : Cell -> Cell -> Bool
isNeighbor (Cell c1) (Cell c2) =
    --(( c1.x - c2.x, c1.y - c2.y )
    --    |> Tuple.mapBoth abs abs
    --    |> Debug.log "pp"
    --)
    case ( c1.x - c2.x |> abs, c1.y - c2.y |> abs ) of
        ( 0, 1 ) ->
            True

        ( 1, 0 ) ->
            True

        ( 1, 1 ) ->
            True

        _ ->
            False


run : World -> World
run (World cells) =
    let
        existing =
            cells
                |> List.filter (isAlive (World cells))

        withNeighbors (Cell cell) =
            [ Cell { x = cell.x - 1, y = cell.y - 1 }
            , Cell { x = cell.x + 0, y = cell.y - 1 }
            , Cell { x = cell.x + 1, y = cell.y - 1 }
            , Cell { x = cell.x - 1, y = cell.y + 0 }
            , Cell { x = cell.x + 1, y = cell.y + 0 }
            , Cell { x = cell.x - 1, y = cell.y + 1 }
            , Cell { x = cell.x + 0, y = cell.y + 1 }
            , Cell { x = cell.x + 1, y = cell.y + 1 }
            ]

        new =
            cells
                |> List.map withNeighbors
                |> List.concat
                |> List.filter (not << isInWorld (World cells))
                |> List.filter (isAlive (World cells))
                |> List.map (\(Cell { x, y }) -> ( x, y ))
                |> Set.fromList
                |> Set.toList
                |> List.map (\( x, y ) -> Cell { x = x, y = y })
    in
    World (new ++ existing)


toList : World -> List ( Int, Int )
toList (World cells) =
    cells
        |> List.map (\(Cell { x, y }) -> ( x, y ))
