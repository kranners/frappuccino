---
tags: prettier, linting, styling, formatting, typescript, javascript
---

[Prettier](https://prettier.io/) is a code formatter for [[JavaScript]] and [[TypeScript]].

## Installation

### Standalone installation

Start by installing Prettier, examples in this document will use [[yarn]].

```shell
# Install the package.
yarn add -D prettier

# Set up an empty config.
echo {} > .prettierrc.json
```

### eslint-plugin-prettier

[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#installation) is an [[ESLint]] plugin which runs Prettier as an ESLint rule.

If you already have an [[ESLint]] setup (*you probably should*) this is the recommended way of installing.
To install:

1. Install the required packages:
```shell
# Install the plugin and recommended config
npm install --save-dev eslint-plugin-prettier eslint-config-prettier

# Install prettier, if you don't have ESLint you will also need to install that.
npm install --save-dev --save-exact prettier
```

2. [Configure](https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs) the package (*see the link for more details*), by extending its recommended settings
```json
{
	"extends": [..., "plugin:prettier/recommended"]
}
```

## Usage

```shell
# Format and write inplace a single file.
yarn prettier --write <file>
```

## Configuration

### Tabs

To use spaces (`\s\s`) instead of tabs (`\t`), set `useTabs` to `false`.
You can then define the amount of spaces with `tabWidth`.