---
tags: git, software, programming, version control
---

[Git](https://git-scm.com/) is a commonly used [[Command Line]] tool for version management of code.

### Changing a given commit from the past (time travel)

1. Find the commit on the file that you want to change, so like

```shell
git log <file>
```

2. Once you have that commit hash, do

```shell
git rebase -i <commit-hash>~1
```

to go back to that commit.

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

### Storing credentials on MacOSX

```bash
git config --global credential.helper osxkeychain
```

## Interactive add (`git add -i`)

> "Help! I've done a bunch of work without committing, but I want my commit history to stay clean!"

An *interactive add* is the CLI equivalent of a GUI git client like [GitKraken](https://www.gitkraken.com/).

To begin an interactive add:
```shell
git add -i
```

From there the steps look something like the following:

Given the changed files
```
1 package.json
2 index.html
3 styles.css
```

Patch the addition with `p` (for `patch`)
Then add in either individual files like `1,3` or a range of files like `1-3` (would select 1, 2, 3).

This will review each selected file individually, then go through each hunk and either stage with `y`, stage the remaining hunks with `a` (for `all`), or skip it with `n`.
