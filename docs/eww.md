---
id: eww
date: "05 May, 2025"
---

# eww

[Elkowars wacky widgets is a program written in Rust](https://github.com/elkowar/eww) which uses a custom config
language named Yuck to create on-screen desktop windows and widgets.

## Installation

For non-[[Nix]] systems, Elkowar recommends to install eww [with rustup.](https://rustup.rs/).

For [[Nix]] systems, there's a [[Home Manager]] option for this:
```nix
{
    programs.eww.enable = true;
}
```

[There are a few other related options, too.](https://home-manager-options.extranix.com/?query=programs.eww&release=master)

## Invocation

You generally use `eww open <window-name>`.
See below for information about Windows.

To close all windows after opening:
```shell
eww close-all
```

### Multi-monitor

Use the `--screen` flag to open on a specified display.

For example, to always open on the active window in [[Hyprland]]:
```shell
eww open <window> --screen $(hyprctl monitors -j | jq '.[] | select(.focused) | .id')
```

### Debugging

[You can use the GTK-Debugger](https://elkowar.github.io/eww/working_with_gtk.html#gtk-debugger) with:
```shell
eww inspector
```

## Configuration

The real meat of eww is the configuration language, written in a custom
language Yuck. There are also styles written in GTK-flavoured SCSS.

Yuck is based on functional languages like Lisp.

Configuration files are loaded from:
- `~/.config/eww/eww.yuck`
- `~/.config/eww/eww.scss`

You configure Windows and Widgets.

### Windows

Windows manage and mark up Widgets.

[From the documentation](https://elkowar.github.io/eww/configuration.html):
```yuck
(defwindow example
           :monitor 0
           :geometry (geometry :x "0%"
                               :y "20px"
                               :width "90%"
                               :height "30px"
                               :anchor "top center")
           :stacking "fg"
           :reserve (struts :distance "40px" :side "top")
           :windowtype "dock"
           :wm-ignore false
  "example content")
```

:::tip
This window defines many properties that are only for [[X11]].

Windows rendered in [[Wayland]] have a different set of properties available.
:::

This window defines its properties, like which monitor to open on, how big it
is, where it goes, etc.

It also sets its contents to the string `"example content"`.

You open this window by using `eww open example`.

### Widgets

Widgets are the interactive components which make up Windows.

They are defined like:
```yuck
(defwidget greeter [?text name]
  (box :orientation "horizontal"
       :halign "center"
    text
    (button :onclick "notify-send 'Hello' 'Hello, ${name}'"
      "Greet")))
```

The name of the widget is the first argument passed in to `defwidget`. In this case it's `greeter`.

`[?text name]` defines two attributes which are like arguments. `text` is marked as optional with the `?`.

:::tip
If a widget takes in no attributes, then the array of attributes still must be provided.
:::

And are used in a window like:
```yuck
(defwindow example
           ; ... values omitted
  (greeter :text "Say hello!"
           :name "Tim"))
```

#### `box`

The most common widget you'll use is `box`, which is the main layout container.

`box` takes in all [the base attributes](https://elkowar.github.io/eww/widgets.html#widget), like `class`, as well as:
- spacing: `int` spacing between elements
- orientation: `string` orientation of the box. possible values: "vertical", "v", "horizontal", "h"
- space-evenly: `bool` space the widgets evenly.

[See `box` in the eww documentation](https://elkowar.github.io/eww/widgets.html#box)

#### `label`

`label` is used for marking up text with more control.

[See `label` in the eww documentation.](https://elkowar.github.io/eww/widgets.html#label)

