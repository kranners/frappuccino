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

To change the default layout (to hide the bottom bar / hints):
```nix
{
    programs.zellij.settings = {
        # Hide the bar
        default_layout = "compact";

        default_shell = "zsh";
        default_mode = "locked"; # if you want, i guess 🔒

        # Hide the session name (if you don't like it 😞)
        ui.pane_frames.hide_session_name = true;
    };
}
```

[See the home-manager source](https://github.com/nix-community/home-manager/blob/master/modules/programs/zellij.nix)

### Welcome page

[Zellij has a welcome page that you can use to launch a Zellij session picker at launch for a new shell.](https://zellij.dev/tutorials/session-management/)

In Alacritty:
```toml
[shell]
program = "zellij"
args = ["-l", "welcome"]
```

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

