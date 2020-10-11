module Landscape.Perlin exposing (value2d)

import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Random


value2d : { seed : Int, freq : Float } -> Float -> Float -> Float
value2d { seed, freq } x_ y_ =
    let
        ( x, y ) =
            ( (x_ * freq) + 2000
            , (y_ * freq) + 2000
            )

        point =
            vec3 x y 0

        { p1, p2, p3, p4 } =
            { p1 = Vec3.fromRecord { x = toFloat (floor x), y = toFloat (floor y), z = 0 }
            , p2 = Vec3.fromRecord { x = toFloat (ceiling x), y = toFloat (floor y), z = 0 }
            , p3 = Vec3.fromRecord { x = toFloat (floor x), y = toFloat (ceiling y), z = 0 }
            , p4 = Vec3.fromRecord { x = toFloat (ceiling x), y = toFloat (ceiling y), z = 0 }
            }

        { g1, g2, g3, g4 } =
            { g1 = randomVec3 seed (floor x) (floor y)
            , g2 = randomVec3 seed (ceiling x) (floor y)
            , g3 = randomVec3 seed (floor x) (ceiling y)
            , g4 = randomVec3 seed (ceiling x) (ceiling y)
            }

        { d1, d2, d3, d4 } =
            { d1 = Vec3.sub p1 point
            , d2 = Vec3.sub p2 point
            , d3 = Vec3.sub p3 point
            , d4 = Vec3.sub p4 point
            }

        { i1, i2, i3, i4 } =
            { i1 = Vec3.dot g1 d1
            , i2 = Vec3.dot g2 d2
            , i3 = Vec3.dot g3 d3
            , i4 = Vec3.dot g4 d4
            }

        c =
            Vec3.sub point p1

        x1 =
            lerp i1 i2 (Vec3.getX c |> fade)

        x2 =
            lerp i3 i4 (Vec3.getX c |> fade)
    in
    lerp x1 x2 (Vec3.getY c |> fade) * 3


randomVec3 : Int -> Int -> Int -> Vec3
randomVec3 seed a b =
    let
        seed_ =
            Random.initialSeed (a * b + seed)

        ( x, seed1 ) =
            Random.step (Random.float 0 1) seed_

        ( y, seed2 ) =
            Random.step (Random.float 0 1) seed1

        ( z, _ ) =
            Random.step (Random.float 0 1) seed2
    in
    vec3 x y z


fade : Float -> Float
fade t =
    t * t * t * (t * (t * 6 - 15) + 10)


lerp : Float -> Float -> Float -> Float
lerp a b x =
    a + x * (b - a)
