module Assets.Videos exposing
    ( Video
    , videos
    )

import Assets.People exposing (PersonId(..))


type alias Video =
    { personId : PersonId
    , title : String
    , url : String
    }


videos : List Video
videos =
    [ { personId = Ianemackenzie
      , title = "A 3D Rendering Engine for Elm"
      , url = "https://www.youtube.com/watch?v=Htqc64s5qYU"
      }
    , { personId = Johnpmayer
      , title = "Delightful WebGL in Elm"
      , url = "https://vimeo.com/97408205"
      }
    , { personId = Ianemackenzie
      , title = "Now you're thinking in functions"
      , url = "https://www.youtube.com/watch?v=F4fuVJNnQoo"
      }
    , { personId = Unsoundscapes
      , title = "Rendering text with WebGL"
      , url = "https://www.youtube.com/watch?v=qasFxsOCfpA"
      }
    , { personId = Evancz
      , title = "Evan Czaplicki, Andrey Kuzmin - API Design Sessions - Part 2"
      , url = "https://www.youtube.com/watch?v=vQFGaGPPz2Q"
      }
    , { personId = Evancz
      , title = "Evan Czaplicki, Andrey Kuzmin - API Design Sessions - Part 1"
      , url = "https://www.youtube.com/watch?v=qaTy_F98Moo"
      }
    , { personId = Avh4
      , title = "ElmLive - Codevember Day 10 (2016) - Part 2 - Slimy broccoli with perlin noise"
      , url = "https://www.youtube.com/watch?v=oc9ib2v9I4s"
      }
    ]
