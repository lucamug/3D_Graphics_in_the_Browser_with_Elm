module Assets.Demos exposing
    ( Demo
    , demos
    )

import Assets.People exposing (PersonId(..))


type alias Demo =
    { name : String
    , description : String
    , personId : PersonId
    , urlCode : String
    , urlDemo : String
    , urlLocalCode : String
    , urlLocalDemo : String
    , ellie : String
    , post : String
    , gif : String
    }


demos : List Demo
demos =
    [ { name = "Balls and Blocks"
      , description = ""
      , personId = Ianemackenzie
      , urlCode = ""
      , urlDemo = ""
      , urlLocalCode = "elm-3d-scene/physics/Physics.elm"
      , urlLocalDemo = "elm-3d-scene/physics/physics.html"
      , ellie = ""
      , post = ""
      , gif = "cubes-and-spheres.gif"
      }
    , { name = "Cloth"
      , description = "Cloth simulation built using many particle bodies and distance constraints between adjacent points."
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-physics/tree/master/examples/Cloth.elm"
      , urlDemo = "https://unsoundscapes.com/elm-physics/examples/cloth/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = "cloth.gif"
      }
    , { name = "Duckling"
      , description = ""
      , personId = Ianemackenzie
      , urlCode = "https://github.com/ianmackenzie/elm-3d-scene/blob/cfdff607dc867b6751386cd94d1068967f3773a0/testing/Duckling.elm"
      , urlDemo = ""
      , urlLocalCode = "elm-3d-scene/Duckling.elm"
      , urlLocalDemo = "elm-3d-scene/duckling/Duckling.html"
      , ellie = ""
      , post = ""
      , gif = "duck.gif"
      }
    , { name = "Overlay"
      , description = ""
      , personId = Ianemackenzie
      , urlCode = "https://github.com/ianmackenzie/elm-3d-scene/blob/master/examples/Overlay.elm"
      , urlDemo = "https://ianmackenzie.github.io/elm-3d-scene/examples/1.0.0/overlay.html"
      , urlLocalCode = "elm-3d-camera/Overlay.elm"
      , urlLocalDemo = "elm-3d-scene/overlay.html"
      , ellie = "https://ellie-app.com/bdkzqjBxCtQa1"
      , post = ""
      , gif = "overlay.gif"
      }
    , { name = "Lack"
      , description = "This demo allows dragging objects with mouse, try flipping the table!"
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-physics/blob/master/examples/Lack.elm"
      , urlDemo = "https://unsoundscapes.com/elm-physics/examples/lack/"
      , urlLocalCode = "elm-3d-scene/lack/Lack.elm"
      , urlLocalDemo = "elm-3d-scene/lack/Lack.html"
      , ellie = ""
      , post = "https://unsoundscapes.com/slides/2019-12-07-how-to-flip-a-table-with-elm"
      , gif = "lack.gif"
      }
    , { name = "Duckling"
      , description = "This demo loads a convex shape and a mesh from the same OBJ file"
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-physics/blob/master/examples/Duckling.elm"
      , urlDemo = "https://unsoundscapes.com/elm-physics/examples/duckling/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = "ducks-320px.gif"
      }
    , { name = "Circuit Breaker"
      , description = ""
      , personId = MartinSStewart
      , urlCode = "https://gitlab.com/MartinSStewart/hackman"
      , urlDemo = "https://martinsstewart.gitlab.io/hackman/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = "https://dev.to/martinsstewart/what-is-elm-and-a-game-i-m-making-with-it-3di1"
      , gif = "breaker.gif"
      }
    , { name = "Floating City"
      , description = "A three dimensional representation of Tokyo rendered in SVG, used for the Elm Japan Conference website"
      , personId = Lucamug
      , urlCode = "https://elmjapan.org/"
      , urlDemo = "https://github.com/lucamug/elm-japan"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = "elmjapan.gif"
      }
    , { name = "3D Vector Animations"
      , description = "Implementing 3D vector visualizations in Elm, rendered as pure SVGs"
      , personId = MarcoSehrer
      , urlCode = "https://github.com/ninjaconcept/elm-vector-demo-1"
      , urlDemo = "https://elm-vector-demo-1.herokuapp.com/index.html"
      , urlLocalCode = ""
      , urlLocalDemo = "vector-demo/index.html"
      , ellie = ""
      , post = "https://medium.com/ninjaconcept/3d-vector-animations-in-elm-58703993d144"
      , gif = "vector-demo.gif"
      }
    , { name = "Car"
      , description = "This shows how hinge constrains can be used to assemble a car. Use the arrow keys to steer and speed!"
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-physics/tree/master/examples/Car.elm"
      , urlDemo = "https://unsoundscapes.com/elm-physics/examples/car/"
      , urlLocalCode = ""
      , urlLocalDemo = "elm-physics/car.html"
      , ellie = ""
      , post = ""
      , gif = "car.gif"
      }
    , { name = "Boxes"
      , description = "This demo is used to test performance. It drops 5×5×5 boxes. Try changing `boxesPerDimension` to drop even more!"
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-physics/blob/master/examples/Boxes.elm"
      , urlDemo = "https://unsoundscapes.com/elm-physics/examples/boxes/"
      , urlLocalCode = ""
      , urlLocalDemo = "elm-physics/boxes.html"
      , ellie = ""
      , post = ""
      , gif = "boxes.gif"
      }
    , { name = "Teapot"
      , description = ""
      , personId = Ianemackenzie
      , urlCode = "https://github.com/ianmackenzie/elm-3d-camera/blob/3.1.0/examples/Teapot.elm"
      , urlDemo = ""
      , urlLocalCode = "elm-3d-camera/Teapot.elm"
      , urlLocalDemo = "elm-3d-camera/teapot.html"
      , ellie = ""
      , post = ""
      , gif = "teapot-blue.gif"
      }
    , { name = "Slimy Broccoli with Perlin Noise"
      , description = ""
      , personId = Avh4
      , urlCode = "https://github.com/avh4/codevember-2016/tree/master/Day10"
      , urlDemo = ""
      , urlLocalCode = "avh4/smoke/Main.elm"
      , urlLocalDemo = "avh4/smoke/index.html"
      , ellie = ""
      , post = "https://www.youtube.com/watch?v=oc9ib2v9I4s&list=PLDA4wlOlLJvXAEsJDje4hdLazsihZiQNf&index=12%22%3Ehttps://www.youtube.com/watch?v=oc9ib2v9I4s&list=PLDA4wlOlLJvXAEsJDje4hdLazsihZiQNf&index=12"
      , gif = "smoke.gif"
      }
    , { name = "Randomize"
      , description = "This demo drops random bodies. It also shows how to make a compound body out of multiple shapes."
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-physics/tree/master/examples/Randomize.elm"
      , urlDemo = "https://unsoundscapes.com/elm-physics/examples/randomize/"
      , urlLocalCode = ""
      , urlLocalDemo = "elm-physics/randomize.html"
      , ellie = ""
      , post = ""
      , gif = "randomize.gif"
      }
    , { name = "Procedural Landscape"
      , description = ""
      , personId = Myotherpants
      , urlCode = ""
      , urlDemo = ""
      , urlLocalCode = ""
      , urlLocalDemo = "procedural-landscape/ProceduralLandscape.html"
      , ellie = ""
      , post = ""
      , gif = "procedural-landscape.gif"
      }
    , { name = "Dice"
      , description = "Physically simulated dice roller!"
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-dice"
      , urlDemo = "https://unsoundscapes.itch.io/dice"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = "dice.gif"
      }
    , { name = "Viewer"
      , description = "This example demonstrates how to load a mesh from a file. It can also be used to test the parser."
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-obj-file/blob/master/examples/src/Viewer.elm"
      , urlDemo = "https://unsoundscapes.com/elm-obj-file/examples/viewer/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = "https://twitter.com/unsoundscapes/status/1290351995786792961"
      , gif = "preview-OBJ-files.gif"
      }
    , { name = "Pod"
      , description = "This example demonstrates how to extract multiple meshes with shadows from an OBJ file and render with elm-3d-scene."
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-obj-file/blob/master/examples/src/Pod.elm"
      , urlDemo = "https://unsoundscapes.com/elm-obj-file/examples/pod/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = "pod3.png"
      }
    , { name = "Quicklook Shelf Configurator"
      , description = ""
      , personId = ThomasKumlehn
      , urlCode = "https://github.com/PixelPartner/quicklook-shelf-configurator/blob/master/examples/IvarConfig.elm"
      , urlDemo = ""
      , urlLocalCode = "quicklook-shelf-configurator/examples/IvarConfig.elm"
      , urlLocalDemo = "quicklook-shelf-configurator/examples/IvarConfig.html"
      , ellie = ""
      , post = ""
      , gif = "shelf.gif"
      }
    , { --
        -- https://github.com/ianmackenzie/elm-3d-scene/pull/64
        --
        -- git clone https://github.com/ianmackenzie/elm-3d-scene.git
        -- cd elm-3d-scene
        -- git checkout d1a802aaf6a0adc659c2a006b5194396bb225b18
        -- cd examples
        -- elm reactor
        --
        name = "Table and Chairs \u{1FA91}\u{1FA91}"
      , description = ""
      , personId = Unsoundscapes
      , urlCode = "https://github.com/ianmackenzie/elm-3d-scene/blob/d1a802aaf6a0adc659c2a006b5194396bb225b18/examples/Demo.elm"
      , urlDemo = ""
      , urlLocalCode = "Table%20and%20chairs/Demo.elm"
      , urlLocalDemo = "Table%20and%20chairs/index.html"
      , ellie = ""
      , post = ""
      , gif = "table.gif"
      }

    --
    -- Temporarely removed as per Ian request
    --
    -- , { name = "Sprocket"
    --   , description = ""
    --   , personId = Ianemackenzie
    --   , urlCode = ""
    --   , urlDemo = ""
    --   , urlLocalCode = ""
    --   , urlLocalDemo = "elm-3d-scene/sprocket.html"
    --   , ellie = ""
    --   , post = ""
    --   , gif = "gears.gif"
    --   }
    , { name = "3D Game of Life"
      , description = ""
      , personId = Mikaxyz
      , urlCode = "https://github.com/mikaxyz/elm-game-of-life"
      , urlDemo = ""
      , urlLocalCode = "mikaxyz/3d-game-of-life/src/Main.elm"
      , urlLocalDemo = "mikaxyz/3d-game-of-life/index.html"
      , ellie = ""
      , post = "https://twitter.com/mikajauhonen/status/1203088763754369024"
      , gif = "game-of-life.gif"
      }
    , { name = "Copter 3D 🚁"
      , description = ""
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-webgl-playground/blob/master/Copter3D.elm"
      , urlDemo = "http://unsoundscapes.com/elm-webgl-playground/copter3d.html"
      , urlLocalCode = ""
      , urlLocalDemo = "elm-webgl-playground/copter3d.html"
      , ellie = ""
      , post = ""
      , gif = "eli.gif"
      }
    , { name = "Morph"
      , description = ""
      , personId = Francisdb
      , urlCode = "https://github.com/francisdb/glmorph"
      , urlDemo = ""
      , urlLocalCode = ""
      , urlLocalDemo = "francisdb-glmorph/index.html"
      , ellie = ""
      , post = ""
      , gif = "cube.gif"
      }
    , { name = "Cubik"
      , description = ""
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-cubik"
      , urlDemo = "https://unsoundscapes.itch.io/cubik"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = "https://discourse.elm-lang.org/t/open-sourcing-the-rubiks-cube-game/746"
      , gif = "cubik.gif"
      }
    , { name = "Bumping Car 🚗"
      , description = "A modified version of [RaycastCar](https://github.com/w0rm/elm-physics/blob/raycast-vehicle/examples/RaycastCar.elm) written by [Andrey Kuzmin](#unsoundscapes)."
      , personId = Lucamug
      , urlCode = "https://github.com/lucamug/elm-physics-example"
      , urlDemo = "https://elm-physics-example.guupa.com/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = "https://twitter.com/luca_mug/status/1292948585068335105"
      , gif = "physics.gif"
      }
    , { name = "Quake Arena"
      , description = ""
      , personId = Passiomatic
      , urlCode = "https://github.com/passiomatic/elm-quake3-renderer"
      , urlDemo = "http://lab.passiomatic.com/quake3/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = "https://discourse.elm-lang.org/t/render-quake-3-arena-maps-with-elm-and-webgl/3820"
      , gif = "quake3.gif"
      }
    , { name = "Hannover"
      , description = ""
      , personId = Aforemny
      , urlCode = "https://github.com/hannover-elm/website/blob/master/src/Logo.elm"
      , urlDemo = "https://hannover-elm.github.io/website/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = "hannover2.gif"
      }
    , { name = "Lesson 10 - First person perspective"
      , description = ""
      , personId = Nacmartin
      , urlCode = "https://github.com/nacmartin/elm-webgl-lessons/blob/master/lessons/Lesson10.elm"
      , urlDemo = "http://localhost:8000/nacmartin-webgl-lessons/lesson-10-room.html"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = "https://github.com/nacmartin/elm-webgl-lessons"
      , gif = "room.gif"
      }
    , { name = "Lesson 14 - Teapot"
      , description = ""
      , personId = Nacmartin
      , urlCode = "https://github.com/nacmartin/elm-webgl-lessons/blob/master/lessons/Lesson14.elm"
      , urlDemo = "https://nacmartin.github.io/elm-webgl-lessons/out/lesson14.html"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = "https://github.com/nacmartin/elm-webgl-lessons"
      , gif = "teapot.gif"
      }
    , { name = "Lesson 15 - Earth"
      , description = ""
      , personId = Nacmartin
      , urlCode = "https://github.com/nacmartin/elm-webgl-lessons/blob/master/lessons/Lesson15.elm"
      , urlDemo = "https://nacmartin.github.io/elm-webgl-lessons/out/lesson15.html"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = "https://github.com/nacmartin/elm-webgl-lessons"
      , gif = "world.gif"
      }
    , { name = "Terrain"
      , description = ""
      , personId = Lepoetemaudit
      , urlCode = "https://github.com/lepoetemaudit/elm-terrain"
      , urlDemo = "http://lepoetemaudit.github.io/elm-terrain/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = "terrain.gif"
      }
    , { name = "3D Tetris"
      , description = ""
      , personId = Tobiaswen
      , urlCode = "https://github.com/TobiasWen/3DelmTRIS"
      , urlDemo = "https://tobiaswen.github.io/3DelmTRIS/"
      , urlLocalCode = ""
      , urlLocalDemo = "tobiaswen-3dtetris/3dtetris.html"
      , ellie = ""
      , post = ""
      , gif = "3dtetris.gif"
      }
    , { name = "Planet 3D"
      , description = "Generates a planet with randomized surface."
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-webgl-playground/blob/master/Planet3D.elm"
      , urlDemo = "http://unsoundscapes.com/elm-webgl-playground/planet3d.html"
      , urlLocalCode = ""
      , urlLocalDemo = "elm-webgl-playground/planet3d.html"
      , ellie = ""
      , post = ""
      , gif = "earth2.gif"
      }
    , { name = "Live MIDI dancer"
      , description = ""
      , personId = Hkgumbs
      , urlCode = "https://github.com/hkgumbs/rc"
      , urlDemo = "https://rc.kofi.sexy/visualizer/"
      , urlLocalCode = "kofi/src/Visualizer.elm"
      , urlLocalDemo = "kofi/visualizer/index.html"
      , ellie = ""
      , post = "https://kofi.sexy/blog/rc-2019"
      , gif = "man.gif"
      }
    , { name = "Exposure and Tone Mapping"
      , description = ""
      , personId = Ianemackenzie
      , urlCode = "https://github.com/ianmackenzie/elm-3d-scene/blob/master/examples/ExposureAndToneMapping.elm"
      , urlDemo = "https://ianmackenzie.github.io/elm-3d-scene/examples/1.0.0/exposure-and-tone-mapping.html"
      , urlLocalCode = ""
      , urlLocalDemo = "elm-3d-scene/exposure-and-tone-mapping/ExposureAndToneMapping.html"
      , ellie = "https://ellie-app.com/9g2NQtQNxXpa1"
      , post = ""
      , gif = "exposure.png"
      }
    , { name = "Dominoes"
      , description = ""
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-physics/tree/master/examples/Dominoes.elm"
      , urlDemo = "https://unsoundscapes.com/elm-physics/examples/dominoes/"
      , urlLocalCode = ""
      , urlLocalDemo = "elm-physics/dominoes.html"
      , ellie = ""
      , post = ""
      , gif = "dominoes.gif"
      }
    , { name = "Multiple Shadows"
      , description = ""
      , personId = Ianemackenzie
      , urlCode = "https://github.com/ianmackenzie/elm-3d-scene/blob/master/examples/MultipleShadows.elm"
      , urlDemo = "https://ianmackenzie.github.io/elm-3d-scene/examples/1.0.0/multiple-shadows.html"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = "https://ellie-app.com/9g2PQxgqk49a1"
      , post = ""
      , gif = "multiple-shadow.gif"
      }
    , { name = "Quicklook RAL Configurator"
      , description = ""
      , personId = ThomasKumlehn
      , urlCode = "https://github.com/PixelPartner/quicklook-RAL-configurator"
      , urlDemo = ""
      , urlLocalCode = "pixel-partner/RALConfig.elm"
      , urlLocalDemo = "pixel-partner/RALConfig.html"
      , ellie = ""
      , post = ""
      , gif = ""
      }
    , { name = "Julia Set"
      , description = ""
      , personId = MarcoSehrer
      , urlCode = "https://github.com/ninjaconcept/elm-julia-set-visualization"
      , urlDemo = ""
      , urlLocalCode = "ninjaconcept-elm-julia-set/Main.elm"
      , urlLocalDemo = "ninjaconcept-elm-julia-set/index.html"
      , ellie = ""
      , post = "https://medium.com/@fh_95229/julia-set-visualization-with-webgl-for-elm-765e5da88626#.kbcjf8cfi"
      , gif = ""
      }
    , { name = "Textured Sphere"
      , description = ""
      , personId = Ianemackenzie
      , urlCode = "https://github.com/ianmackenzie/elm-3d-scene/blob/master/examples/TexturedSphere.elm"
      , urlDemo = "https://ianmackenzie.github.io/elm-3d-scene/examples/1.0.0/textured-sphere.html"
      , urlLocalCode = "elm-3d-scene/textured-sphere/TexturedSphere.elm"
      , urlLocalDemo = "elm-3d-scene/textured-sphere/TexturedSphere.html"
      , ellie = "https://ellie-app.com/9g2R9VDG6NHa1"
      , post = ""
      , gif = ""
      }
    , { name = "Landscape (terrain)"
      , description = ""
      , personId = Mikaxyz
      , urlCode = "https://github.com/mikaxyz/elm-webgl-examples"
      , urlDemo = "https://mika.xyz/elm-webgl-experiments/landscape.html"
      , urlLocalCode = ""
      , urlLocalDemo = "mikaxyz/landscape/index.html"
      , ellie = ""
      , post = ""
      , gif = ""
      }
    , { name = "Animated Light"
      , description = ""
      , personId = Ianemackenzie
      , urlCode = ""
      , urlDemo = ""
      , urlLocalCode = ""
      , urlLocalDemo = "elm-3d-scene/animated.html"
      , ellie = ""
      , post = ""
      , gif = ""
      }
    , { name = "Oslo Elm Day"
      , description = "A demo similar to Oslo Elm Day 2019, but implemented in Elm instead of Three.js."
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-webgl-playground/blob/master/OsloElmDay.elm"
      , urlDemo = "https://unsoundscapes.com/elm-webgl-playground/osloelmday.html"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = "oslo.gif"
      }
    , { name = "Tangram"
      , description = "Elm tangram pieces in 3D, composing different logos of Elm-related projects."
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-webgl-playground/tree/master/Tangram"
      , urlDemo = "http://unsoundscapes.com/elm-webgl-playground/tangram.html"
      , urlLocalCode = ""
      , urlLocalDemo = "elm-webgl-playground/tangram.html"
      , ellie = ""
      , post = ""
      , gif = ""
      }
    , { name = "Drag"
      , description = ""
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-physics/tree/master/examples/Drag.elm"
      , urlDemo = "https://unsoundscapes.com/elm-physics/examples/drag/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = ""
      }
    , { name = "Countdown"
      , description = ""
      , personId = Psandahl
      , urlCode = "https://github.com/psandahl/count-down"
      , urlDemo = "https://www.youtube.com/watch?v=DhSXR7EaJ5E"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = ""
      }
    , { name = "Dream Buggy"
      , description = ""
      , personId = Kfish
      , urlCode = "https://github.com/kfish/dreambuggy"
      , urlDemo = "http://kfish.github.io/dreambuggy/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = ""
      }
    , { name = "Shadertoy"
      , description = "Renders the shader code from [https://www.shadertoy.com/view/Ms2SD1](https://www.shadertoy.com/view/Ms2SD1) using Elm WebGL."
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-webgl-playground/blob/master/Shadertoy.elm"
      , urlDemo = ""
      , urlLocalCode = ""
      , urlLocalDemo = "elm-webgl-playground/shadertoy.html"
      , ellie = ""
      , post = ""
      , gif = "shadertoy.gif"
      }
    , { name = "Shadow Volume"
      , description = "Real-time shadows using the shadow volume technique."
      , personId = Unsoundscapes
      , urlCode = "https://github.com/w0rm/elm-webgl-playground/blob/master/ShadowVolume.elm"
      , urlDemo = "https://unsoundscapes.com/elm-webgl-playground/shadowvolume.html"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = "https://discourse.elm-lang.org/t/rendering-real-time-shadows-in-webgl-using-shadow-volumes/4029"
      , gif = ""
      }
    , { name = "First Person"
      , description = ""
      , personId = Jeffcole
      , urlCode = "https://github.com/jeffcole/first-person-elm"
      , urlDemo = "http://jeff-cole.com/first-person-elm/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = ""
      }

    --
    -- These two demmos by "Declension" are actually originally made
    -- by Florian Zinggeler. I am not able to find the source code
    -- in Florian Zinggeler account so removing these for now.
    --
    -- , { name = "Model Viewer"
    --   , description = ""
    --   , personId = Declension
    --   , urlCode = "https://github.com/declension/elm-obj-loader"
    --   , urlDemo = "https://declension.github.io/elm-obj-loader/model-viewer.html"
    --   , urlLocalCode = ""
    --   , urlLocalDemo = ""
    --   , ellie = ""
    --   , post = ""
    --   , gif = ""
    --   }
    -- , { name = "Suzanne from Blender"
    --   , description = ""
    --   , personId = Declension
    --   , urlCode = "https://github.com/declension/elm-obj-loader/tree/master/examples"
    --   , urlDemo = "https://declension.github.io/elm-obj-loader/suzanne.html"
    --   , urlLocalCode = ""
    --   , urlLocalDemo = ""
    --   , ellie = ""
    --   , post = ""
    --   , gif = ""
    --   }
    , { name = "Sun Path"
      , description = ""
      , personId = Karldray
      , urlCode = "https://github.com/karldray/sunpath"
      , urlDemo = "https://karldray.com/sunpath/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = ""
      }
    , { name = "Glelm"
      , description = ""
      , personId = Bpostlethwaite
      , urlCode = "https://github.com/bpostlethwaite/glelm"
      , urlDemo = "https://thebookofshaders.com/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = ""
      }
    , { name = "First Person 3D Navigation in Elm"
      , description = ""
      , personId = Evancz
      , urlCode = "https://github.com/evancz/first-person-elm"
      , urlDemo = "http://evancz.github.io/first-person-elm/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = ""
      , gif = ""
      }
    , { name = "Webgl Depth Map"
      , description = "Visualizations of depth maps in the browser."
      , personId = Mpizenberg
      , urlCode = "https://github.com/mpizenberg/elm-webgl-depthmap"
      , urlDemo = "https://mpizenberg.github.io/elm-webgl-depthmap/"
      , urlLocalCode = ""
      , urlLocalDemo = ""
      , ellie = ""
      , post = "https://discourse.elm-lang.org/t/using-elm-and-webgl-for-depth-maps-3d-visualizations/6406"
      , gif = ""
      }
    ]
