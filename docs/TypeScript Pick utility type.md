---
id: TypeScript Pick utility type
aliases:
  - TypeScript Pick utility type
tags: []
---

# TypeScript Pick utility type

Use to reference types from keys in other types.

```typescript
type Fruit = {
    name: string;
    price: number;
    region: "AU" | "NZ";
}

// The final type here comes out as:
// { region: "AU" | "NZ", material: ... }
type Flag = Pick<Fruit, "region"> & {
    material: "cloth" | "silk" | "papyrus";
};

// To extract multiple keys at the same time, use a union as the second type argument:
// { name: string; price: number; }
type Product = Pick<Fruit, "name" | "price">;

// To get the type, without setting the key, use an accessor on the type
// Here the type for region is "AU" | "NZ"
const getFullRegionName = (region: Fruit["region"]) => {
    if (region === "AU") {
        return "Australia";
    }

    return "New Zealand";
}
```

[See the `Pick` type from the TypeScript documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)

