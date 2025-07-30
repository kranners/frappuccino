---
id: Baritone
date: "27 July, 2025"
---

# Baritone

Baritone is a Minecraft mod which serves as a library and chat interface for
controlling your player with pathfinding algorithms.

[See the Baritone GitHub page.](https://github.com/cabaletta/baritone)

## Installation

Will vary based on your setup.

If you use Prism Launcher (you should be), you'll need to install this as a
manual separate file - as it is not hosted on Forge or Modrinth.

## Usage

Usage is done through commands, issued either programatically through their
library or via the chat commands.

All chat commands use the prefix `#` eg. `#help`.

### Basics

At any time:
- Pause pathing with `#pause`
- Resume pathing with `#resume`
- Stop and cancel pathing with `#stop`

### Movement

Go to:
- Given coordinates with `#goto <x> <z>`
- In your current direction with `#thisway`
- Wherever you can click with `#click`

Set a goal on your current location with `#goal`. And then path to it with `#path`.

### Mining

- Mine out a given block type or types with `#mine <block>`
- Farm any nearby harvestable plants with `#farm`
