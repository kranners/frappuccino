---
id: Git Stash Everything
aliases: []
tags:
  - git
  - operations
  - stash
---

# Git Stash Everything

```shell
# Stash including untracked files
git stash --include-untracked

# This is an alias for the above
git stash -u

# Stash EVERYTHING, untracked files and ignored files
# This one is potentially dangerous
# https://web.archive.org/web/20140310215100/http://blog.icefusion.co.uk:80/git-stash-can-delete-ignored-files-git-stash-u/
git stash --all
``` 