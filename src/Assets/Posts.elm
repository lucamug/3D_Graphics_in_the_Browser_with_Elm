module Assets.Posts exposing
    ( Post
    , posts
    )

import Assets.People exposing (PersonId(..))


type alias Post =
    { personId : PersonId
    , title : String
    , url : String
    }


posts : List Post
posts =
    [ { personId = Voorkanter
      , title = "Clicking a 3D mesh in elm-webgl"
      , url = "https://medium.com/@voorkanter/clicking-a-3d-mesh-in-elm-webgl-faadfdf703a0"
      }
    , { personId = Voorkanter
      , title = "A low poly water shader in Elm WebGL"
      , url = "https://medium.com/@voorkanter/a-low-poly-water-shader-in-elm-webgl-7a7a131e2733"
      }
    , { personId = Unsoundscapes
      , title = "3D Physics Engine Pt. 4"
      , url = "https://discourse.elm-lang.org/t/3d-physics-engine-pt-4/4895"
      }
    , { personId = Unsoundscapes
      , title = "3D Physics Engine Pt. 3"
      , url = "https://discourse.elm-lang.org/t/3d-physics-engine-pt-3/3663"
      }
    , { personId = Unsoundscapes
      , title = "3D Physics Engine Pt. 2"
      , url = "https://discourse.elm-lang.org/t/3d-physics-engine-pt-2/1887"
      }
    , { personId = Unsoundscapes
      , title = "3D Physics Engine Pt. 1"
      , url = "https://discourse.elm-lang.org/t/3d-physics-engine/1206"
      }
    , { personId = Unsoundscapes
      , title = "Rendering Real-Time Shadows in WebGL Using Shadow Volumes"
      , url = "https://discourse.elm-lang.org/t/rendering-real-time-shadows-in-webgl-using-shadow-volumes/4029"
      }
    , { personId = Ianemackenzie
      , title = "A 3D rendering engine for Elm: elm-3d-scene 1.0 is now out!"
      , url = "https://discourse.elm-lang.org/t/a-3d-rendering-engine-for-elm-elm-3d-scene-1-0-is-now-out/5972"
      }
    , { personId = Ianemackenzie
      , title = "Elm 3D Scene Tutorial"
      , url = "https://github.com/ianmackenzie/elm-3d-scene/blob/master/TUTORIAL.md"
      }
    , { personId = MacCSOutreach
      , title = "3D Bee Game"
      , url = "https://twitter.com/MacCSOutreach/status/1288157248095649797"
      }
    , { personId = Kfish
      , title = "Quaternion"
      , url = "https://github.com/kfish/quaternion"
      }
    , { personId = Kfish
      , title = "Shader Toy"
      , url = "https://github.com/kfish/elm-shadertoy"
      }
    , { personId = Unsoundscapes
      , title = "Webgl Playground"
      , url = "https://github.com/w0rm/elm-webgl-playground"
      }
    , { personId = Unsoundscapes
      , title = "Slides: Bringing the fun to Graphics Programming"
      , url = "https://unsoundscapes.com/slides/2018-02-20-bringing-the-fun-to-graphics-programming"
      }
    , { personId = Unsoundscapes
      , title = "Slides: Introduction to Elm Webgl"
      , url = "https://unsoundscapes.com/slides/2016-06-06-introduction-to-elm-webgl"
      }
    , { personId = Unsoundscapes
      , title = "Slides: How to flip a table with Elm"
      , url = "https://unsoundscapes.com/slides/2019-12-07-how-to-flip-a-table-with-elm"
      }
    , { personId = Unsoundscapes
      , title = "Slides: Rendering text with Webgl"
      , url = "https://unsoundscapes.com/slides/2018-07-05-rendering-text-with-webgl"
      }
    , { personId = Ianemackenzie
      , title = "A collection of examples for `elm-3d-scene` ordered by complexity."
      , url = "https://github.com/ianmackenzie/elm-3d-scene/tree/master/examples"
      }
    , { personId = Nacmartin
      , title = "Learn Webgl in 15 lessons. A series of example with written with `elm-explorations/webgl`."
      , url = "https://github.com/ianmackenzie/elm-3d-scene/tree/master/examples"
      }
    ]
