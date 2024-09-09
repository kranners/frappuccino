---
id: 1725854798-ZNAU
aliases:
  - Jest mock types
tags: []
---

# Jest mock types

For working with Jest in TS environments.

[Main one is `jest.Mock<T>`](https://jestjs.io/docs/mock-function-api#jestmockt), which is the generic type of any mock function (one from `jest.fn()`).

[Then there's `jest.Mocked<Source>` which is for anything that has been `jest.mock()`ed.](https://jestjs.io/docs/mock-function-api#jestmockedsource)

```ts
// typeof jest.Mock<any, any>
const mockSomeFunction = jest.fn();
```

