module Floss exposing (..)

import Browser
import Browser.Events
import Html
import Html.Attributes
import Svg exposing (..)
import Svg.Attributes exposing (..)


var =
    { spacing = 0.025
    , startX = 5.0
    , startY = 0.85
    , headRadius = 0.85
    , limbWidth = 0.85
    , armLength = 2.0
    , legLength = 3.0
    , torsoLength = 2.5
    , movement = 0.85
    }


headX =
    [ -var.movement / 2
    , var.movement / 6
    , -var.movement / 6
    , var.movement / 2
    , -var.movement / 6
    , var.movement / 6
    ]


rightArmExteriorX =
    [ var.movement
    , -var.movement
    ]


rightArmInteriorX =
    [ -var.movement - var.spacing
    , var.movement - var.spacing
    ]


rightLegExteriorX =
    [ var.movement
    , 0
    ]


rightLegInteriorX =
    [ -var.movement
    , 0
    ]


rightTorsoX =
    [ -(var.movement / 2)
    , var.movement / 2
    ]


leftTorsoX =
    [ var.movement / 2
    , -(var.movement / 2)
    ]


leftLegInteriorX =
    [ 0
    , -var.movement
    ]


leftLegExteriorX =
    [ 0
    , var.movement
    ]


leftArmInteriorX =
    [ var.movement + var.spacing
    , -var.movement + var.spacing
    ]


leftArmExteriorX =
    [ -var.movement
    , var.movement
    ]


type alias Model =
    { delta : Float
    , stepDuration : Float
    }


init : Model
init =
    Model 0 350


view : Model -> Svg msg
view model =
    let
        cycles =
            modBy 6 <| truncate <| model.delta / model.stepDuration

        leftInBack =
            List.member cycles [ 3, 4 ]

        rightInBack =
            List.member cycles [ 0, 1 ]
    in
    Html.main_ []
        [ svg [ Svg.Attributes.viewBox "0 0 10 10" ]
            [ head model
            , showIf leftInBack (leftArm model)
            , showIf rightInBack (rightArm model)
            , torso model
            , showIf (not leftInBack) (leftArm model)
            , showIf (not rightInBack) (rightArm model)
            ]
        , Html.node "style" [] [ text styles ]
        ]


showIf : Bool -> Svg msg -> Svg msg
showIf check ifTrue =
    if check then
        ifTrue
    else
        bodyPath ""


head : Model -> Svg msg
head model =
    circle
        [ fill "black"
        , cx (p (var.startX + curve model headX))
        , cy (p (var.startY + var.headRadius))
        , r (p var.headRadius)
        ]
        []


torso : Model -> Svg msg
torso model =
    bodyPath <|
        m var.startX (var.startY + 2 * var.headRadius + var.spacing)
            ++ String.concat
                [ h (var.limbWidth + (3 / 2 * var.spacing))
                , q var.limbWidth 0 var.limbWidth var.limbWidth
                , h -var.limbWidth
                , l (curve model rightTorsoX) var.torsoLength
                , l (curve model rightLegExteriorX) var.legLength
                , extremity
                , l (curve model rightLegInteriorX) -var.legLength
                , h -var.spacing
                , l (curve model leftLegInteriorX) var.legLength
                , extremity
                , l (curve model leftLegExteriorX) -var.legLength
                , l (curve model leftTorsoX) -var.torsoLength
                , h -var.limbWidth
                , q 0 -var.limbWidth var.limbWidth -var.limbWidth
                , h (var.limbWidth + (3 / 2 * var.spacing))
                ]


leftArm : Model -> Svg msg
leftArm model =
    bodyPath <|
        m (var.startX - var.limbWidth - var.spacing / 2)
            (var.startY + 2 * var.headRadius + var.spacing + var.limbWidth)
            ++ String.concat
                [ l (curve model leftArmInteriorX) var.armLength
                , extremity
                , l (curve model leftArmExteriorX) -var.armLength
                ]


rightArm : Model -> Svg msg
rightArm model =
    bodyPath <|
        m (var.startX + 2 * var.limbWidth + 3 / 2 * var.spacing)
            (var.startY + 2 * var.headRadius + var.spacing + var.limbWidth)
            ++ String.concat
                [ l (curve model rightArmExteriorX) var.armLength
                , extremity
                , l (curve model rightArmInteriorX) -var.armLength
                ]


bodyPath : String -> Svg msg
bodyPath d =
    Svg.path
        [ fill "black"
        , stroke "white"
        , strokeWidth (p (2 * var.spacing))
        , Svg.Attributes.d d
        ]
        []


extremity : String
extremity =
    "a"
        ++ p (var.limbWidth / 2)
        ++ p (var.limbWidth / 2)
        ++ "0 1 1"
        ++ p -var.limbWidth
        ++ "0"


m : Float -> Float -> String
m x y =
    " M" ++ p x ++ p y


h : Float -> String
h x =
    " h" ++ p x


v : Float -> String
v y =
    " v" ++ p y


l : Float -> Float -> String
l x y =
    " l" ++ p x ++ p y


q : Float -> Float -> Float -> Float -> String
q x0 y0 x1 y1 =
    " q" ++ p x0 ++ p y0 ++ p x1 ++ p y1


curve : Model -> List Float -> Float
curve model steps =
    let
        cycles =
            model.delta / model.stepDuration

        cyclesCompleted =
            truncate cycles
    in
    case
        List.drop
            (modBy (List.length steps) cyclesCompleted)
            (steps ++ List.take 1 steps)
    of
        first :: second :: _ ->
            cubicBezier (cycles - toFloat cyclesCompleted) first second

        _ ->
            0


cubicBezier : Float -> Float -> Float -> Float
cubicBezier t p0 p3 =
    let
        controlPoint1 =
            1.05

        controlPoint2 =
            0.75

        p1 =
            p0 + controlPoint1 * (p3 - p0)

        p2 =
            p0 + controlPoint2 * (p3 - p0)
    in
    (p0 * ((1 - t) ^ 3))
        + (p1 * 3 * ((1 - t) ^ 2) * t)
        + (p2 * 3 * (1 - t) * (t ^ 2))
        + (p3 * (t ^ 3))


p : Float -> String
p float =
    " " ++ String.fromFloat float ++ " "


styles : String
styles =
    """
    html, body {
        margin:0;
        padding:0;
    }
    main {
        height:100vh;
        width:100%;
        display:flex;
        display:flex;
        flex-direction:column;
    }
    svg {
        flex: 1;
    }
    * {
        transform-style: preserve-3d;
    }
    """


type Msg
    = NewAnimationFrameDelta Float


update : Msg -> Model -> Model
update msg model =
    case msg of
        NewAnimationFrameDelta value ->
            { model | delta = value + model.delta }



-- PROGRAM


subscriptions model =
    Browser.Events.onAnimationFrameDelta NewAnimationFrameDelta


main =
    Browser.element
        { init = \() -> ( init, Cmd.none )
        , update = \msg model -> ( update msg model, Cmd.none )
        , subscriptions = subscriptions
        , view = view
        }
