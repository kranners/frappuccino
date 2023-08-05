---
tags: yarn, npm, node, typescript, javascript
---

[`yarn`](https://yarnpkg.com/) is a [[Command Line]] [[Node]] package manager alternative to `npm`.

#### Usage

```shell
# Install the dependencies
yarn

# Add a new dependency
yarn add react

# Add a new dev dependency
yarn add -D vitest

# Remove a dependency
yarn remove lodash

# Run a Node script
yarn dev
```

In yarn, unlike [[npm]], there is no equivalent of `npx`.
To run a binary from your node modules, the command is just `yarn`.

```shell
yarn vitepress build docs
```

#### Installation

Preferred installation of `yarn` is through a seperate binary called [Corepack](https://nodejs.org/dist/latest/docs/api/corepack.html). This comes with all [[Node]] versions beyond v16.10.

```shell
# Enable Corepack (Node >= v16.10)
corepack enable

# Install Corepack (Node < v16.10)
npm install -g corepack
```
