module Assets.Libraries exposing
    ( Library
    , libraries
    )

import Assets.People exposing (PersonId(..))


type alias Library =
    { name : String
    , personId : PersonId
    , url : String
    , description : String
    }


libraries : List Library
libraries =
    [ { name = "elm-3d-scene"
      , url = "https://package.elm-lang.org/packages/ianmackenzie/elm-3d-scene/latest/"
      , personId = Ianemackenzie
      , description = "This is a high-level Elm package for producing 3D Graphics, with support for lighting, shadows and realistic materials."
      }
    , { name = "elm-physics"
      , url = "https://package.elm-lang.org/packages/w0rm/elm-physics/latest/"
      , personId = Unsoundscapes
      , description = "Experimental toy physics engine."
      }
    , { name = "webgl"
      , url = "https://package.elm-lang.org/packages/elm-explorations/webgl/latest/"
      , personId = ElmExplorations
      , description = "A simple API for rendering with WebGL. This is useful for both 2D and 3D rendering because it lets you take advantage of hardware acceleration with the GPU, meaning you can render things more quickly. This library was created by [Evan Czaplicki](#evancz) and [John P Mayer, Jr](#johnpmayer). [Andrey Kuzmin](#unsoundscapes) is now the main maintainer."
      }
    , { name = "elm-geometry"
      , url = "https://package.elm-lang.org/packages/ianmackenzie/elm-geometry/latest/"
      , personId = Ianemackenzie
      , description = "This package provides a wide variety of geometric data types such as points, vectors, arcs, spline curves and coordinate frames, along with functions for transforming and combining them in many different ways."
      }
    , { name = "elm-3d-camera"
      , url = "https://package.elm-lang.org/packages/ianmackenzie/elm-3d-camera/latest/"
      , personId = Ianemackenzie
      , description = "This package provides convenient ways to define and use perspective and orthographic cameras in 3D."
      }
    , { name = "elm-obj-file"
      , url = "https://package.elm-lang.org/packages/w0rm/elm-obj-file/latest/"
      , personId = Unsoundscapes
      , description = "An Elm package to decode 3D models from the OBJ file format. Helpful to create objects in Blender and render them with elm-3d-scene."
      }
    , { name = "elm-playground-3d"
      , url = "https://github.com/lucamug/elm-playground-3d"
      , personId = Lucamug
      , description = "A package to draw simple three-dimensional objects in SVG."
      }
    ]
