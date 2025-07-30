---
id: Expect to throw
date: "17 July, 2025"
---

# Expect to throw

To check for exceptions, you'll need to both wrap the excepting function in a anonymous function, and use `toThrow`.

```js
const iThrowErrors = () => {
    throw new Error("Oh NO!");
}

it("throws errors", () => {
    // This passes
    expect(() => iThrowErrors()).toThrow():

    // This also passes!
    expect(() => iThrowErrors()).toThrow("Oh NO!"):
})
```

[See Jest `.toThrow()` expect documentation](https://jestjs.io/docs/expect#tothrowerror)

### Async functions that throw

If this is async, you'll need to chain a `.rejects` beforehand.

This makes the `expect()` return a Promise, which you'll need to `await`.

```js
const iThrowErrorsAfterAWhile = async () => {
    throw new Error("OH NO! (after a while)");
}

it("throws errors, after a while", async () => {
    await expect(() => iThrowErrorsAfterAWhile()).rejects.toThrow();
})
```

[See Jest rejects expect documentation](https://jestjs.io/docs/expect#rejects)

