---
id: Follow symlink
aliases:
  - Follow symlink
tags: []
---

# Follow symlink

Use `readlink -f /path/to/link`

```shell
# For a tool installed by Homebrew
$ readlink -f $(which cowsay)

# Get the full installation path of the actual binary
/opt/homebrew/Caskroom/cowsay/.../cowsay
```

[readlink(1) - Linux manual page](https://man7.org/linux/man-pages/man1/readlink.1.html)

