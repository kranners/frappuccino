---
id: Parameters utility type TypeScript
date: "10 April, 2025"
---

# Parameters utility type TypeScript

Used to extract parameter or argument types from a function type.

```typescript
const sum = ({ a, b }: { a: number, b: number }) => {
    return a + b;
}

// [{ a: number, b: number }]
type SumArguments = Parameters<typeof sum>;

// unknown[]
type AnyArguments = Parameters<any>;
```

See [TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)
