---
id: Close a buffer in Neovim
aliases:
  - Close a buffer in Neovim
tags: []
---

# Close a buffer in Neovim

Use `nvim_buf_delete`, by deleting a buffer the window should automatically close.

To just close the window, use `nvim_win_close`

Takes in two arguments:

- The buffer handle
- A table of named options
  - `force` - Force delete, ignore unsaved changes
  - `unload` - Unload instead of deleting

```lua
-- If we are currently in a floating window, just close that instead
local win = vim.api.nvim_get_current_win()
local win_config = vim.api.nvim_win_get_config(win)

local floating = win_config.relative == "editor"
if floating then
  vim.api.nvim_buf_delete(vim.api.nvim_win_get_buf(win), { force = true })
  return
end
```

See `:h nvim_buf_delete` for more.
