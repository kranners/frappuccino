---
tags:
---

# Don't Use [Lodash](https://lodash.com/)

**TLDR:**
- Lodash functions are unnecessary. Just use [ES6 functions](Arrays#Array%20ES%20Functions).
- Lodash increases your bundle size massively, for little gain.
- Lodash functions that you do need are trivial to reimplement.

If you need backwards compatibility for your web app (really? why?) then use [a polyfill library](https://github.com/zloirock/core-js) and a [transpiler](https://babeljs.io/).

## Tiny Libraries

> **"Why should I write a function if there's just a library for it?"**
> _- Average [[JavaScript]] [Clown](https://cute.engineer/) 🤡_

The TLDR for this bit is that if you can reasonably do what a library does yourself, you should.
#### Dependencies generate work

Dependencies are debt, which constantly collects. Anyone who has spent any time in software development will be familiar with a ticket that reads something like this:

```
Upgrade from React 16 to React 18
(estimated time: 2 weeks)
```
Or
```
Upgrade some-css-in-js-library to X.X
(estimated time: 1 week)
```

Dependencies force you to play their game, and will generate work for you forever. That is, until they stop being maintained.

In a language like [[Rust]], libraries eventually complete. 
In [[JavaScript]], [libraries eventually die](https://github.com/cerebral/cerebral).

When they die, you'll start seeing tickets like

```
Migrate from some-css-in-js to yet-another-css-in-js
(estimated time: 2 week)
```

#### Dependencies could break, horrifically

And that's hardly to mention the security implications of any dependency.
This is particularly true in the world of [[npm]].

Look no further than the infamous *[leftpad incident](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code)* or the infamous *[node-ipc incident](https://www.lunasec.io/docs/blog/node-ipc-protestware/)*.
Malicious npm packages are [not even considered uncommon](https://thehackernews.com/2023/08/malicious-npm-packages-found.html).

## The point of Lodash

Before the creation of [[ECMAScript]] versions [ES2009 (ES5)](https://www.w3schools.com/js/js_es5.asp) and [ES2015 (ES6)](https://www.w3schools.com/js/js_es6.asp), Lodash made a lot of sense.

Generally, it performs two (very common) functions - iterating and type checking.
### Iterating over stuff

Imagine needing to filter some incoming data, and `.filter()` doesn't exist.

You could write:
```javascript
var fruits = [
	{ name: 'banana', price: 1.5 },
	{ name: 'apple', price: 1.0 },
	{ name: 'blueberry', price: 3 },
	{ name: 'mango', price: 2.1 },
];

var expensiveFruit = [];

// for..in and for..of do not exist yet either, those are in ES2015.
for (var i = 0; i < fruits.length; i++) {
	if (fruits[i]['price'] > 2) {
		expensiveFruit.push(fruits[i]);
	}
}

// expensiveFruit = blueberry, mango
```

But with Lodash you can use their suite of functional programming to really narrow it down:
```javascript
var _ = require('lodash');

// expensiveFruit = blueberry, mango
var expensiveFruit = filter(fruits, function(f) {
	return f['price'] > 2;
});
```
This is declarative rather than imperative and, at least personally is much easier to read.

Or consider even just mapping, you'd have to do the same thing:
```javascript
// Vanilla pre-ES2009
var fruitNames = [];
for (var i = 0; i < fruits.length; i++) {
	fruitNames.push(fruits[i]['name']);
}

// Lodash
var fruitNames = map(fruits, 'name');
```
Without any of the tools, Lodash appears like magic.

### Runtime type checking

Let's say at runtime, you want to be certain that you have been passed an [array](#Arrays), and that array has some values in it. People used to [write entire articles about that, alone](http://blog.niftysnippets.org/2010/09/say-what.html).

```javascript
function isArray(obj) {
	// This catches false, null, undefined, NaN, 0 and ""
	if (!obj) {
		return false;
	}

	// This catches string, number, true
	if (typeof obj !== 'object') {
		return false;
	}

	if (obj['length'] && obj['length'] > 0) {
		return true;
	}
}
```
There are a million other ways of doing this, none of which are particularly pretty or nice:
```javascript
function isArray(obj) {
	// You need a JavaScript degree to tell me what this means.
	// It's also not particularly performant, but whatever.
	return Object.prototype.toString.call(obj) === '[object Array]';
}
```

But enter Lodash:
```javascript
var _ = require('lodash');

function needsAnArray(arr) {
	if (_.isEmpty(arr) || !_.isArray(arr)) {
		return;
	}

	return _.map(arr, function (e) { ... });
}
```
It is *so much nicer*.

So I, of course, respect what Lodash used to bring to the table.

## Enter ECMA.

Much of what made Lodash useful has just been directly implemented into ES2009 and ES2015.

Modern JS reads like this:
```javascript
const needsAnArray = (arr) => {
	// All the type checking we need.
	if (!Array.isArray(arr)) return false;

	return arr.map((e) => { ... });
}
```

Need the fruit names like before?
```javascript
// In my opinion, this reads a lot less magically than Lodash anyway.
const fruitNames = fruits.map((f) => f['name']);
```

Need to filter it to the expensive ones?
```javascript
const expensiveFruits = fruits.filter((f) => f['price'] > 2);
```

Want to sum their prices?
```javascript
const priceSum = fruits.reduce((acc, f) => acc + f['price'], 0);
```

The advent of arrow functions, new type checking, and the new functional iterating methods made Lodash for 99% of use cases obsolete.

## But so what?

> "OK. I get it. You don't *need* Lodash anymore. But what if you want it? What's the harm (other than those already listed above)? It's **fine**."

Let's check out some bundle sizes.

[[React]] - which is a career-defining library for many folks (myself included), bundles down to [6.4kB](https://bundlephobia.com/package/react@18.2.0). That is insanely impressive given the sheer amount of functionality that it adds.

Lodash - [69.8kB](https://bundlephobia.com/package/lodash@4.17.21). Why?

> "OK. But *I* import Lodash correctly, so the bundle size is way smaller."

There are several ways you can export modules and import them later on.
There are [default exports](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#using_the_default_export), and [named exports](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#using_named_exports).

```javascript
// This is a default export.
import _ from 'lodash';
_.sortBy(fruits, 'price');

// This is a named export.
import { sortBy } from 'lodash';
sortBy(fruits, 'price');
```

So, you'd want a named export to get the lowest size, right?

...right?...

Turns out, this is yet another JS footgun 😎. The actual 'correct' method looks like this:
```javascript
// A default export FROM the specific module.
import sortBy from 'lodash/sortBy';
...
```

In my career so far, I have seen about 5 or 6 seperate, distinct, large, mature commercial JavaScript codebases. **NONE** **of them have imported Lodash correctly.**

(Most codebases seem to have `import _ from 'lodash';` down to muscle memory.)

