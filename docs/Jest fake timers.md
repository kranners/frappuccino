---
id: Jest fake timers
aliases:
  - Jest fake timers
tags: []
---

# Jest fake timers

Use to tell Jest to mock out all time & date related APIs.

[See `useFakeTimers()` in the Jest documentation for more](https://jestjs.io/docs/jest-object#jestusefaketimersfaketimersconfig)

```js
// Begin the fakery
jest.useFakeTimers();
```

Set the time to something specific by providing a `now` option:
```js
jest.useFakeTimers({
    now: new Date(2024, 11, 8),
})
```

Cancel this with `useRealTimers()`:
```js
afterEach(() => {
    // Restore the timers back to normal 🕗
    jest.useRealTimers();
})
```

[See `useRealTimers()` in the Jest documentation for more](https://jestjs.io/docs/jest-object#jestuserealtimers)

