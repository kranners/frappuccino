---
id: Regex matching JS
date: "04 December, 2024"
---

# Regex matching JS

Regular expressions are their own prototype in JS - `RegExp`.

If you just want to match substrings inside another string:
```js
// This has the global flag 'g' set to do multiple matches for a single string
const CAPITAL_LETTERS_PATTERN = /[A-Z]/g;

const fruits = "AppleBananaPomegranateOrange";

// ["A", "B", "P", "O"]
const matches = fruits.match(CAPITAL_LETTERS_PATTERN);
```

### When to use which function

[Stolen straight from MDN:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#description)
- To know if a string matches (boolean), use `.test()`
- To get a single match, use `.exec()`
- To get multiple matches, use `.match()`
- To get multiple matches using capture groups (the global flag must be set), use `.exec()` or `.matchAll()`

:::info
`.matchAll()` [doesn't only return the matches, it instead returns an iterator containing the match and several other bits of information.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll#return_value)
:::

See [String.prototype.match() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
See [RegExp.prototype.test() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
