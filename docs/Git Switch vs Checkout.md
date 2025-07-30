---
id: Git Switch vs Checkout
aliases: []
tags:
  - git
  - operations
  - branch
---

# Git Switch vs Checkout

`git switch` exists to [clarify `git checkout`.](https://stackoverflow.com/questions/57265785/whats-the-difference-between-git-switch-and-git-checkout-branch)

```shell
# Create and switch to a new branch
git checkout -b my/new-branch

# This will do the exact same thing, but maybe it looks better to you?
git switch --create my/new-branch # -c is shorthand for --create
``` 