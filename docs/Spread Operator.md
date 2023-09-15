---
tags: spread operator, javascript, typescript, development
---

# Spread Operator

The [spread / rest operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (`...`) is a common, modern [[JavaScript]] syntax introduced in [[ECMAScript]] [version 6](https://exploringjs.com/es6/ch_about-es6.html).

The `...` syntax in JavaScript does a couple different things. Personally this always gets referred to as the 'spread operator' but in reality it is called two things:

- ['Spread operator'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) - takes in an [[Iterable]] and 'spread's it into a function call
- ['Rest parameters'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) - takes in an [[Iterable]], and condenses remaining elements not yet [destructured](#Destructuring) into a single element.

## Spread operator

The [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) unpacks an [[Iterable]] into positional arguments for a function.

```javascript
// This function takes in a bunch of positional arguments.
function sum(a, b, c) {
	return a + b + c;
}

const numbers = [1, 2, 3];

// 6
sum(...numbers);
```

## Destructuring

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

## Rest parameters

**NOTE:** Rest parameters can *only ever* be the last element.

**With the `...` operator**
Using the `...` operator here is called [a rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) or a rest element.

```javascript
const prices = { banana: 2.5, apple: 1.6, tomato: 1.9 };
const { apple, ...otherPrices } = prices;

// { banana: 2.5, tomato: 1.9 }
console.log(otherPrices);
```

**Renaming elements**
```javascript
const prices = { banana: 2.5, apple: 1.6, tomato: 1.8 };

// bestFruit = 1.6
const { apple: bestFruit } = fruit;

// You can use this with defaults as well!
// coolVegetable = 1
const { cucumber: coolVegetable = 1 } = fruit;
```

**Destructuring arrays**
```javascript
const alphabet = [ 'a', 'b', 'c', ..., 'z' ];

// a = 'a'
const [ a, ...remaining ] = alphabet;

// This actually works perfectly fine for strings, too, since they are iterables.
const alphabetString = 'abcdefg...z';

// a = 'a'
const [ a, ...rest ] = alphabetString;
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

