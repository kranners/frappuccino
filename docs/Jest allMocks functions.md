---
id: Jest allMocks functions
date: "11 November, 2024"
---

# Jest allMocks functions

There are three `jest.*AllMocks()` functions which correspond to three
`mockFn.mock*()` functions, but call them on all mock objects.

All three can be configured to automatically run before each test case.

### `mockClear()` and `clearAllMocks()`

These clear the `mock.calls`, `mock.instances`, `mock.contexts` and `mock.results` properties.

So you keep your mock implementation intact, only clearing any saved calls and results.

[See `jest.clearAllMocks()`](https://jestjs.io/docs/jest-object#jestclearallmocks) and [`mockFn.mockClear()`](https://jestjs.io/docs/mock-function-api#mockfnmockclear).

[For configuration, see the clearMocks option.](https://jestjs.io/docs/configuration#clearmocks-boolean)

### `mockReset()` and `resetAllMocks()`

Does everything that `mockClear()` does, and also replaces the mock implementation with an empty function.

That empty function will take in any args, and return `undefined`.

[See `jest.resetAllMocks()`](https://jestjs.io/docs/jest-object#jestresetallmocks) and [`mockFn.mockReset()`](https://jestjs.io/docs/mock-function-api#mockfnmockreset)

[For configuration, see the resetMocks option.](https://jestjs.io/docs/configuration#resetmocks-boolean)

### `mockRestore()` and `restoreAllMocks()`

Does everything that `mockReset()` does, and also restores the original non-mocked implementation.

:::warning
Under the hood, this is done by calling `.restore()` on every replaced property.
Meaning, if you replaced properties manually [with `jest.replaceProperty()`](https://jestjs.io/docs/jest-object#jestreplacepropertyobject-propertykey-value) then you will need to restore those manually.

So this will work perfectly for anything made with `jest.spyOn()`, but not for manually replaced properties or `jest.fn()`s.
:::

[See `jest.restoreAllMocks()`](https://jestjs.io/docs/jest-object#jestrestoreallmocks) and [`mockFn.mockRestore()`](https://jestjs.io/docs/mock-function-api#mockfnmockrestore).

[For configuration, see the restoreMocks option.](https://jestjs.io/docs/configuration#restoremocks-boolean)

