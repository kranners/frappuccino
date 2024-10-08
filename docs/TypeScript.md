---
id: TypeScript
aliases: []
tags:
  - typescript,
  - javascript,
  - programming
---

# Typescript

TypeScript is a strongly-typed (questionably) superset of [[JavaScript]].

### Initialising a TypeScript project

This setup will use [[yarn]], although you could just as easily use [[npm]].

```shell
# Create a new project folder
mkdir project-name
cd project-name

# Set it up with Git & NPM
git init
npm init

# Install and initialise TypeScript
yarn add -D typescript
yarn tsc --init
```

# Configuration

:::tip
If you just want 'a good config', there are [many official recommended versions for you](https://github.com/tsconfig/bases).
:::

### Module

Sets the module (or import) system for the project.

For a TypeScript source file of:

```ts
import { pi } from "./constants";
export const tau = pi * 2;
```

The value `CommonJS` would emit:

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tau = void 0;
const constants_1 = require("./constants");
exports.tau = constants_1.pi * 2;
```

`UMD`, `AMD` and `System` would use their respective module types.

`ES2015`, `ES6`, `ES2020`, `ES2022`, `ESNext` would output:

```js
import { pi } from "./constants";
export const tau = pi * 2;
```

The exact same thing.

### Emission

By default, TypeScript will emit compiled [[JavaScript]] files to the same path from source.
So if you have `./src/math.ts`, TypeScript will emit `./src/math.js`.

To change this behaviour, use the `outDir` option to define a directory to put all emitted files into, or an `outFile` option to bundle all outputs into one.

Some examples:

```json
{
	"compilerOptions": {
		...,
		"outDir": "dist", // This would emit ./dist/math.js
		"outFile": "main.js", // This would emit ./main.js
	}
}
```

### JavaScript

By default, TypeScript will not allow [[JavaScript]] files to exist in source alongside TypeScript ones.

To allow for all JS files, the option is [`allowJs`](https://www.typescriptlang.org/tsconfig#allowJs).
To do analysis on JS files for incorrect usage, the option is [`checkJs`](https://www.typescriptlang.org/tsconfig#checkJs).

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}
```

### Type Definitions ([[Jest]], [[Node]], [[React]])

On initial TypeScript installation, any existing Jest tests may start failing like:

```
Cannot find name 'describe'. Do you need to install type definitions for a test runner?
Cannot find name 'it'. Do you need to install type definitions for a test runner?
Cannot find name 'expect'.
Cannot find name 'test'. Do you need to install type definitions for a test runner?
```

To fix, you'll need to install the requisite type definitions from `@types`.

```shell
# Some example types
yarn add -D @types/jest @types/node @types/react
```

Then add them under `compilerOptions.types`:

```json
{
  "compilerOptions": {
    "types": ["jest", "node", "react"]
  }
}
```

### Index signatures

Index signatures are used to express the shape of key/value pairs.

Like a Python `dict`:

```typescript
type Fruit = "apple" | "banana" | "orange";

type Prices = {
  [index: Fruit]: number;
};

// This is equivalent to
type Prices = Record<Fruit, number>;
```

[See index signatures in the TypeScript documentation](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)

### The `Array` type

The shorthand for `T[]` is _identical_ to `Array<T>`:

```typescript
type Basket = Fruit[];

// Is the same as
type Basket = Array<Fruit>;
```

[See the array type in the TypeScript documentation](https://www.typescriptlang.org/docs/handbook/2/objects.html#the-array-type)

### No property access on index signatures (TS #4111)

_[For more info, see the documentation page on this option](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature)_.

```text
Property X comes from an index signature, so it must be accessed with ['X'].
```

This issue comes up when doing dot-notation for accessing a property on an Object which is not explicitly defined in its type.

```typescript
type FruitName = "banana" | "apple" | "pear";
type Fruit = Record<string, string> & { name: FruitName };

const apple: Fruit = {
  name: "apple",
  price: 200,
  display: () => "Apple - USD$2.0",
};

// This type is explicitly defined in the Fruit type, so this is fine
apple.name;

// Error (ts4111): Property 'price' comes from an index signature
apple.price;
```

To disable, add to your _tsconfig.json_

```json
{
  "compilerOptions": {
    "noPropertyAccessFromIndexSignature": false
  }
}
```

### Implicit method overrides

_For more info, check out [the TS.tv page on error TS4114](https://typescript.tv/errors/#TS4114) or [the official docs on the `noImplicitOverride` config option.](https://www.typescriptlang.org/tsconfig#noImplicitOverride)_

An implicit override is something like this:

```typescript
class Base {
  method(): T {
    /* ... */
  }
}

class Extender extends Base {
  // This implicitly overrides Base.method()!
  method(): T {
    /* ... */
  }
}
```

As opposed to the same class written with an explicit override:

```typescript
class Extender extends Base {
  // Now it explicitly overrides, and all is well :)
  override method(): T {
    /* ... */
  }
}
```

Sometimes this rule can get confused when interacting with static methods, which typically do not need to be explicitly overridden. This is especially true with static async methods:

```typescript
class Base {
	static async method(): Promise<unknown> { /* ... */ };
}

class Extender extends Base {
	// These keywords are invalid together!
	// So TS4114 collides with JS syntax.
	override static async method(): Promise<unknown> { ... };
}
```

You can disable this behaviour by setting `noImplicitOverride` to `false`.

```json
{
  "compilerOptions": {
    // Behaviour disabled :)
    "noImplicitOverride": false
  }
}
```

# Usage

## Type guards

A [type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) is a TypeScript-unique function whose return type is a 'type predicate' notated as `argument is T`. However, their 'actual' return type is `boolean`.

Type guards are used as an advanced form of [type narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

```typescript
// You don't necessarily need to use 'unknown' as the argument type.
function isDuck(given: unknown): given is Duck {
	// If it quacks like a duck 🦆.
	return Boolean(given) && 'quack' in given;
}

// This could also be written as an anonymous function in the same way.
const isDuck = (given: unknown): given is Duck => {
	...
}
```

These can later be used to narrow the type of a variable at runtime.

```typescript
function attemptGetDuck(): Duck | undefined {
  // handful is unknown
  const handful: unknown = scoopFromPond();

  // The isDuck type guard is used here to early return.
  if (!isDuck(handful)) return undefined;

  // The compiler is smart enough to know that at this point,
  // handful is Duck
  return handful;
}
```

## `interface` vs `type`

:::info TLDR
`interface` has _one_ extremely niche but confusing syntactic sugar, use `type` instead.
:::

For more info, see [the TypeScript documentation on the matter](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

The `interface` and `type` keywords are extremely similar.
They are both used for defining the _shape_ of an [[Object]].

```typescript
interface Animal {
  name: string;
  weight: number;
}

type Animal = {
  name: string;
  weight: number;
};
```

They can both be extended as expected:

```typescript
// FlyingAnimal = { name: string, weight: number, wingspan: number };
interface FlyingAnimal extends Animal {
  wingspan: number;
}

// FlyingAnimal = { name: string, weight: number, wingspan: number };
type FlyingAnimal = Animal & {
  wingspan: number;
};
```

However, there is one piece of syntax that `interface` contains, which `type` does not:

```typescript
// We define the interface once...
// Fruit = { name: string };
interface Fruit {
  name: string;
}

// Then define it again!
// Fruit = { name: string, price: number };
interface Fruit {
  price: number;
}
```

After this, TypeScript recognises the _Fruit_ interface as

```typescript
{
  name: string;
  price: number;
}
```

Which is a kind of _implicit extension_.

However, using the `type` keyword:

```typescript
type Fruit = {
  name: string;
};

// Error: Duplicate identifier 'Fruit'.
type Fruit = {
  price: number;
};
```

**OPINION:** This is dumb, and confusing. Don't use this. Use `type`, and explicitly extend your types.

## Index signatures

To define an object with a particular key/value signature, it looks like:

```ts
type Sales = {
  [key: string]: number;
};
```

So to make a mapping between `Fruit`s and `Price`s, it looks like:

```typescript
type FruitPriceMapping = {
  [key: Fruit]: Price;
};

const MAPPING: FruitPriceMapping = {
  apple: { value: 25, currency: "aud" },
};
```

Alternatively, TypeScript has the [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) utility type, which you could consider more terse:

```typescript
type FruitPriceMapping = Record<Fruit, Price>;
```

## Generic functions

[Generic functions](https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics) are strongly-typed functions which take in a type parameter, which can be used in the signature of the function.

```typescript
type Maybe = unknown | undefined;

function unwrap<T extends Maybe>(maybe: T = null): unknown | null {
  return maybe;
}

function asList<T>(item: T): Array<T> {
  return [item];
}
```

`const` arrow function generics have a bit of a wonky syntax when dealing in `.tsx` files:

```tsx
// This is the most commonly accepted answer.
// The comma indicates that this is a generic type with only one argument.
const asList<T, >(item: T) => [ item ];

// This also works, but is considered more of a hack.
const asList<T extends unknown>(item: T) => [ item ];

// This ALSO works but is considered even more of a hack.
const asList<T extends {}>(item: T) => [ item ];
```

This is because the parser can't distinguish between `<T>` (as in a generic) and `<T/>` (as in a HTML tag).

## Conditional types

[A conditional type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) is a kind of [generic type](https://www.typescriptlang.org/docs/handbook/2/generics.html) which passes the generic through a condition before resolving to one of two types.

**Syntax**

```typescript
type Conditional<T> = T extends Condition ? TrueType : FalseType;
```

This happens at compile-time.

Say, we have a `Success` type which contains some data, and we want to get the type of that data at compile time.

```typescript
type Success = { success: true; data: unknown };
type Failure = { success: false; error: Error };

// Error! Type "data" cannot be used to index type T.
type SuccessData<T> = T["data"];
```

To fix this issue, you could restrict that `SuccessData` **only** takes in a `Success` object.

```typescript
// This is happy now :)
type SuccessData<T extends Success> = T["data"];

// However, if we try to use this in practice it'll end up less good.
const response: Success | Failure = goGetAnAPI();

// Error! The response object might not have a data key.
const data: SuccessData<typeof response> = response.data;
```

However you run into that last issue. No bueno.
A solution here would be to let `SuccessData` take in anything, and only unwrap if it's required.
Otherwise, default to something like `never` to indicate that its value is not to be used.

```typescript
type SuccessData<T> = T extends Success ? T["data"] : never;

// never | unknown
const data: SuccessData<typeof response>;
```

## The `infer` keyword

[The `infer` keyword](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types) is used for declaring a new inline generic type inside of another type declaration.

This is usually used for extracting types from inside of generic wrapper and conditional types.

That is a pretty meaningless statement, so here are some examples.

You could use this as an alternative for the `T["data"]` from before, to get the success data.

```typescript
type SuccessData<T> = T extends { data: infer Data } : Data : never;
```

You could use this to unwrap an array into its type.

```typescript
type ArrayType<T> = T extends Array<infer Item> : Item : T;
```

You can do the same thing to the return types of functions.

```typescript
type FunctionReturns<T> = T extends () => infer Return ? Return : void;

type StringFunction = () => string;

// Str = string
type Str = FunctionReturns<StringFunction>;
```
