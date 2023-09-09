---
tags: pyenv, python, development, programming
---

# pyenv

[pyenv](https://github.com/pyenv/pyenv) is a [terminal-based](Command%20Line) [[Python]] version manager

```shell
brew install pyenv
```

After installation, you'll need to add its environment to your `~/.zshrc` or similar.

```zsh
eval "$(pyenv init -)"
```
### Usage

pyenv will automatically resolve any incomplete version to whatever the latest is.

```shell
# Install whichever is the pinned version, see below for details.
pyenv install

# Install the latest version.
pyenv install 3

# Install the latest patch version.
pyenv install 3.10
```

`pyenv use` for setting the version.

```shell
# Use the latest version.
pyenv use 3.11.5
```

### Which version comes first?

1. The version in the `PYENV_VERSION` environment variable.
2. The version stored in `.python-version` (whichever is nearest to your CWD)

You can set this using `pyenv local <version>`.
```shell
# Set 3.11.5 to our local version.
pyenv local 3.11.5

cat .python-version
> 3.11.5
```

3. The global version, which can be set using `pyenv global <version>`.
```shell
# Set latest 3 version to be the global.
pyenv global 3
```

### pyenv-virtualenv

[pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv) is a plugin for managing [[Python]] [virtual environments](https://docs.python.org/3/library/venv.html).

```shell
brew install pyenv-virtualenv
```

After installation, add its environment to your `~/.zshrc` or similar:
```shell
eval "$(pyenv virtualenv-init -)"
```

The virtual environments are stored under your home directory in `~/.pyenv/versions/`.

To get started with a virtual environment, it's just:
```shell
# Name this whatever your project is called.
pyenv virtualenv <name>

# Then you can set it to your local version.
# Now, pyenv will use the virtual environment automatically :)
pyenv local <name>
```