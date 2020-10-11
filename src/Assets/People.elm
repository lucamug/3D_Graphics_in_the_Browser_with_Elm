module Assets.People exposing
    ( Person
    , PersonId(..)
    , personIdToPerson
    )


type alias Person =
    { photo : String
    , name : String
    , handleTwitter : String
    , handleGithub : String
    , handleMedium : String
    , handleDiscorse : String
    , homePage : String
    }


type PersonId
    = Ianemackenzie
    | Unsoundscapes
    | Lucamug
    | MarcoSehrer
    | ThomasKumlehn
    | Myotherpants
    | Voorkanter
    | MacCSOutreach
    | Hkgumbs
    | Mikaxyz
    | Avh4
    | Francisdb
    | Passiomatic
    | Aforemny
    | Nacmartin
    | Lepoetemaudit
    | Tobiaswen
    | Psandahl
    | Kfish
    | Jeffcole
    | Declension
    | Karldray
    | Bpostlethwaite
    | Johnpmayer
    | Evancz
    | ElmExplorations


personIdToPerson : PersonId -> Person
personIdToPerson personId =
    case personId of
        MarcoSehrer ->
            { photo = "https://avatars1.githubusercontent.com/u/11566"
            , name = "Marco Sehrer"
            , handleTwitter = ""
            , handleGithub = "pixelvitamina"
            , handleMedium = "sushi2kk"
            , handleDiscorse = ""
            , homePage = ""
            }

        Ianemackenzie ->
            { photo = "https://avatars1.githubusercontent.com/u/1576199"
            , name = "Ian Mackenzie"
            , handleTwitter = "ianemackenzie"
            , handleGithub = "ianmackenzie"
            , handleMedium = ""
            , handleDiscorse = "ianmackenzie"
            , homePage = ""
            }

        Unsoundscapes ->
            { photo = "https://avatars0.githubusercontent.com/u/26506215"
            , name = "Andrey Kuzmin"
            , handleTwitter = "w0rm"
            , handleGithub = "unsoundscapes"
            , handleMedium = ""
            , handleDiscorse = "unsoundscapes"
            , homePage = "http://unsoundscapes.com/"
            }

        ThomasKumlehn ->
            { photo = "https://avatars2.githubusercontent.com/u/73567"
            , name = "Thomas Kumlehn"
            , handleTwitter = "PixelPartner"
            , handleGithub = "PixelPartner"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = ""
            }

        Myotherpants ->
            { photo = "https://avatars2.githubusercontent.com/u/20161"
            , name = "Brian J Ball"
            , handleTwitter = "Myotherpants"
            , handleGithub = "Ball"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = "https://myotherpants.com/"
            }

        Lucamug ->
            { photo = "https://avatars1.githubusercontent.com/u/5551094"
            , name = "Luca Mugnaini"
            , handleTwitter = "luca_mug"
            , handleGithub = "lucamug"
            , handleMedium = "l.mugnaini"
            , handleDiscorse = ""
            , homePage = "https://guupa.com/"
            }

        Voorkanter ->
            { photo = "https://avatars2.githubusercontent.com/u/4232644"
            , name = "Michel van der Hulst"
            , handleTwitter = ""
            , handleGithub = "mahulst"
            , handleMedium = "voorkanter"
            , handleDiscorse = ""
            , homePage = ""
            }

        MacCSOutreach ->
            { photo = ""
            , name = "McMaster Start Coding"
            , handleTwitter = "MacCSOutreach"
            , handleGithub = ""
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = ""
            }

        Hkgumbs ->
            { photo = "https://avatars3.githubusercontent.com/u/72497265"
            , name = "Kofi Gumbs"
            , handleTwitter = "hkgumbs"
            , handleGithub = "hkgumbs"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = "https://kofi.sexy/"
            }

        Mikaxyz ->
            { photo = "https://avatars2.githubusercontent.com/u/373858"
            , name = "Mika Jauhonen"
            , handleTwitter = "mikajauhonen"
            , handleGithub = "mikaxyz"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = "https://twitter.com/mikajauhonen/status/1203088763754369024"
            }

        Avh4 ->
            { photo = "https://avatars3.githubusercontent.com/u/1222"
            , name = "Aaron VonderHaar"
            , handleTwitter = "avh4"
            , handleGithub = "avh4"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = "https://www.twitch.tv/avh4"
            }

        Francisdb ->
            { photo = "https://avatars2.githubusercontent.com/u/161305"
            , name = "Francis De Brabandere"
            , handleTwitter = "somatik"
            , handleGithub = "francisdb"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = ""
            }

        Passiomatic ->
            { photo = "https://avatars3.githubusercontent.com/u/56371"
            , name = "Andrea Peltrin"
            , handleTwitter = "passiomatic"
            , handleGithub = "passiomatic"
            , handleMedium = ""
            , handleDiscorse = "passiomatic"
            , homePage = "http://passiomatic.com/"
            }

        Aforemny ->
            { photo = "https://avatars3.githubusercontent.com/u/610962"
            , name = "Alexander Foremny"
            , handleTwitter = ""
            , handleGithub = "aforemny"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = "https://foremny.me/"
            }

        Nacmartin ->
            { photo = "https://avatars3.githubusercontent.com/u/154258"
            , name = "Nacho Martín"
            , handleTwitter = "nacmartin"
            , handleGithub = "nacmartin"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = "http://nacho-martin.com/"
            }

        Lepoetemaudit ->
            { photo = "https://avatars2.githubusercontent.com/u/10742921"
            , name = "Dave Jeffrey"
            , handleTwitter = ""
            , handleGithub = "lepoetemaudit"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = "http://words.davidjeffrey.co.uk/"
            }

        Tobiaswen ->
            { photo = "https://avatars2.githubusercontent.com/u/13774204"
            , name = "Tobias Wentzlaff"
            , handleTwitter = ""
            , handleGithub = "TobiasWen"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = ""
            }

        Psandahl ->
            { photo = ""
            , name = "Patrik Sandahl"
            , handleTwitter = ""
            , handleGithub = "psandahl"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = ""
            }

        Kfish ->
            { photo = "https://avatars0.githubusercontent.com/u/38847"
            , name = "Conrad Parker"
            , handleTwitter = ""
            , handleGithub = "kfish"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = "http://blog.kfish.org/"
            }

        Jeffcole ->
            { photo = "https://avatars2.githubusercontent.com/u/1175290"
            , name = "Jeff Cole"
            , handleTwitter = ""
            , handleGithub = "jeffcole"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = "http://jeff-cole.com/"
            }

        Declension ->
            { photo = "https://avatars1.githubusercontent.com/u/3322808"
            , name = "Nick Boultbee"
            , handleTwitter = ""
            , handleGithub = "declension"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = ""
            }

        Karldray ->
            { photo = "https://avatars1.githubusercontent.com/u/1121686"
            , name = "Karl Dray"
            , handleTwitter = ""
            , handleGithub = "karldray"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = ""
            }

        Bpostlethwaite ->
            { photo = "https://avatars2.githubusercontent.com/u/1176674"
            , name = "Ben Postlethwaite"
            , handleTwitter = ""
            , handleGithub = "bpostlethwaite"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = ""
            }

        Johnpmayer ->
            { photo = "https://avatars0.githubusercontent.com/u/941215"
            , name = "John P Mayer, Jr"
            , handleTwitter = ""
            , handleGithub = "johnpmayer"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = ""
            }

        Evancz ->
            { photo = "https://avatars3.githubusercontent.com/u/1658058"
            , name = "Evan Czaplicki"
            , handleTwitter = "evancz"
            , handleGithub = "evancz"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = ""
            }

        ElmExplorations ->
            { photo = "https://avatars0.githubusercontent.com/u/26491321"
            , name = "Elm Explorations"
            , handleTwitter = ""
            , handleGithub = "elm-explorations"
            , handleMedium = ""
            , handleDiscorse = ""
            , homePage = ""
            }
