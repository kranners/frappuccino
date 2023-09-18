---
tags:
  - development
  - programming
  - cli
title:
---

# zsh

[zsh](https://www.zsh.org/) (Z shell) is the default [terminal](#Command%20Line) for [[MacOS]], and is otherwise very common.

For a terminal emulator to set up, check out [[iTerm2]].

## Configuration

### Setup wizard

If there are no configuration files (*.zshenv*, *.zprofile*, *.zshrc*, *.zlogin*) present, running
```shell
zsh
```
will enter you into initial setup mode for the shell.

Alternatively (unsafely) to run the wizard whenever, it's
```shell
autoload -U zsh-newuser-install
zsh-newuser-install -f
```

On [[MacOS]] you will often skip this step, as the Terminal app will preload one or many of these files for you (**pure speculation**).

To get back into running this config:
```shell
# Make backups of all your existing configuration files first!
mv ~/.zshenv   ~/.zshenv-backup
mv ~/.zprofile ~/.zprofile-backup
mv ~/.zshrc    ~/.zshrc-backup
mv ~/.zlogin   ~/.zlogin-backup

# Then re-run the wizard.
autoload -U zsh-newuser-install
zsh-newuser-install -f
```

## Plugins

There is an absolute [ton of zsh plugins](https://github.com/unixorn/awesome-zsh-plugins) available. They do everything.

**OPINION:** Don't just install things for the sake of it. Find a problem first, then install a solution for that if one exists.

Here's a random list of plugins in no particular order:
- [powerlevel10k](https://github.com/romkatv/powerlevel10k) - the most well-maintained zsh theme. Alternatives are [bullet-train](https://github.com/caiogondim/bullet-train.zsh) and the OG [powerline](https://github.com/powerline/powerline).
- [fast-syntax-highlighting](https://github.com/zdharma-continuum/fast-syntax-highlighting) - syntax highlighting.
- [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) - auto suggestions based on history
- [zsh-history-substring-search](https://github.com/zsh-users/zsh-history-substring-search) - adds search functionality on pressing UP for completion
- [history-search-multi-word](https://github.com/zdharma-continuum/history-search-multi-word) - changes history search to fuzzy-find across entire commands

## Plugin managers

### oh-my-sh

[oh-my-zsh](https://ohmyz.sh/) is an opinionated plugin manager for zsh.

### No plugin manager

To not use a plugin manager (best if *you* are the opinionated one), the general steps are:
1. Define a list of plugins and a directory to store them in into your *~/.zshrc*.
2. Install them manually into your directory using [[Git]].
3. Source them at the bottom of your *~/.zshrc*.
4. Follow additional installation steps in the plugins you install.

*~/.zshrc*
```shell
# This is just an example path, it could be whatever you want.
ZSH_PLUGIN_DIRECTORY="${ZDOTDIR:-$HOME/.config/zsh}/plugins"

ZSH_PLUGINS=("powerlevel10k/powerlevel10k.zsh-theme" "zdharma-continuum/fast-syntax-highlighting")

# Load the plugins.
for plugin in $ZSH_PLUGINS; do
	source "${ZSH_PLUGIN_DIRECTORY}/${plugin}"
done
```

On initial install of your plugins:
```shell
# Again, do whatever you want here.
ZSH_PLUGIN_DIRECTORY="${ZDOTDIR:-$HOME/.config/zsh}/plugins"

install_plugin() {
	# The first argument is expected to be author/repository.
	# Like romkatv/powerlevel10k
	git clone "git@github.com:${1}.git" "$ZSH_PLUGIN_DIRECTORY/${1}"
}

install_plugin romkatv/powerlevel10k
install_plugin zdharma-continuum/fast-syntax-highlighting
install_plugin zsh-users/zsh-autosuggestions
install_plugin zsh-users/zsh-history-substring-search
install_plugin zdharma-continuum/history-search-multi-word
```

