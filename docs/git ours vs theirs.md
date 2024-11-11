---
id: git ours vs theirs
date: "11 November, 2024"
---

# git ours vs theirs

`--ours` always refers to whichever branch _you initiated the conflict resolution on_.
`--theirs` always refers to _the target to be merged_.

To always override with your branch's changes (what you probably want):
- `git merge --strategy-option ours`
- `git rebase --strategy-option theirs`

[See the strategy-option option in the Git documentation](https://git-scm.com/docs/git-rebase#Documentation/git-rebase.txt--Xltstrategy-optiongt).

### In a `git merge`

When doing a merge commit, you are sitting on a feature branch and probably merging in a main branch.

So `--ours` is the feature branch, `--theirs` is the main branch.

### In a `git rebase`

In a rebase, you're technically sitting on a main branch and replaying commits onto it.

So `--ours` is the main branch, and `--theirs` is the feature branch.

