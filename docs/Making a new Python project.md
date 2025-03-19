---
id: Making a new Python project
date: "16 March, 2025"
---

# Making a new Python project

:::warning
For [[NixOS]] users, you'll need to add [nix-ld to your system configuration.](https://github.com/nix-community/nix-ld?tab=readme-ov-file)

nix-ld hooks into C library imports and will point it to the relevant library
in the nix store based on whatever libraries you configure to be installed.

```nix
{ config, pkgs, ... }: {
  # Enable nix ld
  programs.nix-ld.enable = true;

  # Sets up all the libraries to load
  programs.nix-ld.libraries = with pkgs; [
    stdenv.cc.cc
    zlib # numpy requires zlib
    fuse3
    icu
    nss
    openssl
    curl
    expat
    # ...
  ];
}
```
:::

### Make your directory

```shell
mkdir my-project
cd my-project
```

### Initialise for git

```shell
git init
```

Optionally, create a new one or grab an existing .gitignore file from [Github](https://github.com/github/gitignore)
```shell
wget https://raw.githubusercontent.com/github/gitignore/refs/heads/main/Python.gitignore -O .gitignore
```

### Set up a Nix shell, maybe one from [[Nix Dev Template]]

For Python, go with a barebones shell, and add `pkgs.uv` to it.
```shell
nix flake init --template github:nix-community/nix-direnv
```

So, `pkgs.uv` goes in the `packages` array.
You don't need to install [[Python]] itself, [[uv]] can do it all.

### Configuring direnv

[Follow the steps on the direnv wiki](https://github.com/direnv/direnv/wiki/Python#uv) to allow your direnv to read `layout uv`

### Using `uv`

Initialise the rest of your Python project with:
```shell
uv init
```

Beyond here, any Python dependencies can be managed with `uv`:
```shell
uv add pandas
```

#### Using `uv` with Jupyter

The `uv` documentation suggests starting Jupyter directly with:
```shell
uv run --with jupyter jupyter lab
```

You can add that to a [[just]]file:
```justfile
default:
    uv run --with jupyter jupyter lab
```

And `just` to start the server.

Once the server is up, select a `venv` notebook to get started.

See [Using uv with Jupyter | uv](https://docs.astral.sh/uv/guides/integration/jupyter/#using-jupyter-within-a-project)
See [Writing your pyproject.toml - Python Packaging User Guide](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/#creating-executable-scripts)

