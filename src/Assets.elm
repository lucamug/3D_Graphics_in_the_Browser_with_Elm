module Assets exposing (markdownGenerator)

import Assets.Demos
import Assets.Libraries
import Assets.People
import Assets.Posts
import Assets.Videos
import Dict
import Html exposing (..)
import Html.Attributes
import Regex


viewIntro : String
viewIntro =
    """
<!-- This post is auto-generated. DO NOT EDIT IT HERE               -->    
<!-- Edit it at                                                     -->    
<!-- https://github.com/lucamug/""" ++ repoName ++ """ -->    
    
    
<!-- ![Gallery](https://dev-to-uploads.s3.amazonaws.com/i/gt85z0hijw3b4oibjlf9.gif) -->
<!-- TITLE: 3D Graphics in the Browser with Elm -->

This is a collection of cool 3D stuff made 100% in Elm.
        
Get inspired to play with these tools, build stuff and contribute to public libraries!
    
If you think that something is missing, you spotted a mistake or you have some feedback, send me a message or - even better - open an issue/PR in [this repository](https://github.com/lucamug/""" ++ repoName ++ """).
    
If you want to learn more about 3D Graphics in Elm, you can start reading the documentation of [these libraries](#libraries) and joining the channels #webgl and #gamedev in the [Elm Slack](https://elmlang.herokuapp.com/). 

Enjoy! 🎉
    
# Content

* [Demos](#demos)
* [Videos](#videos)
* [Libraries](#libraries)
* [Posts](#posts)
* [People](#people)"""


viewDemoWithGif : Int -> Assets.Demos.Demo -> String
viewDemoWithGif index demo =
    let
        person =
            Assets.People.personIdToPerson demo.personId
    in
    String.join "" <|
        []
            ++ [ "\n"
               , internalAnchor demo.name
               , "\n\n### "
               , demo.name
               , "\n"
               , if String.isEmpty demo.description then
                    ""

                 else
                    demo.description ++ "\n"
               , "* Author: " ++ by person ++ "\n"
               , "* [Demo](" ++ demoToUrlDemo demo ++ ")" ++ externalLink ++ "\n"
               , "* [Code](" ++ demoToUrlCode demo ++ ")" ++ externalLink ++ "\n"
               ]
            ++ (if String.isEmpty demo.post then
                    []

                else
                    [ "* [Post](" ++ demo.post ++ ")" ++ externalLink ++ "\n" ]
               )
            ++ (if String.isEmpty demo.ellie then
                    []

                else
                    [ "* [Ellie](" ++ demo.ellie ++ ")" ++ externalLink ++ "\n" ]
               )
            ++ (if String.isEmpty demo.gif then
                    []

                else
                    [ "    ![Demo](https://lucamug.github.io/" ++ repoName ++ "/gifs/" ++ demo.gif ++ " \"Demo\")" ]
               )


viewDemoWithoutGif : Int -> Assets.Demos.Demo -> String
viewDemoWithoutGif index demo =
    let
        person =
            Assets.People.personIdToPerson demo.personId
    in
    String.join "" <|
        []
            ++ [ "* "
               , internalAnchor demo.name
               , "**" ++ demo.name ++ "**"
               , " by " ++ by person ++ ". "
               , if String.isEmpty demo.description then
                    ""

                 else
                    demo.description
               , " [Demo](" ++ demoToUrlDemo demo ++ ")" ++ externalLink
               , " [Code](" ++ demoToUrlCode demo ++ ")" ++ externalLink
               ]
            ++ (if String.isEmpty demo.post then
                    []

                else
                    [ " [Post](" ++ demo.post ++ ")" ++ externalLink ]
               )
            ++ (if String.isEmpty demo.ellie then
                    []

                else
                    [ " [Ellie](" ++ demo.ellie ++ ")" ++ externalLink ]
               )


viewVideo : Int -> Assets.Videos.Video -> String
viewVideo index video =
    let
        person =
            Assets.People.personIdToPerson video.personId
    in
    String.join "" <|
        []
            ++ [ internalAnchor video.title
               , "\n\n### "
               , video.title
               , "\n"
               , "* Author: " ++ by person ++ "\n"
               , if String.startsWith "https://www.youtube.com/watch?v=" video.url then
                    "    {% youtube " ++ String.replace "https://www.youtube.com/watch?v=" "" video.url ++ " %}"

                 else if String.startsWith "https://vimeo.com/" video.url then
                    "    {% vimeo " ++ String.replace "https://vimeo.com/" "" video.url ++ " %}"

                 else
                    "No liquid link"
               ]


viewLibrary : Assets.Libraries.Library -> String
viewLibrary library =
    let
        person =
            Assets.People.personIdToPerson library.personId
    in
    String.join ""
        [ "* "
        , internalAnchor library.name
        , "[**" ++ library.name ++ "**]"
        , "(" ++ library.url ++ ")"
        , externalLink
        , " by "
        , by person
        , "."
        , " "
        , library.description
        ]


viewPost : Int -> Assets.Posts.Post -> String
viewPost index post =
    let
        person =
            Assets.People.personIdToPerson post.personId
    in
    String.join ""
        [ "* "
        , internalAnchor post.title
        , "[**" ++ post.title ++ "**]"
        , "(" ++ post.url ++ ")"
        , externalLink
        , " by "
        , by person
        , "."
        ]


viewPeople : String
viewPeople =
    String.join "\n<hr>\n" <|
        List.map
            (\personAndResources ->
                let
                    person =
                        personAndResources.person
                in
                String.join ""
                    [ internalAnchor (personToStringId person)
                    , "\n\n### " ++ person.name
                    , "\n"
                    , if String.isEmpty person.handleGithub then
                        ""

                      else
                        "[Github](https://github.com/" ++ person.handleGithub ++ ")" ++ externalLink
                    , if String.isEmpty person.handleTwitter then
                        ""

                      else
                        " [Twitter](https://twitter.com/" ++ person.handleTwitter ++ ")" ++ externalLink
                    , if String.isEmpty person.handleMedium then
                        ""

                      else
                        " [Medium](https://medium.com/@" ++ person.handleMedium ++ ")" ++ externalLink
                    , if String.isEmpty person.handleDiscorse then
                        ""

                      else
                        " [Discourse](https://discourse.elm-lang.org/u/" ++ person.handleDiscorse ++ ")" ++ externalLink
                    , "\n"
                    , "![Photo](" ++ photo person.photo 60 ++ ")"
                    , "\n"
                    , String.join "\n" (List.map resourceToInternalLink personAndResources.resources)
                    , "\n\n"
                    ]
            )
            persons



-- MARKDOWN GENERATOR


markdownGenerator : String
markdownGenerator =
    let
        _ =
            persons
    in
    String.join "\n\n"
        [ viewIntro
        , internalAnchor "Demos"
        , "# Demos"
        , String.join "\n" <| List.indexedMap viewDemoWithGif demosWithGif
        , internalAnchor "Other demos"
        , "# Other demos"
        , String.join "\n" <| List.indexedMap viewDemoWithoutGif demosWithoutGif
        , internalAnchor "Videos"
        , "# Videos"
        , String.join "\n" <| List.indexedMap viewVideo Assets.Videos.videos
        , internalAnchor "Posts"
        , "# Posts"
        , String.join "\n" <| List.indexedMap viewPost Assets.Posts.posts
        , internalAnchor "Libraries"
        , "# Libraries"
        , String.join "\n" <| List.map viewLibrary Assets.Libraries.libraries
        , internalAnchor "People"
        , "# People"
        , "List of people mentioned in this post."
        , viewPeople
        ]



-- HELPERS


externalLink : String
externalLink =
    "⬈"


demosWithoutGif : List Assets.Demos.Demo
demosWithoutGif =
    List.filter (\demo -> String.isEmpty demo.gif) Assets.Demos.demos


demosWithGif : List Assets.Demos.Demo
demosWithGif =
    List.filter (\demo -> not (String.isEmpty demo.gif)) Assets.Demos.demos


by : { a | handleGithub : String, handleTwitter : String, name : String } -> String
by person =
    String.join ""
        [ "[" ++ person.name ++ "]"
        , "(#" ++ stringToSegment (personToStringId person) ++ ")"
        ]


stringToSegment : String -> String
stringToSegment string =
    string
        |> String.toLower
        |> clean
        |> String.replace " " "_"


userReplace : String -> (Regex.Match -> String) -> String -> String
userReplace userRegex replacer string =
    case Regex.fromString userRegex of
        Nothing ->
            string

        Just regex ->
            Regex.replace regex replacer string


clean : String -> String
clean string =
    userReplace "[^a-zA-Z0-9 ]" (\_ -> "") string


repoName : String
repoName =
    "3D_Graphics_in_the_Browser_with_Elm"


demoToUrlDemo : Assets.Demos.Demo -> String
demoToUrlDemo demo =
    if String.isEmpty demo.urlDemo then
        if String.isEmpty demo.urlLocalDemo then
            ""

        else
            "https://lucamug.github.io/" ++ repoName ++ "/examples/" ++ demo.urlLocalDemo

    else
        demo.urlDemo


demoToUrlCode : Assets.Demos.Demo -> String
demoToUrlCode demo =
    if String.isEmpty demo.urlCode then
        if String.isEmpty demo.urlLocalCode then
            ""

        else
            "https://github.com/lucamug/" ++ repoName ++ "/blob/master/examples" ++ demo.urlLocalCode

    else
        demo.urlCode


internalAnchor : String -> String
internalAnchor string =
    "<a name=\"" ++ stringToSegment string ++ "\"></a>"


personToStringId : { a | handleGithub : String, handleTwitter : String, name : String } -> String
personToStringId person =
    if String.isEmpty person.handleGithub then
        if String.isEmpty person.handleTwitter then
            person.name

        else
            person.handleTwitter

    else
        person.handleGithub


resourceToName : Resource -> String
resourceToName resource =
    case resource of
        ResourceVideo video ->
            video.title

        ResourcePost post ->
            post.title

        ResourceLibrary library ->
            library.name

        ResourceDemo demo ->
            demo.name


resourceToType : Resource -> String
resourceToType resource =
    case resource of
        ResourceVideo _ ->
            "Video"

        ResourcePost _ ->
            "Post"

        ResourceLibrary _ ->
            "Library"

        ResourceDemo _ ->
            "Demo"


resourceToInternalLink : Resource -> String
resourceToInternalLink resource =
    String.join ""
        [ "  * "
        , resourceToType resource
        , " "
        , "[" ++ resourceToName resource ++ "]"
        , "(#" ++ stringToSegment (resourceToName resource) ++ ")"
        ]


photo : String -> Int -> String
photo url size =
    if String.isEmpty url then
        "http://via.placeholder.com/" ++ String.fromInt size ++ "x" ++ String.fromInt size ++ "?text=?"

    else
        url ++ "?s=" ++ String.fromInt size ++ "&v=4"


type Resource
    = ResourceVideo Assets.Videos.Video
    | ResourcePost Assets.Posts.Post
    | ResourceLibrary Assets.Libraries.Library
    | ResourceDemo Assets.Demos.Demo


type alias PersonAndResources =
    { person : Assets.People.Person
    , resources : List Resource
    , quantity : Int
    }


persons : List PersonAndResources
persons =
    Dict.empty
        |> (\acc -> List.foldl f acc demos)
        |> (\acc -> List.foldl f acc posts)
        |> (\acc -> List.foldl f acc videos)
        |> (\acc -> List.foldl f acc libraries)
        |> Dict.values
        |> List.sortBy .quantity
        |> List.reverse


demos : List Resource
demos =
    List.map ResourceDemo Assets.Demos.demos


posts : List Resource
posts =
    List.map ResourcePost Assets.Posts.posts


videos : List Resource
videos =
    List.map ResourceVideo Assets.Videos.videos


libraries : List Resource
libraries =
    List.map ResourceLibrary Assets.Libraries.libraries


resourceToPersonId : Resource -> Assets.People.PersonId
resourceToPersonId resource =
    case resource of
        ResourceVideo res ->
            res.personId

        ResourcePost res ->
            res.personId

        ResourceLibrary res ->
            res.personId

        ResourceDemo res ->
            res.personId


f :
    Resource
    -> Dict.Dict String PersonAndResources
    -> Dict.Dict String PersonAndResources
f resource acc =
    let
        person =
            Assets.People.personIdToPerson
                (resourceToPersonId resource)

        personName =
            person.name
    in
    Dict.update personName
        (\maybePersonAndResources ->
            case maybePersonAndResources of
                Just personAndResources ->
                    Just
                        { personAndResources
                            | resources = resource :: personAndResources.resources
                            , quantity = personAndResources.quantity + 1
                        }

                Nothing ->
                    Just
                        { person = person
                        , resources = [ resource ]
                        , quantity = 1
                        }
        )
        acc
