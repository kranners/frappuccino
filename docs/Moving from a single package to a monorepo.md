---
id: Moving from a single package to a monorepo
date: "01 July, 2025"
---

# Moving from a single package to a monorepo

Ensure `pnpm` is installed by enabling `corepack`:
```bash
corepack enable
```

Import your existing lockfile with:
```bash
pnpm import
```

Optionally, set some config:
```bash
pnpm config set auto-install-peers true
```

Now might also be a good time to upgrade your dependencies:
```bash
pnpm upgrade
```

Double-check that everything still works (`pnpm lint`, `pnpm build`)
and delete the `npm` lockfile:
```
rm package-lock.json
```

Update any CI jobs [like semantic-release.](https://www.npmjs.com/package/semantic-release)

