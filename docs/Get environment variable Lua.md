---
id: Get environment variable Lua
aliases:
  - Get environment variable Lua
tags: []
---

# Get environment variable Lua

Use `os.getenv(name)`:

```lua
-- /Users/whatever/home
vim.print(os.getenv("HOME"))
```

[See the Lua docs on system calls](https://www.lua.org/pil/22.2.html)
