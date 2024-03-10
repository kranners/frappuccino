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

Flakes are an experimental feature of Nix which allow users to manage their [[NixOS]] configuration outside of `/etc/nixos/configuration.nix`, and add it to something like a [[Git]] repository.

```nix
nix.settings.experimental-features = [ "nix-command" "flakes" ];
```

*Check out [[Nix Flakes]] for more information.*