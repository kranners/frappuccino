---
id: Get current cursor position Neovim Lua
aliases:
  - Get current cursor position Neovim Lua
tags: []
---

# Get current cursor position Neovim Lua

Use the command `nvim_win_get_cursor()`:
```lua
local position = vim.api.nvim_win_get_cursor(0)
```

Takes in one argument, the handle for a given window.
Use `0` to mean the current window

Returns a tuple of `(row, col)`.
Meaning you can extract just the row number with `position[1]`.

You can `unpack()` to get both of them:
```lua
local row, column = unpack(vim.api.nvim_win_get_cursor(0))
```

See `:h nvim_win_get_cursor()` for more

