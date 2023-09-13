---
tags: javascript, typescript, programming
---

# Javascript

JavaScript is a programming language typically run inside of a browser like [[Chromium]] or [[Firefox]].

More recently, there are other runtimes for JavaScript such as [[Node]].

JavaScript has a strongly-typed counterpart, developed by [[Microsoft]] called [[TypeScript]].

### Guides

For info about dealing with strings, check [[Strings]].
For info about dealing with arrays, check out [[Arrays]].

### Frameworks

Modern Frontend typically uses a combination of [[React]], [[Vue]] or [[Svelte]].

# Usage

## Argument destructuring

[Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) is a flavor of JavaScript syntax for unpacking values from [objects](#Object) and [arrays](#Arrays).

**Basic usage**
```javascript
const prices = { banana: 2.5, apple: 1.6 };
const { banana, apple } = prices;

// 2.5
console.log(banana);

const scores = [99, 70, 65];
const [ scoreOne, scoreTwo, scoreThree ] = scores;

// 70
console.log(scoreTwo);
```

**With the spread operator**
Using the spread operator here is called [a rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) or a rest element.

```javascript
const prices = { banana: 2.5, apple: 1.6, tomato: 1.9 };
const { apple, ...otherPrices } = prices;

// { banana: 2.5, tomato: 1.9 }
console.log(otherPrices);
```

**Renaming elements**
```javascript
const prices = { banana: 2.5, apple: 1.6, tomato: 1.8 };
const { apple: bestFruit } = fruit;

// 1.6
console.log(bestFruit);

// You can use this with defaults as well!
const { cucumber: coolVegetable = 1 } = fruit;

// 1 -- Because it isn't in the initial object.
console.log(coolVegetable);
```

**Destructuring arrays**
```javascript
const alphabet = [ 'a', 'b', 'c', ..., 'z' ];

// a = 'a'
const [ a, ...remaining ] = alphabet;
```

**In functions**
```javascript
const processLotsOfStuff = ({ thing, another, aThird, wow }) => {
	...
}

function processLotsOfStuff({ thing, another, aThird, ...others }) => {
	...
}

const processWithDefaults = ({ thing=null, another='hi', ...rest }) => {
	...
}
```

> *`Shorthand property assignments are valid only in destructuring patterns`*
```javascript
// This arrow function is missing its arrow, the error is not helpful :)
const test = ({ a = 1, b = 2, c = 3 }) {
	...
}
```

**Invalid usages**
```javascript
const alphabet = ['a', 'b', 'c', ..., 'z'];

// Uncaught SyntaxError: Rest element must be last element
// You can't use this to grab the last element, or any in the middle.
const [ ...first, z ] = alphabet;

// Uncaught SyntaxError: Invalid destructuring assignment target
// You can't assign a default to a rest parameter.
const [ first, ...rest = [ 'x', 'y' ] ] = alphabet;
```

## Spread vs Rest syntax

The `...` syntax in JavaScript does a couple different things. Personally this always gets referred to as the 'spread operator' but in reality it is called two things:

- ['Spread operator'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) - takes in an [[Iterable]] and 'spread's it into a function call
- 'Rest '
## Currying

[Currying](https://javascript.info/currying-partials) is effectively just a function that returns other functions.

You could think of it as a [Factory](https://refactoring.guru/design-patterns/factory-method) pattern for functions, rather than for classes.

> *"What? Why?"*
> Everyone, probably.

Let's say you want a function which makes database queries. But, you don't know the connection detail until runtime.

You could do something like this:
```javascript
function query(input) {
	const DB_ADDRESS = env.get("DB_ADDRESS");
	const DB_PORT = env.get("DB_PORT");
	...

	const connection = new DatabaseConnection(DB_ADDRESS, DB_PORT, ...);
	return connection.execute(input);
}
```
This does solve the problem, but you end up with a lot of responsibilities for this one function.

Currying would allow you to move all of this into a seperate, builder function, which then allows you to call the query much easier:
```javascript
function queryer({ DB_ADDRESS, DB_PORT, ... }) {
	// NOTE: This means we only make one connection, too! :)
	const connection = new DatabaseConnection(DB_ADDRESS, DB_PORT, ...);

	return function query(input) {
		return connection.execute(input);
	}
}

// This would be used like the following:
const query = queryer(env);

// This could then be repeated down the line:
const users = query(`SELECT * FROM Users;`);
```

Think of currying like 'configuring' a function, especially useful when you need multiple different versions of the same function:
```javascript
function info(message) {
	process.stdout.write(message + '\n');
}

// This is practically identical to the other function!
function error(message) {
	process.stderr.write(message + '\n');
}
```

This logger example could be rewritten like:
```javascript
function logger(stream) {
	return function log(message) {
		stream.write(message + '\n');
	}
}

const info = logger(process.stdout);
const error = logger(process.stderr);
```

# `var` vs `let` vs `const`

**TLDR: Use `const`. Don't use anything else. 🙏**

**`const`** defines a variable which may not be reassigned.
```javascript
const greeting = "Hello";

// Uncaught TypeError: Assignment to constant variable.
greeting = "Bonjour";
```

However, `const`s aren't truly constant, and you can still *mutate* them. Just never *reassign* them.
```javascript
const greetings = [ "Hello" ];

// [ "Hello", "Bonjour" ]
greetings.push("Bonjour");
```

**`let`** defines a variable which *explicitly* may be reassigned.
```javascript
let farewell = "Goodbye";
farewell = "Arrivederci";

// Like all variables, they may not be re-declared.
// Uncaught SyntaxError: Identifier 'farewell' has already been declared.
let farewell = "Ciao";
```

### What about `var`?

`var` was the first, and until the [release of ECMAScript 6 in June 2015](https://exploringjs.com/es6/ch_about-es6.html), was the only way to declare variables.

Here are the differences:

1. `var` **will allow re-declarations.**
```javascript
var something = "foo";

// "bar"
var something = "bar";
```

2. `var` **will create a property on the global object** (you don't want this)
```javascript
var fruit = "apple";

// "apple"
console.log(window.fruit);
```

3. `var` will **hoist**.

#### What is hoisting?

[Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) is a JavaScript funny word which means:

> "The interpreter will *declare* variables before they are *assigned* in code."

```javascript
// Here we are USING the variable BEFORE it is declared in code.
// This is undefined.
console.log(fruit);

// NaN
fruit += 2;

// "apple"
var fruit = "apple";
```

Variables assigned with `var` can leech out of their assigned scope.

```javascript
{
	var fruit = "apple";
	let something = "else";
}

// "apple"
console.log(fruit);

// Uncaught ReferenceError: something is not defined.
console.log(something);
```
