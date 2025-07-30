---
id: Git Move Commits
aliases: []
tags:
  - git
  - operations
  - branch
---

# Git Move Commits

:::tip
Commits are not related to the branch they are on. They are agnostic.
:::

Start by getting all the commits you want to move over. You can rewrite history however here to make it happen.

```shell
# Get the commits I want to move
git log --oneline

# Let's say I want to move across commits with hashes X, Y, Z
# Switch first so we don't base the new branch off the current one
git switch <main|master>
git switch --create <new-branch>

# Cherry pick those commits, you can pick multiple at once
git cherry-pick X Y Z

# Move back and remove those commits
git switch <old-branch>
git rebase -i <before-X>
``` 