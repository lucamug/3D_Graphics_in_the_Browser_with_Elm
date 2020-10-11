module Xyz.Cube exposing (colorful)

import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import WebGL exposing (Mesh)
import Xyz.Color as Color exposing (Color)
import Xyz.Vertex exposing (Vertex)


type alias Colors =
    { top : Color
    , bottom : Color
    , left : Color
    , right : Color
    , front : Color
    , back : Color
    }


colorful : Float -> Float -> Float -> Mesh Vertex
colorful =
    cube
        (Colors
            Color.green
            Color.magenta
            Color.cyan
            Color.blue
            Color.yellow
            Color.red
        )


cube : Colors -> Float -> Float -> Float -> Mesh Vertex
cube colors w h l =
    let
        rft =
            vec3 w h l |> Vec3.scale 0.5

        lft =
            vec3 -w h l |> Vec3.scale 0.5

        lbt =
            vec3 -w -h l |> Vec3.scale 0.5

        rbt =
            vec3 w -h l |> Vec3.scale 0.5

        rbb =
            vec3 w -h -l |> Vec3.scale 0.5

        rfb =
            vec3 w h -l |> Vec3.scale 0.5

        lfb =
            vec3 -w h -l |> Vec3.scale 0.5

        lbb =
            vec3 -w -h -l |> Vec3.scale 0.5

        front =
            face colors.front rft lft lbt rbt

        back =
            face colors.back rfb lfb lbb rbb

        left =
            face colors.left lft lfb lbb lbt

        right =
            face colors.right rft rfb rbb rbt

        top =
            face colors.top rft rfb lfb lft

        bottom =
            face colors.bottom rbt rbb lbb lbt
    in
    [ front
    , back
    , left
    , right
    , top
    , bottom
    ]
        |> List.concat
        |> WebGL.triangles


face : Color -> Vec3 -> Vec3 -> Vec3 -> Vec3 -> List ( Vertex, Vertex, Vertex )
face color a b c d =
    let
        vertex position =
            Vertex (Color.vec3 color) position
    in
    [ ( vertex a, vertex b, vertex c )
    , ( vertex c, vertex d, vertex a )
    ]
