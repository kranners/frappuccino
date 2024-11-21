---
id: Testing Library DOM debug limit
date: "21 November, 2024"
---

# Testing Library DOM debug limit

The debug limit is the max length of characters that comes up when calling `screen.debug()`

See [`screen.debug()`](https://testing-library.com/docs/dom-testing-library/api-debugging/#screendebug)

The default max length is 7000 characters, but you can set one with `DEBUG_PRINT_LIMIT`.

```shell
DEBUG_PRINT_LIMIT=20000 npm run test ...
```

See [`prettyDOM` source](https://github.com/testing-library/dom-testing-library/blob/main/src/pretty-dom.js#L48)

