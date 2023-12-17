---
tags: arrays, javascript, typescript, iterating, programming, reduce, prototype
---

# Arrays

Arrays are the typical way to manage groups of values in [[JavaScript]].

# Accessing arrays

## Get the last element

To get the last element of an array, use `.slice(-1)`.

```javascript
const stuff = [1, 2, 3, 4];

// 4
stuff.slice(-1);
```

# Adding stuff to Arrays

## Join arrays together

Generally there are a few accepted ways to copy multiple arrays into one.
These being `Array.prototype.concat()` and the [[Spread Operator]].

```javascript
const nothing = null;
const unknowable = undefined;
const nothings = [];

const things = ['a', 'b', 'c'];

// ['a', 'b', 'c', null, undefined]
Array.prototype.concat(things, nothings, nothing, unknowable);

// Uncaught TypeError: null is not iterable
[ ...things, ...nothing ];

// ['a', 'b', 'c']
[ ...things, ...( nothing ?? [] )];
```

## Conditionally add an item

You could do this in a couple ways, considering that `const` arrays are technically not really constants.

```javascript
const another = 'z';
const condition = true;

// ['a', 'b', 'c', 'z']
const things = [
	'a', 'b', 'c',
	... condition ? [another] : [],
];
```

The [[Spread Operator]] into a ternary operator is one of the more accepted ways of doing this.
If that's too cryptic, you can also just use [Array.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push).

```javascript
const another = 'z';
const condition = true;

const things = ['a', 'b', 'c'];

if (condition) {
	things.push(another);
}
```

# Array ES5 Functions

## Array.prototype.reduce()

#### Syntax

```js
Array.prototype.reduce(callback);
Array.prototype.reduce(callback, initial);
```

#### Typing

If using a reducer function in [[TypeScript]], it's important to explicitly type the reducer. Otherwise, the compiler will assume you are returning an item of the same type as the given array.

```typescript
const numbers: number[] = [0, 1, 2, 3, 4];

const joined: string = numbers.reduce<string>(
	(acc: string, current: number) => {
		return `${acc}${String(current)}`;
	}, ''
);
```

#### Examples

To sum an array of numbers:

```js
const numbers = [0, 1, 2, 3, 4];

const sum = numbers.reduce((acc, current) => acc + current, 0);
```

To perform a group by operation with a sum:

```js
const sales = [
	{ fruit: 'banana', price: 0.5 },
	{ fruit: 'apple', price : 1 },
	{ fruit: 'banana', price: 1.5 },
];

const saleByFruit = sales.reduce((acc, sale) => {
	// Get the existing total from the accumulator.
	const fruitTotal = acc[sale.fruit] ?? 0;

	// Set the new value to the new sum.
	acc[sale.fruit] = fruitValue + sale.price;
}, {});

// Equivalent to:
{
	banana: 1.5,
	apple: 1,
}
```

To perform a group by operation, that concats things into a list:

```js
const sales = [
	{ fruit: 'banana', price: 0.5 },
	{ fruit: 'apple', price : 1 },
	{ fruit: 'banana', price: 1.5 },
];

const salesByFruit = sales.reduce((acc, { fruit, price }) => {
	const existingSales = acc[fruit] ?? [];

	return {
		...acc,
		[ fruit ]: [ ...existingSales, price ]
	};
}, {});

// Equivalent to: 
{
	banana: [ 0.5, 1.5 ],
	apple: [ 1 ],
}
```

## Array.prototype.sort()

**NOTE:** Sorting is a bit of a strange one, as `array.sort()` edits the array *in place*.

The rest of this section will be for `Array.prototype.toSorted()` instead, as that is the modern copying version.

#### Compatibility

There should be no issue using `toSorted()` in a browser, however your [[Node]] (and consequently [[Jest]] versions) may struggle.

`toSorted()` is supported as of Node v20.0.0, which was released 18th April 2023.

If your Node version is not supported, you can use this alternative syntax:
```js
// Node >= 20.0.0
const unsorted = getRandomStuff();
const sorted = unsorted.toSorted(mySortingFunction);

// Node < 20.0.0
const unsorted = getRandomStuff();
const sorted = [...unsorted].sort(mySortingFunction);
```

[*See the MDN official docs for more info on this.*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted#browser_compatibility)

**NOTE:** [As of Typescript 5.2, there are definitions for the copying array methods.](https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#copying-array-methods)

#### Syntax

```js
Array.prototype.toSorted();
Array.prototype.toSorted(compare);
Array.prototype.toSorted((given, other) => { ... });
Array.prototype.toSorted((a, b) => { ... });
```

#### Default behaviour

If a sort function is not specified, it will default to converting all values into strings, and sorting by UTF code order.

All `undefined`s are sorted to the back, always.

```js
const fruits = ['banana', 'mango', undefined, 'apple'];


// ['apple', 'banana', 'mango', undefined];
const sortedFruits = fruits.toSorted();
```

#### Compare function

Compare functions take in two arguments of the list's type, and return a number. The behaviour of the sort changes based on what this number is.

| `compareFn(a, b)` return value | sort order                         |
| ------------------------------ | ---------------------------------- |
| > 0                            | sort `a` after `b`, e.g. `[b, a]`  |
| < 0                            | sort `a` before `b`, e.g. `[a, b]` |
| === 0                          | keep original order of `a` and `b` |

#### Example

Sort a list of numbers.

```javascript
const costs = [1, 2, 11, 5, 55, 6, 12];

// a > b, then b - a is negative, and thus will be sorted to [b, a]
const descendingCosts = costs.toSorted((a, b) => b - a);
const ascendingCosts = costs.toSorted((a, b) => a - b);

// Recall that the default functionality is to sort alphabetically.
// [ 1, 11, 12, 2, 5, 55, 6 ]
const costs.toSorted();
```

## Array.prototype.filter()

#### Syntax

```js
Array.prototype.filter(boolFn);
```

#### Examples

To filter by an array of objects by a given key condition:

```javascript
const users = [
	{ name: 'Dave', admin: false },
	{ name: 'Blake', admin: true },
	{ name: 'Trae', admin: false },
	{ name: 'Dayna', admin: true },
];

const admins = users.filter((user) => user.admin);

// Note that this won't work with lowercase users.
// For that you'd need user.name.toLowerCase().startsWith('d');
const usersWithD = users.filter((user) => user.name.startsWith('D'));
```

## Array of numbers, `range` equivalent

To get an equivalent of Python's

```python
for index in range(0, 10):
	doStuff(index)
```

In JavaScript, it'd look like

```javascript
[...Array(10).keys()].map((index) => {
	doStuff(index);
})

// Or it can look like this, it's more terse but some linters don't like it.
[...Array(10)].map((_, index)) => {
	doStuff(index);
});
```

# Pitfalls

### `toStuff()` methods

Modern [[JavaScript]] provides methods for creating *new* arrays with changes, instead of updating old arrays in place.

In many environments, like in [[Leetcode]], these may just not be present.
To get around this, generally you'll want to make a copy first, then perform the older version of the function.

```javascript
const letters = [ 'a', 'b', 'c' ];

// .toReversed() is not a function.
const reversed = letters.toReversed();

// [ 'c', 'b', 'a' ]
const reversed = [...letters].reverse();
```

### Use `Math` functions on an array

To use a `Math` function like `Math.max()` or `Math.min()` on an array, you need to destructure it using the [[Spread Operator]] first.

```javascript
const numbers = [ 1, 2, 3 ];

// NaN
Math.min(numbers);

// 1
Math.min(...numbers)
```
