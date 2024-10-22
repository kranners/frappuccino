---
id: Split strings in Neovim Lua
aliases:
  - Split strings in Neovim Lua
tags: []
---

# Split strings in Neovim Lua

Unlike the gmatch command (See [[Splitting and joining strings in Lua]]), this takes in a string and a delimiter.

```lua
local words = "these are words, woah"

-- { "these", "are", "words,", "woah" }
vim.split(words, "%s")
```

See: `:help vim.split`
