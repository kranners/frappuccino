---
id: Nix Flakes
aliases: []
tags:
  - nix
  - nixos
  - system
  - linux
---
# Nix Flakes

*From: [[Nix]], [[NixOS]], [[Home Manager]].*

Flakes are an experimental feature of Nix which allow users to manage their [[NixOS]] configuration outside of `/etc/nixos/configuration.nix`, and add it to something like a [[Git]] repository.

A "flake" is a set of files which contains a valid *flake.nix* entrypoint.
Much like how a [[Node]] package is a set of files which contains a valid *package.json* and *index.js*.

## Getting started

### Migrating to Flakes on [[NixOS]]

1. Enable the experimental feature in your `/etc/nixos/configuration.nix`
```nix
nix.settings.experimental-features = [ "nix-command" "flakes" ];
```
Rebuild and switch.

2. Start a new flake (preferably in a [[Git]] repository)
```shell
nix flake init

# Might want this, too
git init
```

3. Copy your system and hardware configurations into your new repository
```shell
# Assuming you're in the repository
sudo cp /etc/nixos/*.nix .
```

4. Edit the initial *flake.nix* to include your previous system configuration as a module
```nix
{
  description = "flake for my computer";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
    ...
  } @ inputs: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    nixosConfigurations = {
      <your computer> = nixpkgs.lib.nixosSystem {
        specialArgs = {inherit inputs;};
        modules = [ ./configuration.nix ];
      };
    };
  };
}
```
**NOTE:** Ensure you replace `<your computer>` with your computer's host name.

5. Check in all the files into your [[Git]] repository
```shell
# Make sure EVERYTHING gets checked in!
git add .
git commit -m "feat: init flake"
```

6. Rebuild using the flake instead of your system configuration
```shell
sudo nixos-rebuild switch --flake .
```

## Inputs

To add another flake:
```nix
inputs = {
    # Both flakes
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    nur.url = "github:nix-community/NUR";
};
```

To add non-flakes:
```nix
inputs = {
    toggleterm-manager = {
        url = "github:ryanmsnyder/toggleterm-manager.nvim";
        flake = false;
    };
}
```

To add private repositories:
```nix
inputs = {
    my-private-repo = {
        url = "git+ssh://git@github.com/username/my-private-repo";
        flake = false;
    };
}
```

