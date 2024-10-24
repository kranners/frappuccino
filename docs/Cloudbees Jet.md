---
id: Cloudbees Jet
aliases:
  - Cloudbees Jet
tags: []
---

# Cloudbees Jet

CodeShip is a CI/CD framework? Tool?

Jet is a CLI tool for managing CodeShip repositories.

[See CloudBees CodeShip](https://docs.cloudbees.com/docs/cloudbees-codeship/latest/)

### Installation

```shell
brew install cask codeship/taps/jet
```

[See installing Jet](https://docs.cloudbees.com/docs/cloudbees-codeship/latest/pro-jet-cli/installation#_installing_jet)

:::warning
After installation, this needed to be marked as OK to open in MacOS.

Open the proper install directory with
```shell
open $(dirname $(readlink -f $(which jet)))
```

Then right-click and select Open to mark as not dangerous.
:::

### Usage

The main command seems to be `jet steps`.
Append any command with `--help` to see helptext for that command.

[See Using the Jet CLI](https://docs.cloudbees.com/docs/cloudbees-codeship/latest/pro-jet-cli/usage-overview)

