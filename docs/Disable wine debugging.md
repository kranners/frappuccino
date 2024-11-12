---
id: Disable wine debugging
aliases:
  - Disable wine debugging
tags: []
---

# Disable wine debugging

Use the `WINEDEBUG` environment variable:

```shell
export WINEDEBUG=-all
```

[From this Stack Overflow thread](https://askubuntu.com/questions/85221/turn-off-wine-debugging)

Or also use `winetricks nocrashdialog`

