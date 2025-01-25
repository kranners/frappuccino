---
tags:
  - javascript
  - typescript
  - development
  - software
---

# ESLint

[ESLint](https://eslint.org/) is a static code analysis tool for [[JavaScript]] and [[TypeScript]] codebases.

## Installation

ESLint requires [[Node]] version `>=16.0.0`.

With that, you can install and configure ESLint with
```shell
npm init @eslint/config
```

### Installation with [[TypeScript]]

To install with [[TypeScript]], you'll need a few extra plugins, one for parsing and one for linting rules:
```shell
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```

## Configuration

### Imports and path resolution

Analysis of imports is handled by plugins such as [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) - and for [[TypeScript]] [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript).

To install for TypeScript resolution, it's
```shell
# Install both plugins, resolver-typescript is just an addon for plugin-import.
npm install -D eslint-plugin-import eslint-import-resolver-typescript
```

To configure, add to your ESLint configuration
```javascript
module.exports = {
	plugins: ['import'],
	"rules": {
		// turn on errors for missing imports
		"import/no-unresolved": "error"
	},
	"settings": {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"]
		},
		"import/resolver": {
			"typescript": { ... }
		},
	},
}
```
*For a full list of configuration options, [see their configuration section](https://github.com/import-js/eslint-import-resolver-typescript#configuration).*

### Reporting unused disables

By default, `eslint-disable` comments which aren't required will be a [`"warn"` severity](#Rule%20severity).

To set to `"error"` in your config:
```js
// eslint.config.js
export default [
    {
        linterOptions: {
            reportUnusedDisableDirectives: "error"
        }
    }
];
```

## Usage

### Ignoring or elevating rules ad-hoc

**A quick word:** You *should not ever* disable rules unless you *know exactly what you are doing*.

Disabling a rule is **not a fix** to a problem.

It is an **admission that you will not fix** a problem.

_**ALL**_ rule disables ought to be commented on, explaining why you will not fix the problem that the rule picks up.

##### Rule severity

A rule's severity controls how ESLint behaves when encountering it.

- `2` or `"error"` will make ESLint exit with code `1` if tripped
- `1` or `"warn"` will enable the rule, only in output logs
- `0` or `"off"` will disable the rule entirely

##### Ignoring rules for a line

```js
/* eslint-disable-next-line no-console, quotes */
console.log('gottem');
```

##### Ignoring rules in a whole file

```js
/* eslint-disable no-console */

console.log("i'm illegal :)");

/* eslint-enable no-console */
```
