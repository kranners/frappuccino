---
id: 1726141360-IFXR
aliases:
  - Get Nixvim Lua config
tags: []
---

# Get Nixvim Lua config

The config is passed in as a command line argument to the `nvim` called in the Nix-generated wrapper script.

To grab it in a one-liner:
```shell
cat $(which nvim) | tail -n 1 | awk '{print $15}'
```

