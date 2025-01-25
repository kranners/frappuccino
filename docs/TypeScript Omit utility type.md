---
id: TypeScript Omit utility type
date: "23 January, 2025"
---

# TypeScript Omit utility type

`Omit<T, O>` takes in an object type `T` and a string or string union `O` to define keys to remove from `T`.

```tsx
type Cart = {
    items: Item[];
    total: number;
    startedAt: Date;
}

// CartSnapshot = { items: Item[] };
type CartSnapshot = Omit<Cart, "total" | "startedAt">;
```

See [TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)
