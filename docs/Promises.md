---
tags: promises, javascript, typescript, async, asynchronous
---

# Promises

A Promise is a [[JavaScript]] object which runs asynchronously to the main thread and resolves to a given value.

Until you unwrap it in some way, a Promise is always a Promise.

## Async await

There are three rules around async/await in functions:

1. Any function that returns a Promise is an *asynchronous function*.
2. Any asynchronous function *will always return a Promise*.
3. Any asynchronous function that does not use `await` or create a Promise does not need to be asynchronous.

For example:

```js
// This is an asynchronous function, which returns Promise<void>.
const sleep = (millis) => new Promise((res) => setTimeout(res, millis));

// This is an asynchronous function, which returns Promise<number>.
const getNumberApi = async () => {
	const result = await fetch('https://get-a-number.com');
	return result.data;
}
```

The `await` keyword is used to halt execution until the Promise concludes, making it like a synchronous version of the same thing. It can *only be used in asynchronous functions*.

## Top-level await

Outside of the browser, runtimes like [[Node]] don't support just using asynchronous functions in the main runtime.

Occasionally, there are [[Node]] options for supporting future versions which include top-level await.

#### Main async function

To get around this, the usual solution for [[JavaScript]] users is to define a `main()` function, and execute that as a Promise chain.

```javascript
async function main() {
	await sleep(5000);
}

main().catch(console.error);
```

#### IIAFE

IIAFE (Immediately Invoked Async Function Expression) is a play on the [[IIFE]] idiom and can be used to wrap an existing top-level async function to express and invoke the main function at the same time.

Like this would be in a `main.js` file:

```js
(async () => {
	await sleep(5000);
})();
```

#### TypeScript 3.8

[[TypeScript]] version 3.8 introduced support for [its own top-level await](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#top-level-await).
The [original pull request can be found here](https://github.com/microsoft/TypeScript/pull/35813).

There are a few caveats:

1. The [target compiler option](https://www.typescriptlang.org/tsconfig#target) must be set to `es2017` or above.
2. The `module` compiler option must be set to `esnext` or `system`.

#### Node 13.3+

[[Node]] version 13.3 and beyond have support for top-level await according to [this issue post](https://bugs.chromium.org/p/v8/issues/detail?id=9344).

It can be enabled by using the `--harmony-top-level-await` flag.

Within the [[Node]] [[REPL]], `await` can be used in the top-level without the `--experimental-repl-await` as of version 16.