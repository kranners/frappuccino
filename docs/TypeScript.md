---
tags: typescript, javascript, programming
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

**NOTE:** If you just want 'a good config', there are [many official recommended versions for you](https://github.com/tsconfig/bases).

### Module

Sets the module (or import) system for the project.

For a TypeScript source file of:
```ts
import { pi } from './constants';
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
import { pi } from './constants';
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

# Usage

## Index signatures

To define an object with a particular key/value signature, it looks like:

```ts
type Sales = {
	[key: string]: number;
}
```

So to make a mapping between `Fruit`s and `Price`s, it looks like:

```typescript
type FruitPriceMapping = {
	[key: Fruit]: Price;
}

const MAPPING: FruitPriceMapping = {
	'apple': { value: 25, currency: 'aud' },
}
```

## Generic functions

[Generic functions](https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics) are strongly-typed functions which take in a type parameter, which can be used in the signature of the function.

```typescript
type Maybe = unknown | undefined;

function unwrap<T extends Maybe>(maybe: T = null): unknown | null {
	return maybe;
}

function asList<T>(item: T): Array<T> {
	return [ item ];
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
type Success = { success: true, data: unknown };
type Failure = { success: false, error: Error };

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