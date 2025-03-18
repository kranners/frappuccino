---
id: ESLint report unused disables
date: "17 March, 2025"
---

# ESLint report unused disables

A boolean flag given to the [[ESLint]] CLI to tell it to throw errors for unused `// eslint-disable-line` directives.

The flag is `--report-unused-disable-directives`:
```shell
npx eslint --report-unused-disable-directives file.js
```

Output looks like:
```
/Users/me/file.js
  60:11  error  Unused eslint-disable directive (no problems were reported from 'no-unused-vars')
```

See [Command Line Interface Reference - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/use/command-line-interface#--report-unused-disable-directives)

