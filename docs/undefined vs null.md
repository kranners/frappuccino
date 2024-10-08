---
id: 1726203812-NPLC
aliases:
  - undefined vs null
tags: []
---

# undefined vs null

The ultimate bikeshed - `undefined` vs `null`.

TLDR for my take:

- For anyone who _does not_ subject themselves to writing JavaScript, the distinction is pretty clear and obvious.
- In JavaScript, `null` is an undesirable relic, generally acting as a less useful `undefined`.

### Colloquially / semantically

The way this is _supposed_ to work is pretty simple:

- `undefined` means _this value has not been set yet_
- `null` means _this value has been explicitly set to nothing_

That's it.

In JavaScript, generally the two are interchangable for most use-cases.

They are both:

- Considered falsy.
- Not strictly equal to eachother. That is, `null !== undefined`.
- Not strictly equal to any other primitive. That is, `typeof null !== typeof string`, etc.

#### TypeScript optional types

Optional properties are considered `T | undefined`.

```ts
type Server = {
  port?: number; // number | undefined
  name: string;
};

const server: Server = {
  // Error! null is not assignable to type number | undefined
  port: null,
  name: "haha hehe",
};
```

:::tip
This is subject to [[1725931603-TKXZ|exactOptionalPropertyTypes]].
:::

#### Object destructuring

Any key set to `undefined` will be overridden by default values when destructuring. `null` will not be.

```js
const open = ({ port = 8080 } = {}) => {
  console.log(`Opening on ${port}`);
  server.listen(port);
};

open(); // Opening on 8080
open({ port: undefined }); // Opening on 8080

open({ port: null }); // Opening on null
```

#### Variable declarations

Any unassigned variable is considered `undefined`.

```js
// undefined
let fruit;
```

For a variable to be `null`, it must be explicitly set. No implicit behaviour will set a value to `null`.

```js
// Guess there's no fruit left. 😢
const fruit = null;
```

#### `typeof`

The `typeof` any primitive is generally that primitive itself.

```js
typeof "string"; // 'string'
typeof 0; // 'number'
typeof undefined; // 'undefined'
typeof Symbol(); // 'symbol'
```

[However, `typeof null === "object"`.](https://2ality.com/2013/10/typeof-null.html)

[This is incorrect, and is considered a bug, one which is never planned to be fixed.](https://web.archive.org/web/20160331031419/http://wiki.ecmascript.org:80/doku.php?id=harmony:typeof_null)

#### Nullish coalescing

For the purposes of the [nullish coalescing operator (`??`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing), they are both interchangable.

```js
null ?? "a"; // "a"

undefined ?? "b"; // "b"

// NaN doesn't share these properties.
NaN ?? "c"; // NaN
```

For the [optional chaining operator (`?.`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining), expressions are always short-circuited to `undefined`, not `null`.

It doesn't matter if the left-hand side of the operator is `null` or `undefined`, it will short circuit to `undefined`.

```js
const store = {
  shelves: null,
};

// undefined
const fruit = store?.shelves?.fruit;
```

#### Type coersion

Strangely, `null` is considered `0` when type-converted into a number.
`undefined` is (more correctly, imho) considered `NaN`.

```js
null + 1; // 1

undefined + 1; // NaN
```
