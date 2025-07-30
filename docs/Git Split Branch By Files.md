---
id: Git Split Branch By Files
aliases: []
tags:
  - git
  - operations
  - branch
---

# Git Split Branch By Files

Doing this will remove your commit history from the original branch.

```shell
# Make the new branch (probably base it off of your main one)
# Your working state should be clean.
git switch main
git switch --create feat/new-branch-one

# Add all the original branches changes
git merge --squash --no-commit feat/original-branch

# Stage and commit the ones that you want
git add foo.txt bar.file whatever.json
git commit -m "whatever"
git push # I hope you have automatic remotes

# Once those ones are in, stash the remaining changes and repeat the process
git stash
git switch main
git switch --create feat/new-branch-two

# Rinse and repeat!
``` 