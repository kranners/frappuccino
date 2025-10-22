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

