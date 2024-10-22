---
id: Lua destructuring a table
aliases:
  - Lua destructuring a table
tags: []
---

# Lua destructuring a table

Can be achieved using [[Lua multiple returns]].

Use the special function `unpack()`

```lua
local fruits = { "apple", "banana" }

-- "apple", "banana"
local a, b = unpack(fruits)
```

[See the Lua documentation for more info](https://www.lua.org/pil/5.1.html)
