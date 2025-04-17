---
id: Jest mocking a module without a ReferenceError
date: "15 April, 2025"
---

# Jest mocking a module without a ReferenceError

Something like this will not work, citing that you don't have access to `mockFn` before it's initialized:
```typescript
const mockFn = jest.fn(() => JSON.stringify({ config: "totally-valid" }));

jest.mock("fs", () => ({
    // 💥 ReferenceError: Cannot access before initialization 💥
    readFileSync: mockFn,
}));

it("attempts to load the correct file", () => {
    readConfig();
    expect(mockFn).toBeCalledWith("config.json");
});
```

Instead you need to import the actual thing as though it was not mocked:
```typescript
import { readFileSync } from "fs";

jest.mock("fs", () => ({
    readFileSync: jest.fn(() => JSON.stringify({ config: "totally-valid" })),
}));

it("attempts to load the correct file", () => {
    readConfig();

    // Do your expect()s on the mocked module itself:
    expect(readFileSync).toBeCalledWith("config.json");
});
```

See [Mock using module factory parameter](https://jestjs.io/docs/es6-class-mocks#mock-using-module-factory-parameter)
