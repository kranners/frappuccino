---
id: Lodash isEmpty
aliases:
  - Lodash isEmpty
tags: []
---

# Lodash isEmpty

Returns `true` for:

- All primitives BUT `string`.
- Objects with no "_enumerable string-keyed properties_"
- Arrays with a `length` of `0`

Returns `false` for:

- Arrays or strings with a `length` of `>0`
- Objects with any string-keyed properties

```js
// true
_.isEmpty(true);

// false
_.isEmpty("hello");

// true
_.isEmpty(50);

// true
_.isEmpty(NaN);

// true
_.isEmpty(BigInt(50000000));
```

[See Lodash documentation for this](https://lodash.com/docs/4.17.15#isEmpty)
