---
id: Extend table in Neovim Lua
aliases:
  - Extend table in Neovim Lua
tags: []
---

# Extend table in Neovim Lua

Use `vim.tbl_extend(behavior, ...)`.

Takes in at least 3 arguments:
- `behavior`, one of `error`, `keep`, or `force`.
- `...`, at minimum two tables

These define what happens if a key is found in both tables:
- `error`, stop and error
- `keep`, use the value from the left table
- `force`, use the value from the right table

Not a function available in base Lua.

```lua
local fruit_prices = { "apple" = 2, "banana" = 3 }
local vegetable_prices = { "potato" = 2, "broccoli" = 4 }

-- { "apple" = 2, "banana" = 3, "potato" = 2, "broccoli" = 4  }
local produce_prices = vim.tbl_extend("error", fruit_prices, vegetable_prices)
```

[See the Neovim documentation for more info](https://neovim.io/doc/user/lua.html#vim.tbl_extend())

