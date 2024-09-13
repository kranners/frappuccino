---
id: 1726213501-RTWO
aliases:
  - Zellij
tags: []
---

# Zellij

[Terminal multiplexer similar to Tmux](https://github.com/zellij-org/zellij)

For configuration, [see the Zellij User Guide](https://zellij.dev/documentation/configuration)

#### Using Nix

[Home Manager options are available for this](https://home-manager-options.extranix.com/?query=zellij&release=master)

To enable:
```nix
{ pkgs, ...}: {
    home-manager.users.myname.programs.zellij = {
        # This is the only required option, the other ones are optional
        enable = true;

        enableZshIntegration = true;
        enableBashIntegration = true;
        enableFishIntegration = true;

        package = pkgs.zellij;

        settings = { ... };
    };
}
```

[See the home-manager source](https://github.com/nix-community/home-manager/blob/master/modules/programs/zellij.nix)

### Theming

[Zellij can be themed, for example with Catppuccin.](https://github.com/catppuccin/zellij)

To do this, either copy the given .kdl file into the config directly, or put it under the themes directory.

The themes directory is under the config directory, typically will be `~/.config/zellij/themes`.

For example, `~/.config/zellij/themes/catppuccin.kdl`.

To set, in the Zellij config specif:
```kdl
theme "catppuccin"
```

### Keys

Keys are notated as either a single character, or a modifier then a character.

```kdl
// a single character
bind "a"

// a modifier then a character
bind "Ctrl a"
```

Some keys aren't able to be bound with certain modifiers.
- Only characters (no special characters) can be bound with `Ctrl`
- Only characters and arrow keys can be found with `Alt`

[See the Zellij docs on keys](https://zellij.dev/documentation/keybindings-keys.html)

