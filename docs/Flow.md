---
id: Flow
aliases:
  - Flow
tags: []
---

# [Flow](https://github.com/facebook/flow)

A static typechecker for JavaScript.

### Installation

[See the installation documentation](https://flow.org/en/docs/install/)

### Usage

The only weird part about using flow (it seems) is the need to mark each file before using it.
Like:

```js
// @flow
// Now you're flowin'
```

Or:

```js
/* @flow */
/* Flowing, thriving, in my lane */
```

Otherwise, usage in code is similar to TypeScript, but with a few minor syntax quirks:

```js
function foo(x: ?number): string {
  if (x) {
    return x;
  }
  return "default string";
}
```

### CLI

To check for errors:

```shell
# aliased to just flow
flow status
```
