---
id: nix-direnv
date: "07 January, 2025"
---

# nix-direnv

[nix-direnv](https://github.com/nix-community/nix-direnv) is a faster implementation of direnv's `use_nix` and `use_flake`

## Getting started

Add a flake.nix and .envrc to an existing project with:
```shell
# Add to the current directory (change . to something else for a specific path)
nix flake new -t github:nix-community/nix-direnv .
```

Then edit the flake.nix with your required packages and `direnv allow`.
