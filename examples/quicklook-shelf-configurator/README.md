# quicklook-shelf-configurator

This repository is a fork of [elm-3d-scene](https://github.com/ianmackenzie/elm-3d-scene) by **@ianmackenzie**, a high-level Elm package for presenting 3D graphics in the browser.

It adds an example WebApp to the package's example folder (`examples/IvarConfig.elm` and `examples/IvarConfig.html`) that features a **sample WebGL product configurator** including the ability to preview the product in AR (Augmented Reality) with **Apple AR Quicklook**, a feature available on macOS 10.15+ and iOS 12+. 

![WebApp screenshot](https://github.com/PixelPartner/quicklook-shelf-configurator/raw/master/IvarConfig_WebApp.jpg)

![Quicklook 3D screenshot](https://github.com/PixelPartner/quicklook-shelf-configurator/raw/master/IvarConfig_3D_quer.jpg)

![Quicklook AR screenshot](https://github.com/PixelPartner/quicklook-shelf-configurator/raw/master/IvarConfig_AR_quer.jpg)

# Disclaimer:

The product to configure looks like a well known IKEA shelf family called IVAR, but it's not affiliated with IKEA and is not guaranteed to fit your room. To configure a well established product family was choosen to proof the flexibility of this approach.

# How it works

The elm WebApp lets you configure a shelf in a WebGL view. In any phase you can click the `Create AR-Quicklook button` shown center right. This will

* send the current 3D data as an USDA text file to the server, accompanied with an UUID.

* this is then converted to a binary USDC file and archived together with a 4k wood texture as an USDZ file. For this to work, you will also need the backend repository [USDZerveOnIIS](https://github.com/PixelPartner/USDZerveOnIIS)

* this USDZ file can then be downloaded by either clicking the then freshly appeared AR icon or using the QRCode presented on the left. 

# Feedback

Any questions/feedback to this fork, please open an issue or reach out to **@pixelpartner**
on the [Elm Slack](https://elmlang.herokuapp.com) or on [twitter](https://www.twitter.com/pixelpartner)!
