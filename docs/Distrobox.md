---
id: Distrobox
date: "22 April, 2025"
---

# Distrobox

[Distrobox](https://distrobox.it/) is a container wrapper for making lightweight Linux boxes.

This is particularly useful for [[Nix]] development, since it often causes big
issues for things expecting normal FHS, and making an explicit FHS environment
is fairly involved.

## Usage

From their documentation
**Create a new distrobox:**
```shell
distrobox create -n test
```

**Create a new distrobox with Systemd (acts similar to an LXC):**
```shell
distrobox create --name test --init --image debian:latest --additional-packages "systemd libpam-systemd pipewire-audio-client-libraries"
```

**Enter created distrobox:**
```shell
distrobox enter test
```

