---
id: Disable Astro dev toolbar
aliases:
  - Disable Astro dev toolbar
tags: []
---

# Disable Astro dev toolbar

To disable once, for yourself:
```shell
npx astro preferences disable devToolbar
```

To disable for the entire project, add to your config:
```js
// Appended to your astro.config.js
export default defineConfig({
    devToolbar: {
        enabled: false,
    },
});
```

See [Dev Toolbar documentation](https://docs.astro.build/en/guides/dev-toolbar/#disabling-the-dev-toolbar)

