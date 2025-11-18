---
id: Adding a new package in pnpm
date: "15 October, 2025"
---

# Adding a new package in pnpm

A package in `pnpm` is just a folder added to your `pnpm-workspace.yaml` that
contains a package.json.

Given a `pnpm-workspace.yaml` like:
```yaml
packages:
  - "packages/*"
```

Then you could make a new package in your workspace like:
```shell
mkdir -p packages/my-new-package

cd packages/my-new-package

pnpm init
```

Then edit your package.json as usual.
