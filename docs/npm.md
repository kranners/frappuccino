---
tags: npm, node, package, programming, javascript, typescript
---

# npm

[npm](https://www.npmjs.com/) is the ubiquitous package manager for [[Node]].

### Using a private registry

Access tokens and credentials are stored in the `.npmrc` file.
The `.npmrc` file could be per package, per user under `~/.npmrc` or *globally*, under `/etc/.npmrc`.

These follow this format:
```shell
@NAMESPACE:<key>=<value>
```

For example, your `.npmrc` could contain something which looks like:
```shell
# This has no namespace, and just sets the registry for everything.
registry=https://npm.pkg.github.com

# You can expand environment variables.
npm.pkg.github.com/:_authToken=${GITHUB_OAUTH_TOKEN}
```

**It's best practice** to not include raw tokens in a project file, and to either move them into a user-scoped `.npmrc`, or to put them into environment variables.
