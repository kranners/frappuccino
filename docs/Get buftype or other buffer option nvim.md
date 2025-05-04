---
id: Get buftype or other buffer option nvim
date: "03 May, 2025"
---

# Get buftype or other buffer option nvim

Use [`nvim_get_option_value`](https://neovim.io/doc/user/api.html#nvim_get_option_value())

Don't use `nvim_buf_get_option(buf, "buftype")` as that is deprecated.

eg. To check if a buffer is a terminal buffer:
```lua
if vim.api.nvim_get_option_value("buftype", { buf = buf }) == "terminal" then
    -- Do something with that
end
```
