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
yarn init @eslint/config
```

## Configuration

### Imports and path resolution

Analysis of imports is handled by plugins such as [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) - and for [[TypeScript]] [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript).

To install for TypeScript resolution, it's
```shell
# Install both plugins, resolver-typescript is just an addon for plugin-import.
yarn add -D eslint-plugin-import eslint-import-resolver-typescript
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