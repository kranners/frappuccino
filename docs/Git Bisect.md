---
id: Git Bisect
aliases: []
tags:
  - git
  - operations
  - debug
---

# Git Bisect

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

## Different names for 'good' and 'bad'

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