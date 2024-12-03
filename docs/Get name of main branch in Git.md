---
id: Get name of main branch in Git
date: "03 December, 2024"
---

# Get name of main branch in Git

This will get you just the name of the main branch on origin:
```shell
$ basename "$(git symbolic-ref refs/remotes/origin/HEAD)"
main
```

`git symbolic-ref` given a single argument (in this case `refs/remotes/origin/HEAD`) will return the branch head which the symbolic ref refers to.

The HEAD of the origin sits on the main branch, whatever that is.

On its own, this outputs `refs/remotes/origin/main`.
So we use `basename` to strip all before the last `/`.

See [git-symbolic-ref Documentation](https://git-scm.com/docs/git-symbolic-ref)
See [this Stack Overflow answer](https://stackoverflow.com/questions/28666357/how-to-get-default-git-branch)
See [basename on Wikipedia](https://en.wikipedia.org/wiki/Basename)

