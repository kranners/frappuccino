---
id: Git Uncommit Changes
aliases: []
tags:
  - git
  - operations
  - history
---

# Git Uncommit Changes

To do this, use `git reset` without either the `--soft` or `--hard` flags.

```shell
# "Uncommit" once, preserving the changes
git reset HEAD~1

> Unstaged changes after reset:
> ...
```

Or, you could destroy all your changes:

```shell
# Reset absolutely everything back to the
git reset --hard origin
``` 