---
tags: turbo, monorepo, development, javascript, js, ts
---

# Turborepo

[Turborepo](https://turbo.build/repo) is a build tool made for monorepo codebases.

Follow [their guide to add it to your existing repository](https://turbo.build/repo/docs/getting-started/add-to-project#quickstart).

```shell
yarn global add turbo
```
### [Installing packages](https://turbo.build/repo/docs/handbook/package-installation)

```shell
# Add a package to a project
yarn workspace web add react
```

**NOTE:** If you're unsure of what workspaces are available, you can list them:
```shell
# Get the workspace tree
yarn workspaces info
```
