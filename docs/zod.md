---
tags: zod, typescript, javascript, static, types, typing, schema
---

[zod](https://zod.dev/) is a schema validation library for TypeScript which provides type safety for incoming objects.

# Basic Usage

```typescript
import { z } from "zod";

const User = z.object({
  name: z.string(),
  age: z.number(),
});

type User = z.infer<typeof User>;

User.parse(valid); // { success: true, data: ... }

// This throws an error!
User.parse(invalid); // { success: false, error: ZodError }

// This does not throw an error :)
User.safeParse(invalid); // { success: false, error: ZodError }
```

## Records

The `Record` [[TypeScript]] [equivalent here is `z.record()`](https://zod.dev/?id=records)
```ts
const UserStore = z.record(z.string(), User);
type UserStore = z.infer<typeof UserStore>;
// => Record<string, { name: string }>
```

# Type Coercion and Transformation

Coercion is the method of passing a given value through JS's native constructor for that particular type before doing Zod parsing as normal.

All primitive types (`string`, `number`, `boolean`, `bigint`, `date`) support coercion.
For non-primitive types, see below.

```typescript
const Age = z.coerce.number();

Age.parse("55"); // 55
Age.parse("abcd"); // { success: false, error: ZodError }
```

For explicit type transformation, use the `.transform()` method.
:::tip
This will transform the data _after_ it has been validated.\*\*
:::

```typescript
const Age = z.string().min(1).max(3).transform(Number);

Age.parse("1"); // 1
Age.parse("1111"); // { ..., code: "too_big", max: 3 }
```

For type transformation _before_ validation, use the `.preprocess()` method.
:::tip
For any primitive type, coercion is the preferred method.\*\*
:::

```typescript
const NumberList = z.preprocess(
  (val: string) => input.split(",").map(Number),
  z.number().array()
);

NumberList.parse("1,2,3,4"); // [ 1, 2, 3, 4 ]
```

# Error Handling

Errors are handled in Zod through the `ZodError` type.

When using `.parse()`, these errors will be returned **AND** thrown.
When using `.safeParse()`, these errors will only be returned.

To raise a custom error, you need to use the `ZodError` constructor. This is made up of an array of `ZodIssue`s. Issues contain a `code` of `"custom"`, a message describing the issue, and a path of where the issue originated.

```ts
const FirstName = z.string().max(50);
type FirstName = z.infer<typeof FirstName>;

const parseFirstName = (input: unknown): FirstName => {
  if (input === "Aaron") {
    throw new ZodError([
      {
        code: "custom",
        message: "My name is TAKEN!",
        path: [],
      },
    ]);
  }

  return FirstName.parse(input);
};
```

# Types

### Empty types

```ts
z.undefined();
z.null();

z.void(); // Accepts undefined.
```

### Enums

Zod provides both Zod-native and [[TypeScript]]-native enums.

Inferring a `z.enum` will output a tuple of strings type.

```typescript
const FruitEnum = z.enum(["Banana", "Apple", "Mango"]);

// 'Banana' | 'Apple' | 'Mango'
type Fruit = z.infer<typeof FruitEnum>;
```

Alternatively, you can define an `as const` array of possible values.

```ts
// Without the 'as const' this would not be allowed,
// since zod cannot infer the type at compile time.
const FRUITS = ["Banana", "Apple", "Mango"] as const;

const FruitEnum = z.enum(FRUITS);
type Fruit = z.infer<typeof FruitEnum>;
```

You can use native enums, but you rarely should.

### Unions

For values that could be one of a few things, Zod provides union (OR) types.

```typescript
const NutEnum = z.enum(["Macadamia", "Almond", "Chestnut"]);

const Food = z.union([FruitEnum, NutEnum]);
```

### Tuples

A tuple in Zod is defined as an array of fixed-length with elements of specific types.

```ts
const SaleRecord = z.tuple([
  z.string(), // Item sold
  z.number(), // Price sold for
  z.string().datetime(), // Time sale was made
]);

type Sale = z.infer<typeof SaleRecord>;
```

### Arrays

An array in Zod is defined as either `z.type().array()` or `z.array(z.type())`.

For an optional array vs array of optional values, ordering matters.

```typescript
// (string | undefined)[]
const optionalStringArray = z.string().optional().array();

// string[] | undefined
const stringArrayOrOptional = z.string().array().optional();
```
