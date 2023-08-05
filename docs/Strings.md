---
tags: javascript, typescript, js, ts, strings
---

## Removing suffix from string

To remove the end of a string from a regular string, the general solution is `String.slice`.

```js
const fruit = "apple";
fruit.slice(0, 2); // app
```

## [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)

Checks if a given string contains a given substring.

**Usage:**
```javascript
const name = "Joseph Maguire";

// true
name.includes("Joseph");

// false, as the search is case-sensitive.
name.includes("mag");

// true
name.toLowerCase().includes("mag");
```

## [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

The `replace()` method on a string replaces a given substring with a new one.
It **returns a new string** and does not mutate the old one.

```javascript
const fruit = "banana";

// "banena"
// Given a string, will only edit the first find.
fruit.replace("na", "ne");

// "banene"
// Given a global regex, will edit all.
fruit.replace(/na/g, "ne");

// "The%20Night%20Before%20Christmas"
"The Night Before Christmas".replace(/\s/g, "%20");
```

## Convert a string into an array of specified lengths

The easiest way to do this is to use the `.match()` regex function.
**NOTE: This will only work if all the groups are the same length.**

```javascript
const fruit = "apple";

// Read the pattern as 'wildcards of length either 2 or 1'.
// [ "ap", "pl", "e" ]
const bits = fruit.match(/.{2,1}/g);
```

However, if you require the lengths to be different each time, then you can use [`String.prototype.split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split).

```javascript
const fruit = "apple";

// [ "", "a", "ppl", "e", "" ]
const bits = fruit.split(/(.{1})(.{3})(.{1}))/g);
```

It may be better to be less 'super efficient' here and break things up into explicit string lengths instead.
