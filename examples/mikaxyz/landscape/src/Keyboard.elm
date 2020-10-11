module Keyboard exposing
    ( Key(..)
    , Msg
    , State
    , init
    , isKeyDown
    , subscriptions
    , update
    )

import Browser.Events
import Json.Decode as JD


isKeyDown : Key -> State -> Bool
isKeyDown key state =
    state.down |> List.member key


type Msg
    = KeyDown Key
    | KeyUp Key


type alias Config msg =
    { tagger : Msg -> msg
    }


init : State
init =
    { down = []
    }


update : Msg -> State -> State
update msg state =
    case msg of
        KeyDown x ->
            { state | down = addKey x state.down }

        KeyUp x ->
            { state | down = removeKey x state.down }


addKey : Key -> List Key -> List Key
addKey key keys =
    if List.member key keys then
        keys

    else
        key :: keys


removeKey : Key -> List Key -> List Key
removeKey key keys =
    keys
        |> List.filter (\x -> x /= key)


type alias State =
    { down : List Key
    }


subscriptions : Config msg -> Sub msg
subscriptions config =
    Sub.batch
        [ Browser.Events.onKeyDown keyDecoder |> Sub.map (\x -> config.tagger (KeyDown x))
        , Browser.Events.onKeyUp keyDecoder |> Sub.map (\x -> config.tagger (KeyUp x))
        ]


isAlpha x =
    "abcdefghijklmnopqrstuvwxyz"
        |> String.toList
        |> List.map String.fromChar
        |> List.member (String.toLower x)


type Key
    = Shift
    | Control
    | Alt
    | Meta
    | Space
    | Escape
    | Enter
    | Backspace
    | Tab
    | CapsLock
    | ArrowUp
    | ArrowRight
    | ArrowDown
    | ArrowLeft
    | Function Int
    | Alpha Char
    | Digit Int
    | Character Char


type alias KeyData =
    { key : String
    , code : String
    , keyChar : Maybe Char
    , target : String
    }


keyDecoder : JD.Decoder Key
keyDecoder =
    JD.map4 KeyData
        (JD.field "key" JD.string)
        (JD.field "code" JD.string)
        (JD.map (Maybe.map Tuple.first << String.uncons) (JD.field "key" JD.string))
        (JD.at [ "target", "tagName" ] JD.string)
        |> JD.map toKey


toKey : KeyData -> Key
toKey { key, code, keyChar, target } =
    case ( key, keyChar ) of
        ( "Shift", _ ) ->
            Shift

        ( "Control", _ ) ->
            Control

        ( "Alt", _ ) ->
            Alt

        ( "Meta", _ ) ->
            Meta

        ( "Space", _ ) ->
            Space

        ( "Enter", _ ) ->
            Enter

        ( "Escape", _ ) ->
            Escape

        ( "Backspace", _ ) ->
            Backspace

        ( "Tab", _ ) ->
            Tab

        ( "CapsLock", _ ) ->
            CapsLock

        ( "ArrowUp", _ ) ->
            ArrowUp

        ( "ArrowRight", _ ) ->
            ArrowRight

        ( "ArrowDown", _ ) ->
            ArrowDown

        ( "ArrowLeft", _ ) ->
            ArrowLeft

        ( _, Just char ) ->
            if code == "Space" then
                Space

            else if String.startsWith "Key" code && isAlpha (String.right 1 code) then
                String.toList (String.right 1 code)
                    |> List.head
                    |> Maybe.map Alpha
                    |> Maybe.withDefault (Character char)

            else if String.startsWith "F" code then
                String.dropLeft 1 code
                    |> String.toInt
                    |> Maybe.map Function
                    |> Maybe.withDefault (Character char)

            else
                String.right 1 code
                    |> String.toInt
                    |> Maybe.map Digit
                    |> Maybe.withDefault (Character char)

        ( _, Nothing ) ->
            -- TODO: Fix impossible state
            Character ' '
