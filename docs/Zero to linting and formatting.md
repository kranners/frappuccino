---
id: Zero to linting and formatting
date: "25 January, 2025"
---

# Zero to linting and formatting

Start by installing ESLint:
```shell
npm install -D eslint @eslint/js typescript typescript-eslint
```

Optionally install prettier for formatting:
```shell
npm install -D eslint-plugin-prettier eslint-config-prettier
```

Optionally install jiti for having the config file in TypeScript:
```shell
npm install -D jiti
```

To install all of the above:
```shell
npm install -D eslint @eslint/js typescript typescript-eslint eslint-plugin-prettier eslint-config-prettier jiti
```

Then configure them:

_eslint.config.ts_
```typescript
import prettier from "eslint-plugin-prettier/recommended";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  prettier,
);
```

:::warning
Unconfigured ESLint will run against all valid source files it can find.

You probably have a build folder or some files to ignore, to ignore files, add
them to the flat config like:
```typescript
export default tseslint.config(
    /* ..., */
    {
        ignores: ["node_modules", "dist"],
    }
)
```
:::

See [Getting Started | typescript-eslint](https://typescript-eslint.io/getting-started/)

See [eslint-plugin-prettier - npm](https://www.npmjs.com/package/eslint-plugin-prettier#configuration-new-eslintconfigjs)

