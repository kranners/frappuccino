---
tags: git, software, programming, version control
---

# Git

[Git](https://git-scm.com/) is a commonly used [[Command Line]] tool for version management of code.

## Setup

#### Name and email

```shell
git config --global --edit
```

Then uncomment and change the email, usually to whichever is your primary [[GitHub]] email.

#### `autoSetupRemote`

This option is for automatically setting the remote branch when pushing to a new remote.
This is useful for if you're going to be pushing to new feature branches often.

You can set this option in one command:
```shell
git config --global --add --bool push.autoSetupRemote true
```
## Usage
#### Changing a given commit from the past (time travel)

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

#### Storing credentials on MacOSX

```bash
git config --global credential.helper osxkeychain
```

#### Interactive add (`git add -i`)

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

#### "Uncommit" some committed changes

To do this, use `git reset` without either the `--soft` or `--hard` flags.

```shell
# "Uncommit" once, preserving the changes
git reset HEAD~1

> Unstaged changes after reset:
> ...
```

Or, you could destroy all your changes:
```shell
# Reset absolutely everything back to the 
git reset --hard origin
```

#### Merge and accept all incoming / existing changes

This is done using the [`-X` or `--strategy-option` flag](https://git-scm.com/docs/git-merge#Documentation/git-merge.txt--Xltoptiongt).
[*For more info, see the page on merge strategies.*](https://git-scm.com/docs/merge-strategies)

```shell
# Accept all the incoming changes for conflicts
git merge something-better -X theirs

# Accept all your changes for conflicts
git merge mine-is-cooler -X ours
```
#### Move commits to another branch

Usually this will mean moving commits away from `main` or `master` to a new branch, say `feature`.

1. Make and checkout the new branch
```shell
git checkout -b feature
```

2. Merge the commits into the new branch
```shell
git merge main
```

3. Move back to the old branch and remove the unwanted commits.
```shell
git checkout main

# If you have 3 commits, reset 3.
git reset --hard HEAD~3
```

#### Stash EVERYTHING (including untracked files)

```shell
# Stash including untracked files
git stash --include-untracked

# This is an alias for the above
git stash -u

# Stash EVERYTHING, untracked files and ignored files
# This one is potentially dangerous
# https://web.archive.org/web/20140310215100/http://blog.icefusion.co.uk:80/git-stash-can-delete-ignored-files-git-stash-u/
git stash --all
```

#### Remove all untracked files

To just remove all untracked files, folders, or ignored files it's:

```shell
# Clean untracked files.
git clean -f

# Clean untracked directories.
git clean -d

# Also clean ignored files.
git clean -f -x

# Clean everything!
git clean -fdx
```

#### `git checkout` vs `git switch`

`git switch` exists to [clarify `git checkout`.](https://stackoverflow.com/questions/57265785/whats-the-difference-between-git-switch-and-git-checkout-branch)

```shell
# Create and switch to a new branch
git checkout -b my/new-branch

# This will do the exact same thing, but maybe it looks better to you?
git switch --create my/new-branch # -c is shorthand for --create
```

#### Get a specific file from a branch

```shell
# Get a file from the master branch
git checkout master -- file.txt
```

#### Update previous commit

```shell
# Update the previous commit, without updating the commit message.
git commit --amend --no-edit

# Set 'git amend' to that previous command
git config --global alias.amend 'commit --amend --no-edit'
```

#### Split an existing branch by files

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