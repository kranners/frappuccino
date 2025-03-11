---
id: Filesystem operation in Neovim Lua
date: "17 February, 2025"
---

# Filesystem operation in Neovim Lua

Table containing various filesystem functions, ie `basename`:
```lua
local path_to_note = "/path/to/vault/apples.md"
local note_name = string.gsub(vim.fs.basename(path_to_note), ".md$", "")
```

See `:h vim.fs`
