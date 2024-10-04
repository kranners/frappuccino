---
id: Using registers in Neovim Lua
aliases:
  - Using registers in Neovim Lua
tags: []
---

# Using registers in Neovim Lua

Use the Neovim builtins [`getreg()`](https://neovim.io/doc/user/builtin.html#getreg()) and [`setreg()`](https://neovim.io/doc/user/builtin.html#setreg()).

Since these are Neovim builtins, you'll need to call them like `vim.fn.getreg("0")`.
```lua
local clip = vim.fn.getreg("0")
vim.print(clip)
```

If `setreg` is called without a register name, the unnamed register '"' is used.
`getreg` must be called with a register name.

`getreg()` can be made to return a List rather than a string, if `{ list = true }` in its options:
```lua
local shopping_list = vim.fn.getreg("@", { list = true })
```

To set a register (2) to the value of another register (1):
```lua
vim.fn.setreg("2", vim.fn.getreg("1"))
```

For more, see `:h setreg()` and `:h getreg()`.

