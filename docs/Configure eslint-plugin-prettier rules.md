---
id: Configure eslint-plugin-prettier rules
date: "26 November, 2025"
---

# Configure eslint-plugin-prettier rules

If using [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier), you can configure internal Prettier rules inside of your [[ESLint]] config like:

```ts
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier/recommended";

const eslintConfig = defineConfig([
  prettier,
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
]);

export default eslintConfig;
```

[See Options in the eslint-plugin-prettier README](https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#options)

