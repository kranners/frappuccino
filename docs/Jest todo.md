
---
id: Jest todo
date: "06 November, 2024"
---

# Jest todo

Empty Jest tests will be considered failures.

```js
// This will raise a failure!
it('TODO: write this test', () => {});
```

To instead allow the rest of the test suite to work, use `test.todo()` (or `it.todo()`)

```js
it.todo('TODO: write this test');
```

This will be highlighted separately in your test output.

:::warning
This will throw an error if you provide a callback.

```js
// This will also fail! ❌
it.todo('this will do something, i swear it', () => {})
```
:::

[See the Jest documentation on test.todo](https://jestjs.io/docs/api#testtodoname)

