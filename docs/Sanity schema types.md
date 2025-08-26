---
id: Sanity schema types
date: "01 August, 2025"
---

# Sanity schema types

A type is a kind of a thing which is manageable in a Sanity instance.

[Types are defined as part of your Sanity schema.](https://www.sanity.io/docs/studio/schema-types)

And your schema is part of an [overall Sanity config.](https://www.sanity.io/docs/studio/configuration)

Typically, you'll define a `schemaTypes` constant somewhere in a different module.

Then import that into your Sanity config.

```typescript
// schemaTypes.ts
export const schemaTypes = [
  {
    title: "Example Document",
    name: "exampleDocument",
    type: "document",
    fields: [
      {
        title: "Greeting",
        name: "greeting",
        type: "string"
      }
    ]
  }  
]

// sanity.config.ts
import { defineConfig } from "sanity";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "My Cool Website",
  /* ... */
  schema: {
    types: schemaTypes
  }
});
```
_Yoinked from the Sanity documentation_

This defines an "Example Document" type, with a single field for Greeting, which is a string.

Note that here, "string" is a type, "document" is a type, and "exampleDocument" is also a type.

## Builtin types

[There are lots of builtin types.](https://www.sanity.io/docs/studio/schema-types#types-8137822cbda1)

Like String, for basic strings, Boolean, Number, Image, Date, etc.

There are more complicated or generic types like Array or Block (which is rich WSIWYG text).

## Custom types

See [[Sanity custom types]].

