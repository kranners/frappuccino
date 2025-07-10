---
id: z.input
date: "02 July, 2025"
---

# z.input

When using [[zod]] with refinements like `.refine`, `.transform` or `.preprocess`,
there are two available types of the schema, the input and output.

`z.infer` by default uses the output type.

The output is the schema _after_ any effects.

The input is the schema _before_ any effects.

```ts
// Only apples are fruits. That's it.
const isValidFruit = (name: string) => name === "Apple";

const fruitSchema = z.object({
    name: z.string().refine(isValidFruit),
});

// { name: string; }
type FruitInput = z.input<typeof fruitSchema>;

// { name: "Apple"; }
type FruitOutput = z.infer<typeof fruitSchema>;
```

[See ZodType with ZodEffects](https://v3.zod.dev/?id=zodtype-with-zodeffects)
