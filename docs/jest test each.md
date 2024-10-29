---
id: jest test each
aliases:
  - jest test each
tags: []
---

# jest test each

Used for running a matrix of tests with expected outcomes.

[Jest test.each documentation](https://jestjs.io/docs/api#testeachtablename-fn-timeout)

## Sample using positional arguments

For a function `sum`:
```js
function sum(a, b) {
    return a + b;
}
```

A test matrix with `it.each()` would look like:
```js
describe('sum', () => {
    test.each([
        [1, 1, 2],
        [1, 2, 3],
        [2, 1, 3],
    ])('sum of %i and %i should be %i', (a, b, expected) => {
        expect(a + b).toBe(expected);
    });
});
```

The test names generated would be:
- 'sum of 1 and 1 should be 2'
- 'sum of 1 and 2 should be 3'
- 'sum of 2 and 1 should be 3'

The generated names use [Node printf](https://nodejs.org/api/util.html#util_util_format_format_args), for positional arguments use:
- %p - pretty-format.
- %s- String.
- %d- Number.
- %i - Integer.
- %f - Floating point value.
- %j - JSON.
- %o - Object.
- %# - Index of the test case.
- %% - single percent sign ('%'). This does not consume an argument.

### Named arguments

Or use objects and object destructuring for named arguments:
```js
test.each([
    {a: 1, b: 1, expected: 2},
    {a: 1, b: 2, expected: 3},
    {a: 2, b: 1, expected: 3},
])('sum of $a and $b should be $expected', ({a, b, expected}) => {
    expect(a + b).toBe(expected);
});
```

