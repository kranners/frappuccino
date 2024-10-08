---
id: Install npm packages with frozen lockfile
aliases:
  - Install npm packages with frozen lockfile
tags: []
---

# Install npm packages with frozen lockfile

Use `npm-ci` for this

```shell
# Install, but do not update the lockfile
npm ci
```

[See the npmjs documentation for more info](https://docs.npmjs.com/cli/v10/commands/npm-ci)

When installing (with `npm-install`) you can use `--omit=dev` to skip devDependencies:
```shell
npm install --omit=dev
```

[See the npmjs documentation for more info](https://docs.npmjs.com/cli/v8/commands/npm-install#omit)

