---
id: Lodash padStart
aliases:
  - Lodash padStart
tags: []
---

# Lodash padStart

Pads a given string with a given characters OR spaces if none are provided.

```js
// '  apple'
_.padStart("apple", 7);

// 'banana'
_.padStart("banana", 6);

// 'xyx'
_.padStart("", 3, "xy");
```

[See Lodash documentation](https://lodash.com/docs/4.17.15#padStart)

:::tip
[`lodash/fp`s `padStart` does NOT support the third argument](https://github.com/lodash/lodash/issues/1917). For that use `padCharsStart()`.
:::

[See this example usage from `lodash/fp` documentation.](https://github.com/lodash/lodash/wiki/FP-Guide/64ab7a694d3079bbb997f292fbc82fd52b167ca0#fixed-arity)
