---
id: Git Merge Strategy Options
aliases: []
tags:
  - git
  - operations
  - merge
---

# Git Merge Strategy Options

This is done using the [`-X` or `--strategy-option` flag](https://git-scm.com/docs/git-merge#Documentation/git-merge.txt--Xltoptiongt).
[_For more info, see the page on merge strategies._](https://git-scm.com/docs/merge-strategies)

```shell
# Accept all the incoming changes for conflicts
git merge something-better -X theirs

# Accept all your changes for conflicts
git merge mine-is-cooler -X ours
``` 