---
tags: typescript, javascript, programming
---

TypeScript is a strongly-typed (questionably) superset of [[JavaScript]].

### Related pages

```query
tag:typescript -file:TypeScript
```

### Initialising a TypeScript project

This setup will use [[npm]], although you could just as easily use [[yarn]].

```shell
# Create a new project folder
mkdir project-name
cd project-name

# Set it up with Git & NPM
git init
npm init

# Install and initialise TypeScript
npm install -D typescript
npx tsc --init
```

# Configuration

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

# Usage

#### Index signatures

To define an object with a particular key/value signature, it looks like:

```ts
type Sales = {
	[key: string]: number;
}
```