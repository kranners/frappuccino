---
id: pnpm-workspace
date: "10 July, 2025"
---

# pnpm-workspace

`pnpm-workspace.yaml` is the file defining all packages in a monorepo.

:::tip
`pnpm` refers to the _root of the repository_ as the 'workspace'.

Hence why this is called `pnpm-workspace`.

`npm` refers to _packages inside a monorepo_ as a 'workspace'.
:::

For example (yoinked from the docs):
```yaml
packages:
  # specify a package in a direct subdir of the root
  - 'my-app'
  # all packages in direct subdirs of packages/
  - 'packages/*'
  # all packages in subdirs of components/
  - 'components/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
```

[See pnpm documentation](https://pnpm.io/pnpm-workspace_yaml)
