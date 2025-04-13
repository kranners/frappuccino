---
id: Stylelint
date: "04 April, 2025"
---

# Stylelint

[Stylelint is a CSS linting tool](https://stylelint.io/).

Probably worth checking to see first if there is a specific [[ESLint]] tool to achieve what you want with this. [Here's an example for @emotion](https://emotion.sh/docs/@emotion/eslint-plugin)

## Getting started

Initialise your stylelint config with:
```shell
npm init stylelint
```

Optionally, you may want to rename the default JSON config to MJS:
```stylelint.config.mjs
// This is the default config, but in JS.
const config = {
  extends: ['stylelint-config-standard'],
};

export default config;
```

See [Getting started | Stylelint](https://stylelint.io/user-guide/get-started)

After this, add `.stylelintcache/` to your `.gitignore`.

