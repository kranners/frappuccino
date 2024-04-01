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

Custom user services are defined under `systemd.user.services.<service>`, like:
```nix
systemd.user.services.workstyle = {
	Unit = {
		Description = "Auto rename workspaces based on what's in them";
	};
	
	Install = {
		WantedBy = ["default.target"];
	};
	
	Service = {
		ExecStart = "${pkgs.workstyle}/bin/workstyle";
	};
};
```

Most of this setup should be self-explanatory, the `<service>` name is what you will use to imperatively manage the service.
```shell
# Restart the service we defined
systemctl --user restart workstyle
```

##### What is `WantedBy = ["default.target"]`?

Without `WantedBy`, systemd will not start the service by default, even if enabled.

Other services would need to define a `Requires=your.service` or `Wants=your.service` for it to be started.

To start your service automatically, it requires a `WantedBy`. This is usually one of either `multi-user.target` or `graphical.target`.

`multi-user.target` will instruct systemd to start the service whenever the system is ready to accept logins (like a tty).
`graphical.target` will instruct systemd to start the service after a local GUI login, like through a display manager (something [like sddm](https://github.com/sddm/sddm)).

`default.target` is a symlink to one of the above targets. It lives in `/etc/systemd/system/default.target`, check it out there to find what it symlinks to.

In my case, `default.target` linked to `graphical.target`.