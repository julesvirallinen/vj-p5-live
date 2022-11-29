#### P5JS LIVE CODING FOR VJ

Open source P5.js live-editor for live-coded VJ performances.

Loose port of the amazing https://github.com/ffd8/P5LIVE by https://github.com/ffd8.

Stack: Typescript / React.

✨ Modular clean code for easier open source collaboration. ✨

# Features

- Live coding p5js
- Add custom scripts to always be loaded
- Powerful control of app theme
- Slider for sketch global transparency to make sure you are not too bright
- Hide / show the editor to interact with the canvas

# Design idea

- easy development with strong typing
- controls largely via written commands for easy live-performing

![CleanShot 2022-11-26 at 23 36 07](https://user-images.githubusercontent.com/4622905/204109914-fd24d10a-dec3-429e-b5fd-2cc659a28438.gif)

# Is this for me?

If you:

- want to develop a p5js live coding app
- do live VJ coding and is looking for an interesting tool

this is probably for you. If not, try P5LIVE!

# Installation

Clone repository and run

```
yarn
yarn dev
```

# Roadmap

- Add electron wrapper for local file management.

# Packages / projects used

- [p5.js](https://p5js.org) <3
- [WebMidi.js](https://github.com/djipco/webmidi), MIDI support for sketches
- [p5.js sound](https://github.com/processing/p5.js-sound), sound support for sketches

- [react-ace](https://www.npmjs.com/package/react-ace) Ace editor for react
- [react-colorful](https://github.com/omgovich/react-colorful) color picker
