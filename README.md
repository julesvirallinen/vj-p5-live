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

# Usage

## Scripts

To load a script to a sketch, use the same syntax as P5live:

`let libs = ["https://cdn.com/script.js"]`

If you are running this locally, the script can be referenced in relation to the project root.

You can add any scripts to be loaded sketches from the sketch menu. The load order is set with the arrow buttons.

## Maptastic

Press shift+space to map your canvas anywhere on the screen. Can be turned off in settings.

## Action bar

Show the action bar by pressing cmd+p

The following commands work in the actionbar:

```
 {
      name: "Toggle menu",
      shortCommand: "m",
      fullCommand: "menu",
    },
    {
      name: "Edit default sketch template",
      shortCommand: "ed",
      fullCommand: "edittemplate",
    },
    {
      name: "Toggle show console feed",
      shortCommand: "cf",
      fullCommand: "toggleconsole",
    },
    {
      name: "Load sketch",
      shortCommand: "s",
      fullCommand: "sketch",
      usage: "sketch [partial name]"
    },
    {
      name: "Create new sketch",
      shortCommand: "n",
      fullCommand: "new",
      usage: "new [new sketch name]"

    },
    {
      name: "Hide editor code",
      shortCommand: "h",
      fullCommand: "hide",
    }
```

## Shortcuts

The following shortcuts work at the moment:

```
  SHOW_MENU: "ctrl+m",
  SHOW_ACTION_BAR: "cmd+p",
  COMPILE: "ctrl+enter",
  HARD_COMPILE: "ctrl+shift+enter",
  TOGGLE_CODE_VISIBLE: "ctrl+h",
```

The editor has default vscode keybindings.

# Roadmap

- Add electron wrapper for local file management.

# Packages / projects used

- [p5.js](https://p5js.org) <3
- [p5.mapper](https://github.com/jdeboi/p5.mapper) Mapping support
- [WebMidi.js](https://github.com/djipco/webmidi) MIDI support for sketches
- [p5.js sound](https://github.com/processing/p5.js-sound) sound support for sketches

- [maptastic](https://github.com/glowbox/maptasticjs) canvas mapping!

- [react-ace](https://www.npmjs.com/package/react-ace) Ace editor for react
- [react-colorful](https://github.com/omgovich/react-colorful) color picker
- [console-feed](https://github.com/samdenty/console-feed) console management
- [styled-components](https://styled-components.com/) awesome component styling
- [react-spring](https://react-spring.dev/) beautiful animations
