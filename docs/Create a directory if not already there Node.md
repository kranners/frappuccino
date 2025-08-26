---
id: Create a directory if not already there Node
date: "09 August, 2025"
---

# Create a directory if not already there Node

Use `mkdirSync` and `existsSync` from Node `fs` module.

```typescript
import { mkdirSync, existsSync } from "fs";

const path = "/path/to/directory/deeply/nested";

if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
}
```

[See existsSync](https://nodejs.org/api/fs.html#fsexistssyncpath)
[See mkdirSync](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options)
