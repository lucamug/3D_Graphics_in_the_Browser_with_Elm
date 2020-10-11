module Landscape.Cube exposing (colorful, gray)

import Landscape.Color as Color exposing (Color)
import Landscape.Vertex exposing (Vertex)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import WebGL exposing (Mesh)


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


gray : Float -> Float -> Float -> Mesh Vertex
gray =
    cube
        (Colors
            Color.grey50
            Color.grey50
            Color.grey50
            Color.grey50
            Color.grey50
            Color.grey50
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
            faceWithNormal colors.front rft lft lbt rbt (vec3 0 0 1)

        back =
            faceWithNormal colors.back rfb lfb lbb rbb (vec3 0 0 -1)

        left =
            faceWithNormal colors.left lft lfb lbb lbt (vec3 -1 0 0)

        right =
            faceWithNormal colors.right rft rfb rbb rbt (vec3 1 0 0)

        top =
            faceWithNormal colors.top rft rfb lfb lft (vec3 0 1 0)

        bottom =
            faceWithNormal colors.bottom rbt rbb lbb lbt (vec3 0 -1 0)
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


faceWithNormal : Color -> Vec3 -> Vec3 -> Vec3 -> Vec3 -> Vec3 -> List ( Vertex, Vertex, Vertex )
faceWithNormal color a b c d normal =
    let
        vertex position =
            Vertex (Color.vec3 color) position normal
    in
    [ ( vertex a, vertex b, vertex c )
    , ( vertex c, vertex d, vertex a )
    ]
