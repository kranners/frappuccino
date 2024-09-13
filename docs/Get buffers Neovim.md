---
id: 1726137856-JBID
aliases:
  - Get buffers Neovim
tags: []
---

# Get buffers Neovim

#### Listing handles

Use `nvim_list_bufs()` to list out all current buffer handles

```lua
local bufs = vim.api.nvim_list_bufs()
```

#### Getting line count

Use `nvim_buf_line_count()` to get the line count.

[Internally, buffer contents are stored as arrays of strings (basically, apparently).](https://www.reddit.com/r/neovim/comments/mq4pxn/comment/gufgtv8/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

```lua
-- Get the current buffers line count
local line_count = vim.api.nvim_buf_line_count(0)
```

#### Getting file contents

Use `nvim_buf_get_lines()`.

This takes in four arguments:
- The buffer handle
- The starting line index (this is zero-indexed)
- The last line index (this is exclusive)
- A boolean for whether reading out-of-bounds should be an error.

Negative indices are `length of array + 1 + index`.

```lua
-- Get current buffers lines
local lines = vim.api.nvim_buf_get_lines(0, 0, -1, false)
```

