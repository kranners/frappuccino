---
id: Get home directory Node
date: "15 April, 2025"
---

# Get home directory Node

Prefer to use the `os` function `homedir()` instead of something like `process.env.HOME`.

```typescript
import { join } from "path";
import { homedir } from "os";

// process.env.HOME could be undefined! This will throw a compiler error.
const configDir = join(process.env.HOME, ".config");

// ~ doesn't work as an alias on Windows! This isn't cross-platform.
const configDir = join(process.env.HOME ?? "~", ".config");

// This is just right 😼
const configDir = join(homedir(), ".config");
```

See [the Node documentation](https://nodejs.org/api/os.html#os_os_homedir)
