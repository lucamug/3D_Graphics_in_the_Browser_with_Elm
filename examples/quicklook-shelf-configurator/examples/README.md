## `elm-3d-scene` examples

This directory contains several examples of using `elm-3d-scene` to create
different kinds of 3D graphics. From (roughly) simplest to most complex:

- `Points.elm`
- `LineSegments.elm`
- `Triangles.elm`
- `Translation.elm`
- `Rotation.elm`
- `Orbiting.elm`
- `Sphere.elm`
- `Spheres.elm`
- `Physics.elm`

To get started, check out this repository and start up `elm reactor` in this
directory, then start playing around with the different examples (or add your
own). Try animating things like color, translation, rotation, or lighting! If
you have questions, reach out in the **#webgl** channel or to **@ianmackenzie**
on the [Elm Slack](https://elmlang.herokuapp.com).

## New hero example: `IvarConfig.elm/html`

I (@pixelpartner) extended the beta package repository by a bloated example that became a full blown WebApp. It will need mayor refacturing when the main package by **@ianmackenzie** has been released.
Meanwhile, you may live with several added dependencies in `examples/elm.json`, only needed for this sample product configurator and an altered way to make it.

Don't use the reactor, but compile with:

`cd examples`
`elm make IvarConfig.elm --optimize --output=main.js`

and test with serving and navigating to `IvarConfig.html`.

For questions specific to this configurator and the USD[Z] / **Apple AR Quicklook** part, reach out to **@pixelpartner** on the [Elm Slack](https://elmlang.herokuapp.com).

You also need to edit `yourdomain.com` to your own, install an instance of the backend `USDZerve` (WIP on github as well) and finally add the following mime type to your web server configuratotion (this is for `Apache`)

`model/vnd.pixar.usd		usdz`

Until the backend is finished, the sample webapp will point any AR shelf preview download to the fixed USD Archive `/models/Sample.usdz`.
