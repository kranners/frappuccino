---
id: Git Update Previous Commit
aliases: []
tags:
  - git
  - operations
  - commit
---

# Git Update Previous Commit

```shell
# Update the previous commit, without updating the commit message.
git commit --amend --no-edit

# Set 'git amend' to that previous command
git config --global alias.amend 'commit --amend --no-edit'
``` 