---
id: Migrating to a monorepo
date: "01 July, 2025"
---

# Migrating to a monorepo

[From the Vercel Glossary:](https://vercel.com/docs/glossary#multi-package-workspace)
> Multi-package workspace | A workspace that contains multiple packages. A
> multi-package workspace contains multiple package.json files, including one
> at the workspace root for global configuration, and one in each package
> directory. The configuration for these packages is stored at the root of the
> workspace. For pnpm, this configuration is in pnpm-workspace.yaml. npm and
> Yarn use the workspaces key in package.json. This type of workspace is often
> associated with a monorepo.

Multi-packaged repositories and monorepos are not a feature unique to `pnpm` or
`yarn`, but is a feature available in every [[Node]] package manager.

Some tools work to enable certain functionality in a monorepo:
- [Turborepo aims to be a unified script runner.](https://turborepo.com/docs/getting-started/add-to-existing-repository)
- [changesets aims to be a unified release manager.](https://github.com/changesets/changesets)
- [syncpack aims to keep dependency versions consistent.](https://jamiemason.github.io/syncpack/)

## Getting started with `npm`

To start a new workspace in an existing `npm` package:
```bash
npm init -w ./packages/a
```

From there, given a package `a` and `b`, you can run any command with the `--workspace` flag:
```bash
npm run test --workspace=a
```

Or for multiple, it's `--workspace=a --workspace=b`
For all of them, it's `--workspaces`

This also goes for `install`, `uninstall`, `ci`.

[See the npm documentation](https://docs.npmjs.com/cli/v7/using-npm/workspaces#description)

