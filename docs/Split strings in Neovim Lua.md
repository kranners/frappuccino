---
id: 1725585595-PWQY
aliases:
  - Split strings in Neovim Lua
tags: []
---

# Split strings in Neovim Lua

Unlike the gmatch command (See [[1725585130-UJOJ|Splitting and joining strings in Lua]]), this takes in a string and a delimiter.

```lua
local words = "these are words, woah"

-- { "these", "are", "words,", "woah" }
vim.split(words, "%s")
```

See: `:help vim.split`
