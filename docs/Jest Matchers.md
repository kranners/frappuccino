---
id: Jest Matchers
aliases:
  - Jest Matchers
tags: []
---

# Jest Matchers

For a given test like:
```js
it("returns apple", () => {
    const fruit = getFruit();

    expect(fruit).toBe("apple");
})
```

Here the `.toBe("apple")` is the _matcher_.

Some common matchers:
- `toBeUndefined`, which matches only `undefined`
- `toBeDefined`, which matches anything else
- `toBeTruthy`, `toBeFalsy`
- `toMatch`, to check strings against regular expressions
- `toContain`, checking for items in arrays

See [using matchers from the Jest documentation](https://jestjs.io/docs/using-matchers).

### Floating point errors

JS infamously uses floating point arithmatic to handle decimal numbers.
[Meaning you can often be off by fractions of fractions.](https://stackoverflow.com/questions/588004/is-floating-point-math-broken)

To avoid this, use `toBeCloseTo`. Signature of which looks like:
```
function toBeCloseTo(expected: number, actual: number, precision?: number = 2)
```

Where `precision` is the number of decimal places to use for comparision. It defaults to 2 places.

[See the Jest source for `toBeCloseTo`](https://github.com/jestjs/jest/blob/main/packages/expect/src/matchers.ts#L144)

### jest-dom

Common DOM matchers like `.toBeVisible()` or `.toBeInTheDocument()` come from the companion library [jest-dom](https://github.com/testing-library/jest-dom).

To install, install `jest-dom` to a dev dependency:
```shell
npm install -D jest-dom
```

And then add an import to your Jest setup script:
```js
import "@testing-library/jest-dom";

// Add to jest.config.[j|t]s if not there already:
setupFilesAfterEnv: ['<rootDir>/path/to/jest-setup.[j|t]s']
```

[See jest-dom on the Jest documentation](https://testing-library.com/docs/ecosystem-jest-dom/)

If you're using [[TypeScript]], you should then add the jest-dom types to your
tsconfig:
```json
{
    "compilerOptions": {
        "types": [
            /* ... any of your existing types ... */,
            "jest",
            "@testing-library/jest-dom"
        ]
    }
}
```

