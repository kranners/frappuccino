---
id: Symlinks
aliases: []
tags:
  - symlinks
  - command
  - line
  - filesystem
---

# Symlinks

A symlink (symbolic link) is a pointer in a given location, pointing back to a file or folder.
References to the link will effectively be the same as references to the original file.

:::tip
If your math includes spaces, multiple symlinks separated by spaces will be made.**
:::

```shell
# Note that the symlink path can be omitted.
# When omitted, by default a symlink at ./original will be made.
ln -s /path/to/original /path/to/symlink

ls -s /path/to/original-with spaces

# original-with -> /path/to/original
# spaces -> spaces
# These links have been made wrong since the original was not quoted.
ls -l
``` 