---
tags: homebrew, brew, macos
---

# Homebrew

[Homebrew](https://brew.sh/) is a ubiquitous package manager for [[MacOS]] (and technically [[Linux]] as well).

It's installed using their installation script:
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Or by using their `.pkg` installer from [the releases page](https://github.com/Homebrew/brew/releases).

## Usage

**Check for which packages are installed already**
```shell
brew list
```

**Search for a package** (note that packages already installed will be marked with a `✔`)
```shell
brew search openjdk

==> Formulae
openjdk ✔           openjdk@11          openjdk@17          openjdk@8           openj9              openvdb

==> Casks
adoptopenjdk                             microsoft-openjdk                        openttd
```

