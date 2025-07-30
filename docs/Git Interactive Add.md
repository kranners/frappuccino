---
id: Git Interactive Add
aliases: []
tags:
  - git
  - operations
  - staging
---

# Git Interactive Add

> "Help! I've done a bunch of work without committing, but I want my commit history to stay clean!"

An _interactive add_ is the CLI equivalent of a GUI git client like [GitKraken](https://www.gitkraken.com/).

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