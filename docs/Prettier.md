---
tags: prettier, linting, styling, formatting, typescript, javascript
---

[Prettier](https://prettier.io/) is a code formatter for [[JavaScript]] and [[TypeScript]].

## Installation

Start by installing Prettier, examples in this document will use [[yarn]].

```shell
# Install the package.
yarn add -D prettier

# Set up an empty config.
echo {} > .prettierrc.json
```

### Usage

```shell
# Format and write inplace a single file.
yarn prettier --write <file>
```

# Configuration

### Tabs

To use spaces (`\s\s`) instead of tabs (`\t`), set `useTabs` to `false`.
You can then define the amount of spaces with `tabWidth`.