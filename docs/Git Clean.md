---
id: Git Clean
aliases: []
tags:
  - git
  - operations
  - clean
---

# Git Clean

To just remove all untracked files, folders, or ignored files it's:

```shell
# Clean untracked files.
git clean -f

# Clean untracked directories.
git clean -d

# Also clean ignored files.
git clean -f -x

# Clean everything!
git clean -fdx
``` 