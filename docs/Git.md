---
id: Git
aliases: []
tags:
  - git,
  - software,
  - programming,
  - version
  - control
---

# Git

[Git](https://git-scm.com/) is a commonly used [[Command Line]] tool for version management of code.

## Configuration

### Standalone

Git configuration uses a [[TOML]] format, and is loaded from either `~/.gitconfig` or `~/.config/git/config`.

_Sample config_

```toml
[commit]
	gpgsign = true

[push]
	autoSetupRemote = true

[user]
	email = "patchy@the.pirate"
	name = "Patchy Pirate"
	signingkey = "3321A02038BCAC34"
```

### Under [[Home Manager]]

If using [[Home Manager]], your config can be managed through _home.nix_

```nix
programs.git = {
	enable = true;

	userName = "Patchy Pirate";
	userEmail = "patchy@the.pirate";

	extraConfig = {
		push = {autoSetupRemote = true;};
		user = {signingkey = "3321A02038BCAC34";};
		commit = {gpgsign = true;};
	};
};
```

##### My `gpg` locked down!

This can happen if your machine crashes, or sometimes as part of a flake update.

The symptom is:

```shell
error: gpg failed to sign the data:
gpg: Note: database_open 1234567890 waiting for lock (held by 1234) ...
...
gpg: keydb_search failed: Operation timed out
gpg: skipped "3321A02038BCAC34": Operation timed out
[GNUPG:] INV_SGNR 0 3321A02038BCAC344
[GNUPG:] FAILURE sign 1234567890
gpg: signing failed: Operation timed out
```

The cure is:

```shell
rm -rf ~/.gnupg/*.lock
rm -rf ~/.gnupg/public-keys.d/*.lock
```

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

See [Configuration](#Configuration) for how to configure this and others in a standalone or [[Home Manager]] setup.

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
[_For more info, see the page on merge strategies._](https://git-scm.com/docs/merge-strategies)

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

#### Finding the first commit with a file

```shell
# Using the diff filter to find only the log which added stuff
git log --diff-filter=A -- path/to/file
```

#### Get all commit hashes relating to a file

```shell
# The awk at the end will ensure you only get the short commit hash
git log --oneline -- path/to/file | awk '{print $1}'
```

#### Troubleshooting with a bisect

If something broke in the past for unknown reasons, then a bisect is a great way of narrowing down causes.

A bisect is a semi-manual binary tree search for the first broken commit.
For example, given 5 commits:

1. A <- You are here
2. B
3. C
4. D <- This is the broken commit
5. E <- This is the latest known working version

The bisect would start by marking **A** as a "bad" commit, and marking **E** as a "good" commit.
Bisect would then drop you in between them:

1. A <- Marked as bad
2. B
3. C <- You are here (dropped here by bisect)
4. D <- This is the broken commit
5. E <- Marked as good

At this point you would then mark **C** as "bad", and the bisect would continue to D.

1. A <- Marked as bad
2. B <- Skipped over by bisect
3. C <- Marked as bad
4. D <- You are here
5. E <- Marked as good

You would then mark D as "bad" and would be found as the final bisect.
Performing this in the command line would look like:

```shell
# Start the bisecting process, on your HEAD commit
git bisect start

# Mark A (your commit) as bad
git bisect bad

# Mark E as good
git bisect good <commit hash>

# From here, the steps are to reproduce your failure and mark as good or bad as fit
npm test
git bisect good|bad

# Once the bisect is done, reset back. Or run this whenever things break
git bisect reset
```

##### Different names for 'good' and 'bad'

Bisect semantically looks for the _first commit with a problem_, if instead you want the _first commit with a fix_, then bisect won't look quite right out of the box.

```shell
# Start the bisect as usual
git bisect start

# Set the most recent version to be good
git bisect good HEAD

# Set the bad commit to whenever
git bisect bad PAST

> Some good revs are not ancestors of the bad rev.
> git bisect cannot work properly in this case.
> Maybe you mistook good and bad revs?
```

To help this out, you can use the `--term-new` and `--term-old` flags. Normally 'new' = 'bad' and 'old' = 'good'.

```shell
# Now we have messaging here that makes more sense
git bisect start --term-new=fixed --term-old=unfixed

git bisect fixed HEAD
git bisect unfixed PAST
```

#### Move commits to another branch

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

#### Rename an existing branch

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
```

[The Stack Overflow response has SO many upvotes.](https://stackoverflow.com/questions/6591213/how-can-i-rename-a-local-git-branch)

#### Rename an existing branch with an upstream

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

#### Delete / remove a branch

To delete locally:
```shell
git branch --delete --force bleh-bad-name
```

To remove remote:
```shell
git push origin --delete bleh-bad-name
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

#### View patch / log history for a single file

`git log` allows for `-- /path/to/file` arguments like `git checkout`.

So for a single file:
```shell
# Show me the patches, not just the commits
git log --patch -- /path/to/file
```

See [git-log documentation](https://git-scm.com/docs/git-log)

