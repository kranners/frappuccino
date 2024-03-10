---
tags:
  - nix
  - nixos
  - system
  - linux
---
# NixOS

[NixOS](https://nixos.org/) is a [[Linux]] distribution which allows for fully declarative system configuration. This differs from most distributions, like [[Arch Linux]] which rely on imperative tooling.

NixOS is built using [[Nix]].

```shell
# Edit the config.
sudo vim /etc/nixos/configuration.nix

# Apply the config.
sudo nixos-rebuild switch

# Done 🎉
```
