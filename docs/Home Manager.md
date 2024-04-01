---
tags:
  - home-manager
  - package
  - homebrew
  - linux
  - macos
---
# Home Manager

[Home Manager](https://github.com/nix-community/home-manager) is a tool and service for managing user home directories (like, their dotfiles) using [[Nix]], akin to [[NixOS]].

You can set up Home Manager in [[MacOS]] machines, too.

## Installation

### On NixOS, as a module

First, you'll want your setup to be using [[Nix Flakes]]. Follow the steps there, then come back here.

1. Add `home-manager` to your system packages:
```nix
environment.systemPackages = [
	...
	
	pkgs.home-manager
	
	...
];
```
Rebuild and switch.

2. Initialise a new *home.nix* with the CLI, add it to your flake repository:
```shell
# These files are created under ~/.config/home-manager/home.nix|flake.nix
home-manager init

# We can leave flake.nix untouched, just don't run home-manager in a standalone way
cp ~/.config/home-manager/home.nix .
```

3. Add `home-manager` as an input in your *flake.nix*:
```nix
inputs = {
	# Home manager tracks unstable by default
	nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
};
```

4. Add in a `home-manager` entry to your NixOS configuration:
```nix
outputs = {
	self,
	nixpkgs,
	home-manager,
	...
} @ inputs: let
		system = "x86_64-linux";
		pkgs = nixpkgs.legacyPackages.${system};
	in {
		nixosConfigurations = {
			<hostname> = nixpkgs.lib.nixosSystem {
				specialArgs = {inherit inputs;};

				modules = [
					./configuration.nix
					
					inputs.home-manager.nixosModules.default
					
					{
						home-manager = {
							useGlobalPkgs = true;
							useUserPackages = true;
							
							# Important bit! Import the home.nix from before
							users.<username> = import ./home.nix;
						};
					}
				];
			};
		};
	};
}
```

## Usage

### Defining custom user services

