---
id: Git Get All Commit Hashes
aliases: []
tags:
  - git
  - operations
  - search
---

# Git Get All Commit Hashes

```shell
# The awk at the end will ensure you only get the short commit hash
git log --oneline -- path/to/file | awk '{print $1}'
``` 