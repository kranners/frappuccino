---
id: Labeled statements
date: "25 March, 2025"
---

# Labeled statements

Labeled statements are to be able to specify a context to `break` or `continue` in a `for` loop.

```javascript
outer: for (let i = 0; i < 5; i++) {
    inner: for (let j = 0; j < 5; j++) {
        if (i === 1 && j === 1) {
            continue outer;
        }

        console.log({ i, j });
    }
}
```

Could be used, for example, to check items against a number of filters:
```javascript
const items = [ ... ];
const tests = [ ... ];

itemIteration: for (const item of items) {
    // This label here is unnecessary, but whatever so is this whole technique
    testIteration: for (const test of tests) {
        if (!test(item)) {
            // Skip this item if it fails any of the tests
            continue itemIteration;
        }
    }
}
```

There is pretty much no reason to ever use this, the latter example might be better written as:
```javascript
const items = [ ... ];
const tests = [ ... ];

const allTests = (item) => tests.every((test) => test(item));
const passingItems = items.filter(allTests);
```

See [Labeled statement - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label#examples)

