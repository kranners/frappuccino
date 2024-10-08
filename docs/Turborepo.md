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

:::tip
If you're unsure of what workspaces are available, you can list them:
:::

```shell
# Get the workspace tree
yarn workspaces info
```

### The `.turbo` folder

[Turborepo generates a cache folder](https://turbo.build/repo/docs/core-concepts/caching) both on a project-level and on a repository-level.

Turborepo themselves recommend adding these folders to your `.gitignore`. Not doing so [they consider a pitfall](https://turbo.build/repo/docs/troubleshooting#the-turbo-directory).

```gitignore
# Ignore the Turborepo cache
.turbo/
**/.turbo/
```
