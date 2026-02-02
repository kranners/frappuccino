---
id: Git Time Travel
aliases: []
tags:
  - git
  - operations
  - history
  - rewrite
---

# Git Time Travel

Changing a given commit from the past.

1. Find the commit on the file that you want to change, so like

```shell
git log <file>
```

2. Once you have that commit hash, do

```shell
git rebase -i <commit-hash>~1
```

And set the commit in question to `edit` or `e` from `pick` to go back to that
commit.

3. Reset the changes on that commit with

```shell
git reset --soft HEAD~1
```

4. Then unstage the file on that commit with

```shell
git restore --staged <name-of-file>
```

4. Make the necessary changes, or to fully restore the file back just use

```shell
git restore <name-of-file>
```

5. Then remake the commit with

```shell
git commit --amend
```

6. Then finally

```shell
git rebase --continue
```

to finish the interactive rebase, and

```shell
git push --force
```

to fix up the change. 

