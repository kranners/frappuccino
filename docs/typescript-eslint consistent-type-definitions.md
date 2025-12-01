---
id: typescript-eslint consistent-type-definitions
date: "26 November, 2025"
---

# typescript-eslint consistent-type-definitions

`consistent-type-definitions` is a rule enforced by
`@typescript-eslint/stylistic` which checks that you use `type` or `interface`
consistently in your [[TypeScript]] type definitions.

The default is that it will enforce all shape types to be `interface`s.

To change the preferred keyword or level, configure like:
```ts
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  tseslint.configs.stylistic,
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": [
        "error", // error | warn | off
        "type",  // type | interface
      ],
    },
  },
]);

export default eslintConfig;
```

[See typescript-eslint documentation](https://typescript-eslint.io/rules/consistent-type-definitions/)
