module Landscape.Vertex exposing (Vertex)

import Math.Vector3 exposing (Vec3)


type alias Vertex =
    { color : Vec3
    , position : Vec3
    , normal : Vec3
    }
