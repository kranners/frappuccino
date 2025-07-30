---
id: Git Find First Commit With File
aliases: []
tags:
  - git
  - operations
  - search
---

# Git Find First Commit With File

```shell
# Using the diff filter to find only the log which added stuff
git log --diff-filter=A -- path/to/file
``` 