---
tags:
  - linux
  - ricing
  - arch
  - nix
---
# sway

[sway](https://swaywm.org/) is the de facto standard [[Wayland]] compositor, and a direct replacement for the [i3 window manager](https://i3wm.org/).

## Installation

### Under [[Arch Linux]]

sway can be installed using the `sway` package:
```shell
sudo pacman -S sway
```

For sway to work, it needs privileged access to your "seat".

**NOTE:** A *seat* just refers to all the physical devices required to run a desktop environment. Things like your mouse, keyboard, display, etc.
[*See the Wikipedia page on Multiseat configuration for more info.*](https://en.wikipedia.org/wiki/Multiseat_configuration)

If you have [`polkit`](https://archlinux.org/packages/?name=polkit) installed, then sway will be able to pick up on that and launch automatically.

If polkit is not installed, sway will come bundled with [`seatd`](https://archlinux.org/packages/?name=seatd) as a dependency of `wlroots`.
To get `seatd` working, add yourself to the `seat` group and enable the `seatd.service`:

```shell
# Add yourself to the "seat" group - again ONLY for no polkit.
sudo usermod -aG seat $(whoami)

# Enable the service
sudo systemctl enable seatd.service
```

To run sway from TTY, it's just:
```shell
# Start sway.
sway
```

### Under [[NixOS]]

It's generally recommended that you run sway under [[Home Manager]].

To set it up, first enable `polkit`:
```nix
# configuration.nix
security.polkit.enable = true;
```

Then you can set `wayland.windowManager.sway` in your home config:
```nix
# home.nix
wayland.windowManager.sway = {
	enable = true;

	# This is defaulted to on, anyway.
	xwayland = true;
};
```

If you are using a login manager, you'll need to add the sway nixpkg into its session packages.
Here's sddm as an example:
```nix
services.xserver.displayManager = {
	sddm = {
		enable = true;
		wayland.enable = true;
	};
	
	sessionPackages = [
		# Or whatever else
		pkgs.hyprland
		pkgs.sway
	];
};
```

If you're on a system that changes output regularly, like a laptop, then it's recommended to install some kind of external output configuration, like [`kanshi`](https://sr.ht/~emersion/kanshi/):
```nix
# Copied from https://nixos.wiki/wiki/Sway#Systemd_services
systemd.user.services.kanshi = {
	description = "kanshi daemon";
	
	serviceConfig = {
		Type = "simple";
		ExecStart = ''${pkgs.kanshi}/bin/kanshi -c kanshi_config_file'';
	};
};
```

## Configuration

### Under [[Arch Linux]]

Configuration is located under `~/.config/sway/config`, and is a superset of i3 configuration.
If you've got an existing i3 config, copy-pasting it should work.

To begin configuring, start by copying over the default config:
```shell
# Make sure the folder exists first
mkdir -p ~/.config/sway

# Copy the default config over
cp /etc/sway/config ~/.config/sway/config

# Start editing :)
nvim ~/.config/sway/config
```
