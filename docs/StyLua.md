---
id: StyLua
date: "29 August, 2025"
---

# StyLua

[StyLua is a Lua formatter.](https://github.com/JohnnyMorganz/StyLua)

## Installation

It can be installed practically anywhere there are packages to be installed:
```shell
brew install stylua
```

```nix
{
    home.packages = [ pkgs.stylua ]
}
```

## Usage

Target either a file or a directory recursively containing Lua source files:
```shell
# Target a file
stylua ./path/to/file.lua

# Or target a directory
stylua .
```

## Configuration

Configure in a _stylua.toml_ or _.stylua.toml_ file.

[See here for available configuration options.](https://github.com/JohnnyMorganz/StyLua#options)

```toml
column_width = 120
indent_type = "Spaces"
indent_width = 4
quote_style = "AutoPreferDouble"
```
