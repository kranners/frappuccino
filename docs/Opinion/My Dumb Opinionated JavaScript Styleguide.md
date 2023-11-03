---
tags:
  - javascript
  - opinion
---
⚠️ **THIS IS UNFINISHED, BE WARY**⚠️ 

# [[JavaScript]] Styleguide

**Warning: Non-cited opinions coming up, I have no sources and am a bit of a goose.**

## TLDR

TLDR of the TLDR: Write everything as `const`, aspire to be fully functional.
You can write things as wacky as you like for development purposes, but just clean it up later.

- Prefer functional over object-oriented.
- Prefer 'declarative' over 'imperative'.
- Prefer verbose over unclear.
- Prefer simple and single-use over complex and generic.
- [Prefer native over dependencies.](Don't%20Use%20Lodash)
- Prefer copying over mutating.
- Prefer stateless over stateful.
- Prefer lowest scope where possible.

#### "Prefer functional over object-oriented"

**Instead of:**
```js
class Grid {
	constructor(rows, columns, empty = ' ') {
		this.grid = [...Array(rows)].fill([...Array(columns)]).fill(empty);
	}

	getAt(row, column) {
		return this.grid[row][column];
	}

	setAt(row, column, value) {
		this.grid[row][column] = value;
	}
}

const grid = new Grid(10, 10);
grid.setAt(5, 5, '@');

grid.getAt(5, 5); // '@'
```

**Do:**
```js
const grid = [...Array(rows)].fill([...Array(columns)]).fill(empty);
grid[5][5] = '@';
grid[5][5]; // '@'
```

**Because:**

Classes in JS require the usage of [the `this` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this), which is notoriously tricky to work with. It is a culmination of JS-isms that come together to form something evil.

It used to be considered a regular pattern to write statements like:
```js
// Dissuade bad spirits from entering my code 👻
// Also put a reference to the current binding into a higher scope.
var self = this;
```

Occasionally this magical ritual will also be useful for dissuading the spirits in the equally notorious `debugger` keyword.

> [Binding? What's binding?](https://developer.mozilla.org/en-US/docs/Glossary/Binding)
> *- A poor `class` user*

Now that you're working in `this`-land, now you need to care.
Folks who have worked with [[Angular]] or old-school [[React]] will be familiar with [using `Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) to change the binding of a method to suit its `this` usage.

This new scope to keep track of can be avoided entirely by avoiding classes (and the `function` keyword).

If you want to never think about binding in your life, [write all functions as arrow expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and don't use classes.
Arrow functions are completely anonymous, so `this` doesn't bind to anything at all.

#### "Prefer declarative over imperative"

---

**TANGENT**
Imperative vs declarative is silly, the distinction is usually not very clear and measuring this as a concept is questionable in merit.

---

To the best of my knowledge, declarative programming is usually defined as *"Writing in expressions **what** stuff the code is doing."*

This is opposed to imperative which is usually defined as *"Writing in statements **how** the code does stuff"*.

I would consider this code to be imperative:
```js
const products = [{ name: 'Hairbrush', price: 2.5 }, ...];

const expensiveProducts = [];

// Telling us explicitly how to step through an array
for (let productIndex = 0; productIndex <= products.length; productIndex++) {
	// Explicitly indexing that array and doing a comparison
	if (products[productIndex].price > 5) {
		// Now pushing that in.
		expensiveProducts.push(products[productIndex]);
	}
}
```

I would consider this code to be the same thing in a declarative way:
```js
const products = [{ name: 'Hairbrush', price: 2.5 }, ...];

// Defining what it means for a product to be expensive
const isExpensive = ({ price }) => price > 5;

// Filtering products to that definition
const expensiveProducts = products.filter(isExpensive);
```

**NOTE: This solution is shorter. Declarative DOES NOT mean 'shorter' or 'terse'. It often is, as a side-effect, but not necessarily.**
You can also just as easily write imperative code using [array methods](../Arrays). Usually using `forEach()`

Don't use `forEach()` either. For the same reason.

#### "Prefer verbose over unclear"

**TLDR: If choosing between a name which is long and clear, and one which is short, choose the long one.**

This generally relates to naming of things which is fundamentally hard. We all know this.
Often you'll find yourself naming something which is very specific. Naming specific things is a tug-of-war between terseness and clarity.

Fairly trivial example, but - how do you come up with a name for an event handler, which handles when a user clicks on the button to open a theme switcher modal?
```js
// Sorted in length, shorter ones should appear less clear.
function open() { }

function openModal() { } 

function openThemeSwitcherModal() { } // <-- I would choose one of these.

function handleThemeSwitcherButton() { }

// May even consider this one, if it would make things clearer.
function handleThemeSwitcherModalButtonClick() { }
```

Similarly, I'd much prefer use of whole words like `index`, `key`, `value`, `child`, etc, over a single letter like `i` or `k`.

```jsx
cards.map((c, i) => <Card key={`c${i}`} {...c} />);

// Which one looks better to you? This one is certainly longer.
cards.map((cardProps, index) => (
	<Card key={`card-${index}`} {...cardProps} />
))
```

Like all truly difficult things, the answer is never clear.
There is a point where verbosity hits [[Java]] levels and you approach the  [`InternalFrameInternalFrameTitlePaneInternalFrameTitlePaneMaximizeButtonWindowNotFocusedState`](https://github.com/zxlooong/jdk16045/blob/master/com/sun/java/swing/plaf/nimbus/InternalFrameInternalFrameTitlePaneInternalFrameTitlePaneMaximizeButtonWindowNotFocusedState.java).

#### "Prefer simple and single-use over complex and generic"

This one is [pretty much just this](http://c2.com/xp/YouArentGonnaNeedIt.html).

TLDR: Don't optimize code for *what you think it could do*, optimize it for *what it does*.

Instead of code examples, here's a little story.

I had a ticket at one point to develop a new page for a fairly generic SaaS dashboard-y product.
This required a new table to be made, there was no existing suitable `<Table />` component which matched this design, so I figured

> "*Yay! Now I get to make my own super cool, reusable table component.*"
> - Me (dumb)

I made it ridiculously complicated, it used generics and all sorts of type gymnastics to make it type-safe AND also be able to take in anything as a column type. It would run it through bespoke renderers, validators, sorters, filters, the whole nine yards.

**This new, crazy table component was used once. And never again.**

#### "Prefer native over dependencies"

I have [already text-ranted about this at length](Don't%20Use%20Lodash), so won't repeat myself here.

Basically, if you have a choice between doing something natively or doing something using a framework / library / dependency - lean towards the native solution.

**Dependencies *are* tech debt. When picking a solution, you need to weigh the cost of adding a dependency to the cost of maintaining your own solution.**

