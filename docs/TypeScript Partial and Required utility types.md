---
id: TypeScript Partial and Required utility types
date: "13 March, 2025"
tags:
- nullable
- 
---

# TypeScript Partial and Required utility types

`Partial<T>` constructs a type where all properties are optional.
`Required<T>` constructs a type where all properties are required or non-optional.

`Partial`:
```typescript
type Cart = {
    items: Item[];
    total: number;
    startedAt: Date;
}

const updateCart = (cart: Cart, newFields: Partial<Cart>) => {
    return { ...cart, ...newFields };
}
```

`Required`:
```typescript
type ProfileProps = {
    firstName?: string;
    lastName?: string;
    iconSrc?: string;
}

const Profile = ({ ... }: ProfileProps) => {
    if (!firstName || !lastName || !iconSrc) {
        return <FallbackProfile ... />
    }
}

const FullProfile = ({ ... }: Required<ProfileProps>) => {
    // Can now safely assume firstName, lastName, iconSrc are not undefined
    return (
        ...
    );
}
```

See [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)

See [Required](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)

