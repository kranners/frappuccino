---
tags:
  - nix
  - nixos
  - system
  - linux
---

# Nix

[Nix](https://nix.dev/tutorials/nix-language.html) is a language, package manager and ecosystem for creating declarative system configurations.

Nix can be used standalone to manage a user with [[Home Manager]], or to configure your entire system using [[NixOS]].

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

:::tip
You do not need a flake in order to manage your configuration with NixOS, and you do not need a flake to import other files.
:::

To enable flakes, set the `nix.package` and `nix.settings.experimental-features` options to the following:

```nix
# Enable Flakes
nix.package = pkgs.nixFlakes;
nix.settings.experimental-features = ["nix-command" "flakes"];
```

_Check out [[Nix Flakes]] for more information._

## Nix language

### Working with lists and attribute sets

Functions to work with [lists](https://ryantm.github.io/nixpkgs/functions/library/lists/#sec-functions-library-lists) and [attribute sets](https://ryantm.github.io/nixpkgs/functions/library/attrsets/#sec-functions-library-attrsets) generally come from their respective module in the nixpkgs standard library, or using [the `builtins` functions](https://nix.dev/manual/nix/2.18/language/builtins.html).

##### Common iteration patterns

[**List to attribute set**](https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-listToAttrs)

```nix
FRUITS = [
	{ value = 1; name = "Apple"; }
	{ value = 2; name = "Banana"; }
	{ value = 8; name = "Pomegranate"; }
];

// { Apple: 1; Banana: 2; Pomegranate: 8; }
prices = builtins.listToAttrs FRUITS;
```

[**Map items in a list**](https://ryantm.github.io/nixpkgs/functions/library/lists/#function-library-lib.lists.forEach)

```nix
FRUITS = [
	{ value = 1; name = "Apple"; }
	{ value = 2; name = "Banana"; }
	{ value = 8; name = "Pomegranate"; }
];

// [ { tag = "Apple - $1"; } { tag = "Banana - $2"; } { tag = "Pomegranate - $8"; } ]
tags = lib.lists.forEach FRUITS (fruit: {
	tag = "${fruit.name} - $${fruit.value}";
});
```

[**Map an attribute set into another attribute set**](https://ryantm.github.io/nixpkgs/functions/library/attrsets/#function-library-lib.attrsets.mapAttrs-prime)

:::tip
Pronounced "map attrs _prime_" 🙄
:::

```nix
PRICES = {
	Apple: 1;
	Banana: 2;
	Pomegranate: 8;
};

// { "Apple - $1": "$1.00; "Banana - $2": "$2.00"; "Pomegranate - $8": "$8.00"; }
shelf = lib.attrsets.mapAttrs' (fruit: price: {
	name = "${fruit} - $${price}";
	value = "$${price}.00";
});
```

[**Concatenate a list of strings**](https://ryantm.github.io/nixpkgs/functions/library/strings/#function-library-lib.strings.concatStrings)

```nix
WORDS = [ "howdy" "partner" "🤠" ];

// "howdypartner🤠";
greeting = lib.strings.concatStrings WORDS;
```

### Interpolation

[Nix supports interpolation in strings, paths, and attribute _names_.](https://nix.dev/manual/nix/2.23/language/string-interpolation#interpolated-expression)

#### Checking if a string contains a substring

[This is `lib.strings.hasInfix`:](https://ryantm.github.io/nixpkgs/functions/library/strings/#function-library-lib.strings.hasInfix)
```nix
hasInfix "bc" "abcd"
=> true
```

#### Interpolated expressions

When an expression is used in interpolation, it's called an [interpolated expression](https://nix.dev/manual/nix/2.23/language/string-interpolation#interpolated-expression).
Expressions interpolate like:

- `string`s interpolate to themselves.
- `path`s interpolate to their absolute path in the Nix store.
- `attribute set`s interpolate with a `__toString` attribute which you must provide.

#### Escaping special characters

[Indented strings can be annoying to avoid interpolation with for certain things](https://nix.dev/manual/nix/2.23/language/values.html#primitives:~:text=Since%20%24%7B%20and,%22.%20Example%3A).

- `$` can be escaped by prefixing it with `''`. i.e. `''${...}`
- `''` can be escaped by prefixing it with `'`. i.e. `'''stuff'''`

_For example: [[zsh]] value substitution in [[Nix#`pkgs.writeShellApplication`]]:_

```nix
let
	greeting = "Howdy 🤠";

	multiline = ''
		well hello there
		${greeting}
		''${greeting}

		'''goodbye 👋'''
	'';
in
# ''
# well hello there
# Howdy 🤠
# \${greeting}
# ''goodbye 👋''
# ''
multiline
```

#### Examples of interpolation

_Interpolating two strings_

```nix
let
	apple = "apple";
	banana = "banana";

	fruits = "${apple}s and ${banana}s";
in
# "apples and bananas"
fruits
```

_Interpolating a path_

```nix
let
	doggo = ./adorable-dog-photo.jpg;
in
{
	# "open /nix/store/.../adorable-dog-photo.jpg"
	script = "open ${doggo}";
}
```

_Interpolating an attribute set_

```nix
let
	full-name = {
		first = "Arn";
		last = "Peerz";

		# __toString takes in the attribute set itself
		__toString = name: "${name.first} ${name.last}";
	}
in
{
	# "Hello, Arn Peerz!"
	greeting = "Hello, ${full-name}!";
}
```

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

:::tip
For any of these options, you can also define the `text` key inline:
:::

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

##### `pkgs.writeTextDir`

`pkgs.writeTextDir` is a shorthand for `pkgs.writeTextFile` with `executable = false;` and taking in an argument for `destination = ...`:

```nix
let
	zsh-config = pkgs.writeTextDir ".zshrc" ''
		source "${pkgs.zsh-powerlevel-10k}"
	'';
in
```
