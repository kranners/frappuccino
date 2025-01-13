---
id: Farm
date: "07 January, 2025"
---

# Farm

[Farm is a web engine written in Rust](https://www.farmfe.org/)

## Cache

The option to disable the cache is `compilation.persistentCache: boolean`:
```ts
import { defineConfig } from '@farmfe/core';

export default defineConfig({
  compilation: {
    persistentCache: false,
  },
});
```

Set this value to `false` to disable the cache entirely, setting to `true` sets
a bunch of default values.

[See Using Cache from the Farm documentation](https://www.farmfe.org/docs/advanced/persistent-cache/#using-cache)

## Plugins

Farm has a system of plugins for loading things that it otherwise cannot out of the box.

For example, WASM is not supported out of the box, but [there is a WASM plugin](https://github.com/farm-fe/plugins/tree/main/rust-plugins/wasm#farmfeplugin-wasm).

To install it:
1. `npm install -D @farmfe/plugin-wasm`
2. Add to your Farm configuration file:

```ts
import { defineConfig } from '@farmfe/core';
import wasm from '@farmfe/plugin-wasm';
export default defineConfig({
  plugins: [ wasm(), ],
});
```

:::tip
Note that is just `plugins` in that config file, not `compilation.plugins`.
:::

