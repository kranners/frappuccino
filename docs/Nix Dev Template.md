---
id: Nix Dev Template
date: "09 March, 2025"
---

# Nix Dev Template

There are [a bunch of Nix dev shells as initialisable flakes from the-nix-way.](https://github.com/the-nix-way/dev-templates)

Use this in a project by:
```shell
# Where ${ENV} is the name of your project language eg. rust, node, python, c-cpp
nix flake init --template "https://flakehub.com/f/the-nix-way/dev-templates/*#${ENV}"
```

To make a [[Node]] project, you can:
```shell
nix flake init --template "https://flakehub.com/f/the-nix-way/dev-templates/*#node"
```

Alternatively, use [[nix-direnv]] for a more basic shell.

