---
id: Export module Lua
date: "02 March, 2025"
---

# Export module Lua

Exports and imports are done by returning tables from files, and then importing them with `require()`.

lib.lua:
```lua
local M = {}

M.sum = function(a, b)
    return a + b
end

return M
```

app.lua
```lua
local lib = require("lib")

-- 4
lib.sum(1, 3)
```

### huh?

There's another Lua function called `dofile(filepath)` which
- Asserts `filepath` exists
- Loads `filepath` contents
- Executes the contents _unsafely_

_Unsafely_ here means instead of erroring out early, it will bubble the error
up into a return code.

So that you can handle the error at the callsite, rather than in the file
itself.

`require()` is like `dofile()` except that it has some additional smarts to
prevent doing the work of a module multiple times.

[See Lua documentation for info about `dofile()`](https://www.lua.org/pil/8.1.html)

[See Lua documentation for info about `require()`](https://www.lua.org/pil/8.html)

