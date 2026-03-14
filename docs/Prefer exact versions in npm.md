---
id: Prefer exact versions in npm
date: "14 March, 2026"
---

# Prefer exact versions in npm

[Use the `save-exact` NPM option](https://docs.npmjs.com/cli/v11/using-npm/config#save-exact).

So, make a `.npmrc` file either in the root of your project or in your home directory.

Add to it:
```npmrc
save-exact=true
```

From here, any newly-installed dependencies will install without a range.

Any already installed dependencies will need to be manually updated.
