---
tags:
  - nix
  - nixos
  - system
  - linux
---
# Nix

[Nix](https://nix.dev/tutorials/nix-language.html) is a language, package manager and ecosystem for creating declarative system configurations.

Nix can be used standalone to manage a user with [[Home Manager]], or to configure your entire  system using [[NixOS]].

## Nixpkgs

[Nixpkgs](https://github.com/nixos/nixpkgs) is the official repository of software packages for the Nix package manager.

```nix
inputs = {
	nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
}
```

According to [Repology, nixpkgs has more than twice the number of fresh packages as the AUR](https://repology.org/repositories/graphs).

### Channels

[A channel](https://nixos.wiki/wiki/Nix_channels) is a branch in the Nixpkgs repository which includes a set list of (normally) well-tested packages.

To see a list of channels and their health, [see the official Nix Channel Status page](https://status.nixos.org/).

### Flakes

A flake is a kind of NixOS derivation (an entire working configuration) that uses a lockfile to manage package versions, rather than channels.

**NOTE:** You do not need a flake in order to manage your configuration with NixOS, and you do not need a flake to import other files.

To enable flakes, set the `nix.package` and `nix.settings.experimental-features` options to the following:
```nix
# Enable Flakes
nix.package = pkgs.nixFlakes;
nix.settings.experimental-features = ["nix-command" "flakes"];
```

*Check out [[Nix Flakes]] for more information.*

## Derivations

A derivation is a set of instructions which inform Nix how to build a package from scratch.



### `pkgs.writeShellApplication`

[`pkgs.writeShellApplication`](https://ryantm.github.io/nixpkgs/builders/trivial-builders/#trivial-builder-writeShellApplication) does three things:
1. Creates a package which only contains your `.text` as an executable script
2. Automatically sets the `PATH` of the script to contain any `runtimeInputs`
3. Sets some sanity options `errexit`, `nounset`, `pipefail`
4. Checks the script with [shellcheck](https://github.com/koalaman/shellcheck), and throws compile errors for any issues

Here's a function for installing a script managed using `writeShellApplication`:
```nix
{ pkgs, ...}: let 
	# Here we define a script called screenshot-region
	screenshot-region = pkgs.writeShellApplication {
		name = "screenshot-region";
		
		# Define all the dependencies for the PATH
		runtimeInputs = [pkgs.grim pkgs.slurp pkgs.wl-clipboard];
		
		text = ''
		grim -g "$(slurp -d)" - | wl-copy && notify-send "Copied region to clipboard"
		'';
	};
in {
	# Make the script accessible to the user
	home.packages = [screenshot-region];

	# Make the script accessible to the entire system
	environment.systemPackages = [screenshot-region];
}
```

### `pkgs.writeTextFile`

[`pkgs.writeTextFile`](https://ryantm.github.io/nixpkgs/builders/trivial-builders/#trivial-builder-writeText) and other basic text builders will write text files into the Nix stores as a derivation.

If provided with a `.destination` option, it will write that to a file contained inside the derivation.
If not provided, the file will be at the root of the derivation.

This can be used with [[Home Manager]] to add it to your XDG config, or just anywhere in your `$HOME` directory.

Or it can be used with [[NixOS]] to write out a config file into `/etc/`.

Here's a sample for adding a [workstyle](https://github.com/pierrechevalier83/workstyle) config:
```nix
{ pkgs, ... }: let
	workstyle-config = pkgs.writeTextFile {
		name = "config.toml";

		# Only the best settings
		text = ''
		  "foot" = "🦶"
	      "discord" = "🗣️"
	      "code" = "💻"
	      "obsidian" = "💎"	
		'';
	};
in {
	# Write to $XDG_CONFIG/workstyle/config.toml
	xdg.configFile.workstyle = {
		target = "./workstyle/config.toml";
		source = workstyle-config;
	};

	# Write to $HOME/.workstyle.toml
	home.file.".workstyle.toml".source = workstyle-config;

	# Write to /etc/workstyle
	environment.etc.workstyle.source = workstyle-config;
}
```

**NOTE:** For any of these options, you can also define the `text` key inline:
```nix
{ pkgs, ... }:  {
	# Write to $XDG_CONFIG/workstyle/config.toml
	xdg.configFile.workstyle = {
		target = "./workstyle/config.toml";
		text = ''
		  "foot" = "🦶"
		  "discord" = "🗣️"
		  "code" = "💻"
		  "obsidian" = "💎"	
		'';
	};

	# Write to $HOME/.workstyle.toml
	home.file.".workstyle.toml".text = ''
	  "foot" = "🦶"
	  "discord" = "🗣️"
	  "code" = "💻"
	  "obsidian" = "💎"	
	'';

	# Write to /etc/workstyle
	environment.etc.workstyle.text = ''
	  "foot" = "🦶"
	  "discord" = "🗣️"
	  "code" = "💻"
	  "obsidian" = "💎"	
	'';
}
```
