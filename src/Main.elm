module Main exposing (main)

import Assets
import Browser
import Html exposing (Attribute, Html, div, text)
import Html.Attributes as Attr
import Html.Events
import Markdown
import Markdown.Parser as Markdown
import Markdown.Renderer
import Parser
import Parser.Advanced


view : String -> Html Msg
view markdownInput =
    Html.div [ Attr.style "padding" "20px" ]
        [ markdownInputView markdownInput
        , Markdown.toHtml [] markdownInput

        -- , case
        --     markdownInput
        --         |> Markdown.parse
        --         |> Result.mapError deadEndsToString
        --         |> Result.andThen (\ast -> Markdown.Renderer.render Markdown.Renderer.defaultHtmlRenderer ast)
        --   of
        --     Ok rendered ->
        --         div [] rendered
        --
        --     Err errors ->
        --         text errors
        ]


markdownInputView : String -> Html Msg
markdownInputView markdownInput =
    Html.textarea
        [ Attr.value markdownInput
        , Html.Events.onInput OnMarkdownInput
        , Attr.style "width" "100%"
        , Attr.style "height" "500px"
        , Attr.style "font-size" "18px"
        ]
        []


deadEndsToString : List (Parser.Advanced.DeadEnd String Parser.Problem) -> String
deadEndsToString deadEnds =
    deadEnds
        |> List.map Markdown.deadEndToString
        |> String.join "\n"


markdownBody : String
markdownBody =
    Assets.markdownGenerator


type Msg
    = OnMarkdownInput String


type alias Flags =
    ()


type alias Model =
    String


main : Platform.Program Flags Model Msg
main =
    Browser.document
        { init = \flags -> ( markdownBody, Cmd.none )
        , view = \model -> { body = [ view model ], title = "Markdown Example" }
        , update = update
        , subscriptions = \model -> Sub.none
        }


update : Msg -> a -> ( String, Cmd msg )
update msg model =
    case msg of
        OnMarkdownInput newMarkdown ->
            ( newMarkdown, Cmd.none )
