---
id: Installing pnpm
date: "28 January, 2026"
---

# Installing pnpm

:::info
[You may need to update Corepack first.](https://github.com/nodejs/corepack/issues/612)

```shell
npm install --global corepack@latest
```
:::

[Install `pnpm` using Corepack](https://github.com/nodejs/corepack#readme):
```shell
corepack enable

# Or
corepack enable pnpm
```

Then run `pnpm` commands as usual:
```shell
pnpm install
```

Corepack will prompt you:
```shell
! Corepack is about to download https://registry.npmjs.org/pnpm/-/pnpm-10.26.2.tgz
? Do you want to continue? [Y/n] Y
```

Respond `Y` to finish installing.

[See the pnpm installation documentation](https://pnpm.io/installation)
