---
id: TypeScript index signatures
date: "22 October, 2025"
---

## Index signatures

Index signatures are used to express the shape of key/value pairs.

```typescript
type Fruit = "apple" | "banana" | "orange";

type Prices = {
  [index: Fruit]: number;
};

// This is equivalent to
type Prices = Record<Fruit, number>;
```

[See index signatures in the TypeScript documentation](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)

So to make a mapping between `Fruit`s and `Price`s, it looks like:

```typescript
type FruitPriceMapping = {
  [key: Fruit]: Price;
};

const MAPPING: FruitPriceMapping = {
  apple: { value: 25, currency: "aud" },
  /* and others go here */
};
```

Alternatively, TypeScript has the [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) utility type, which you could consider more terse:

```typescript
type FruitPriceMapping = Record<Fruit, Price>;
```

