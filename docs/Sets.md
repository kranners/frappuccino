---
tags: sets, javascript, typescript, programming
---

[Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) are an alternative to [[Arrays]] for storing multiple items at once.

Sets do not allow for duplicate values.

### Basic usage

You can construct a set by just passing in any old [[Arrays]] or [[Iterable]].

```javascript
// Set { a, b, c }
const set = new Set(['a', 'b', 'c', 'a']);

// 3
set.size;
```