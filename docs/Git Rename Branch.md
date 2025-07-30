---
id: Git Rename Branch
aliases: []
tags:
  - git
  - operations
  - branch
---

# Git Rename Branch

Use `git branch -m`:

```shell
# Rename my current branch to new-and-cool
git branch -m new-and-cool

# Rename a different branch
git branch -m bleh-bad-name new-and-cool
```

After this you may want to delete the remote branch:

```shell
# Delete it!
git push origin --delete bleh-bad-name

# Make a new remote for the branch
git push origin HEAD:new-and-cool

# Set your upstream to that
git branch -u origin/new-and-cool
```

[The Stack Overflow response has SO many upvotes.](https://stackoverflow.com/questions/6591213/how-can-i-rename-a-local-git-branch)

## With an upstream

Start by updating the name on your local:
```shell
git branch -m new-and-cool
```

Then delete the old branch on the remote:
```shell
git push origin --delete bleh-bad-name
```

Then update your local branch's upstream:
```shell
git branch --set-upstream-to origin/new-and-cool
``` 