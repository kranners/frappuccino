---
id: Jest describe each
date: "11 April, 2025"
---

# Jest describe each

Similar to [[jest test each]], but for `describe()` blocks.

```js
describe.each([
    {a: 1, b: 1},
    {a: 1, b: 2},
    {a: 2, b: 1},
])("math functions given $a and $b", ({a, b}) => {
    it("adds up correctly", () => {
        expect(lib.sum(a, b)).toBe(a + b);
    });

    it("subtracts correctly", () => {
        expect(lib.sub(a, b)).toBe(a - b);
    });
});
```

See [Globals · Jest](https://jestjs.io/docs/api#describeeachtablename-fn-timeout)

