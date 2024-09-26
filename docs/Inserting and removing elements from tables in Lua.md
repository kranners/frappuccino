---
id: 1727316862-ZTRV
aliases:
  - Inserting and removing elements from tables in Lua
tags: []
---

# Inserting and removing elements from tables in Lua

Use `table.insert()` and `table.remove()`.

Each take in 3 arguments:
- The table to operate on
- The index (optional, will default to the end of the table)
- The value to insert or remove

Adding a value to the start of a table:
```lua
local cart = { "apple" }

-- After this cart is { "banana", "apple" }
table.insert(cart, 1, "banana")
```

"Popping" a value from a table:
```lua
local cart = { "banana", "apple" }

-- After this cart is { "banana" }, fruit is "apple"
local fruit = table.remove(cart)
```

[See the Lua documentation for more](https://www.lua.org/pil/19.2.html)

