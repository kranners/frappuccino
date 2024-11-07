---
id: Add file contents Neovim lua
aliases:
  - Add file contents Neovim lua
tags: []
---

# Add file contents Neovim lua

To set (replace) a range of text in a given buffer, [use `nvim_buf_set_text`](https://neovim.io/doc/user/api.html#nvim_buf_set_text()).

However, if you need to set several lines at once, [prefer using nvim_buf_set_lines](https://neovim.io/doc/user/api.html#nvim_buf_set_lines())

If you're only adding / appending contents, [prefer using `nvim_put`](https://neovim.io/doc/user/api.html#nvim_put())

`vim.api.nvim_put()` takes in 4 arguments:
- a list of lines (strings) to insert
- the _edit behaviour_, `"b" | "c" | "l" | ""` (see the docs for this one)
- a boolean, if `true` will insert text after the cursor (`false` will insert before)
- a boolean, if `true`, the cursor will follow the inserted text

```lua
vim.cmd.edit("cool-file.md")
vim.api.nvim_put(
    { "hey", "hi", "howdy" },
    "l",
    true,
    true
)
```

