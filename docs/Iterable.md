---
tags: iterable, javascript, typescript, arrays
---

[Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#built-in_iterables) are a set of protocols (like [[Interfaces]]) to be implemented by a [[Prototype]].

## Iterable

An Iterable is something which can be iterated over. There are a few [built-in iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#built-in_iterables) such as [[Arrays]], [[Strings]], and [[Sets]].

An [[Object]] is **not** an iterable.

```javascript
const name = "Jeffrey";

for (const char of name) {
	// "J" "e" "f" "f" "r" "e" "y"
	console.log(char);
};

// [ "J", "e", ..., "y" ]
const chars = [...name];
```

## `for...of` vs `for...in`

`for...of` iterates over items in an [iterable](#Iterable).
`for...in` enumerates over *properties* in an [[Object]].

Think of `for...in` as an alias for `for...of iterable.keys()`

```javascript
const numbers = [ 1, 2, 3, 4 ];
for (const num of numbers) { /* 1, 2, 3, 4 */ };
for (const index in numbers) { /* 0, 1, 2, 3 */ };

const numberMap = { one: 1, two: 2, three: 3, four: 4 };
for (const num in numberMap) {
	// "one", "two", "three", "four"
};
```
