---
id: Open a floating window in Neovim
aliases:
  - Open a floating window in Neovim
tags: []
---

# Open a floating window in Neovim

Use `nvim_open_win`, if you have no buffer you can make one with `nvim_create_buf`
See their helptags for more info

```lua
local width = math.ceil(math.min(150, vim.o.columns * 0.8))
local height = math.ceil(math.min(35, vim.o.lines * 0.5))
local row = math.ceil(vim.o.lines - height) * 0.5 - 1
local col = math.ceil(vim.o.columns - width) * 0.5 - 1

local float_config = {
  width = width,
  height = height,
  row = row,
  col = col,
  relative = "editor",
  border = "rounded",
}

local buf = vim.api.nvim_create_buf(false, false)
vim.api.nvim_open_win(buf, true, float_config)
```
