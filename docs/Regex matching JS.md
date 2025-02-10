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

### Regular expression flags

Regular expressions are of the form:
```js
// Shorthand
const re = /pattern/flags;

// With the RegExp constructor
const re = new RegExp(pattern, flags);
```

Where `flags` is a sequence of none, one or more these flags:
- `d` Generate indices for substring matches.
- `g` Global search.
- `i` Case-insensitive search.
- `m` Makes ^ and $ match the start and end of each line instead of those of the entire string.
- `s` Allows . to match newline characters.
- `u` "Unicode"; treat a pattern as a sequence of Unicode code points.
- `v` An upgrade to the u mode with more Unicode features.
- `y` Perform a "sticky" search that matches starting at the current position in the target string.

(Yoinked directly from the MDN documentation)

Each flag also corresponds with a boolean property on the finished `RegExp` object.
For example, [`g` corresponds with `RegExp.prototype.global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global):
```js
const re = /hello-there/g;

console.log(re.global); // -> true
```

See [Advanced searching with flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#advanced_searching_with_flags)

