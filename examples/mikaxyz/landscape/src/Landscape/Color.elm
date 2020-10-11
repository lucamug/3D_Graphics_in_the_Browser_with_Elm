module Landscape.Color exposing
    ( Color
    , blue
    , cyan
    , green
    , grey50
    , magenta
    , orange
    , purple
    , red
    , vec3
    , yellow
    )

import Math.Vector3 exposing (Vec3)


type alias Color =
    { r : Float
    , g : Float
    , b : Float
    }


vec3 : Color -> Vec3
vec3 c =
    Math.Vector3.vec3
        (c.r / 255)
        (c.g / 255)
        (c.b / 255)


green =
    Color 0 255 0


blue =
    Color 0 0 255


yellow =
    Color 255 255 0


red =
    Color 255 0 0


purple =
    Color 128 0 128


orange =
    Color 255 128 128


cyan =
    Color 0 255 255


magenta =
    Color 255 0 255


grey50 =
    Color 128 128 128
