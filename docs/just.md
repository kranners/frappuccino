---
id: just
aliases:
  - just
tags: []
---

# `just`

[`just` is a command runner](https://github.com/casey/just)

There are no Nix options for `just`, [but there is a nixpkg](https://github.com/NixOS/nixpkgs/blob/nixos-unstable/pkgs/by-name/ju/just/package.nix#L100).

### Usage

Create a Justfile like:

```justfile
# run the thing
run:
    npx astro dev

# run the tests
test:
    npx jest
```

List out your commands like:

```shell
> just -l
Available recipes:
    run  # run the thing
    test # run the tests
```

Define arguments in your recipes like:

```justfile
# run the thing
run port:
   npx astro dev --port {{port}} --open
```

And call them like:

```shell
just run 8080
```

Define variables like:

```justfile
platform := `uname`
nproc := `nproc`

version := "0.1.7"
```

Use them the same.

Get environment variables like:

```justfile
say_hello:
    echo "Well hi there, ${USER}!"
```

Export environment variables into the recipes like:

```justfile
export TZ = "Australia/Melbourne"

clock:
    node -pe "new Date().toString()"
```

```shell
# you too, can be australian
> just clock
Fri Sep 13 2024 21:19:11 GMT+1000 (Australian Eastern Standard Time)
```

Use your favourite language like:

```justfile
bam:
    #!/usr/bin/env node
    console.log("Finally, console.log in another place 🤡")
```

### Chooser

just also has a chooser:

```shell
just --choose
```

You can make the chooser your default recipe:

```shell
default:
    @just --choose
```

[See the docs page on the chooser.](https://just.systems/man/en/chapter_54.html)

### In Neovim

There's [a syntax highlighter for just in Neovim.](https://github.com/NoahTheDuke/vim-just)

### Documentation

[See the `just` documentation](https://just.systems/man/en/)

_(It's also just... their README...)_

In particular:

- [Check out the Quick Start guide](https://just.systems/man/en/chapter_20.html)
- [Check out the cheatsheet](https://cheatography.com/linux-china/cheat-sheets/justfile/)
