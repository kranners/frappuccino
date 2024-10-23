---
id: Lodash setWith
aliases:
  - Lodash setWith
tags: []
---

# Lodash setWith

Takes in an Object, a path, and an arbitrary value to set, using the given path as the key.

```js
import { setWith } from "lodash";

const user = { name: "Arn" };

// Now user is { name: "Arn", favoriteFruit: "Arnana" }
setWith(user, "favoriteFruit", "Arnana");
```

[See setWith documentation](https://lodash.com/docs/4.17.15#setWith)

:::warning
If using `lodash/fp`, this function has a custom argument order of `(d, b, c, a)`.

[See Lodash FP guide](https://github.com/lodash/lodash/wiki/FP-Guide#exceptions-to-the-rules)
:::

