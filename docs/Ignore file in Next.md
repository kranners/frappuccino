---
id: Ignore file in Next
date: "09 April, 2025"
---

# Ignore file in Next

There is no option to just exclude files from the build in [[NextJS]].
You need to either:
1. Exclude it from the Webpack build in the underlying [[Webpack]] settings in Next OR
2. [[Exclude files from compilation TypeScript]] IF using [[TypeScript]]

See [Configuration: next.config.js Options | Next.js](https://nextjs.org/docs/pages/api-reference/config/next-config-js)
See [next.config.js Options: webpack | Next.js](https://nextjs.org/docs/pages/api-reference/config/next-config-js/webpack)
