---
tags: command line, node, javascript, typescript, terminal, zsh
---

[`fnm`](https://github.com/Schniz/fnm) is a [[Command Line]] tool for managing [[Node]] versions.

#### Using the correct version in a pre-set repository

To get started, just use `fns use`.

#### Installing a new Node version

Use `fnm install <version> | --lts | --latest`
So to install the latest LTS version, the command is:

```shell
# Installs most recent LTS version
fnm install --lts

# Installs most recent version
fnm install --latest

# Installs specifically v16.19.0
fnm install v16.19.0
```

#### Setting the Node version in a repository

The repository's desired [[Node]] version is stored in *.node-version* at the root level.

```shell
# Sets the current version to v16.19.0
fnm use v16.19.0

# Outputs "v16.19.0" to .node-version
fnm current > .node-version
```
