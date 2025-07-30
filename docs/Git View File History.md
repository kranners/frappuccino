---
id: Git View File History
aliases: []
tags:
  - git
  - operations
  - history
---

# Git View File History

`git log` allows for `-- /path/to/file` arguments like `git checkout`.

So for a single file:
```shell
# Show me the patches, not just the commits
git log --patch -- /path/to/file
```

See [git-log documentation](https://git-scm.com/docs/git-log) 