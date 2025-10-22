---
id: TypeScript interface vs type
date: "22 October, 2025"
---

# `interface` vs `type`

:::info TLDR
`interface` has _one_ extremely niche but confusing syntactic sugar, use `type` instead.
:::

For more info, see [the TypeScript documentation on the matter](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

The `interface` and `type` keywords are extremely similar.
They are both used for defining the _shape_ of an [[Object]].

```typescript
interface Animal {
  name: string;
  weight: number;
}

type Animal = {
  name: string;
  weight: number;
};
```

They can both be extended as expected:

```typescript
// FlyingAnimal = { name: string, weight: number, wingspan: number };
interface FlyingAnimal extends Animal {
  wingspan: number;
}

// FlyingAnimal = { name: string, weight: number, wingspan: number };
type FlyingAnimal = Animal & {
  wingspan: number;
};
```

However, there is one piece of syntax that `interface` contains, which `type` does not:

```typescript
// We define the interface once...
// Fruit = { name: string };
interface Fruit {
  name: string;
}

// Then define it again!
// Fruit = { name: string, price: number };
interface Fruit {
  price: number;
}
```

After this, TypeScript recognises the _Fruit_ interface as

```typescript
{
  name: string;
  price: number;
}
```

Which is a kind of _implicit extension_.

However, using the `type` keyword:

```typescript
type Fruit = {
  name: string;
};

// Error: Duplicate identifier 'Fruit'.
type Fruit = {
  price: number;
};
```

**OPINION:** This is dumb, and confusing. Don't use this. Use `type`, and explicitly extend your types.

