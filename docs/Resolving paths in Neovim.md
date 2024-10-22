---
id: Resolving paths in Neovim
aliases:
  - Resolving paths in Neovim
tags: []
---

# Resolving paths in Neovim

Concatenate paths together with `..` and then run the result through `vim.fn.resolve`

```lua
local obsidian_client = require("obsidian").get_client()
local vault_root = obsidian_client:vault_root().filename
vim.print(vim.fn.resolve(vault_root .. "/Stack"))
```

https://www.reddit.com/r/neovim/comments/su0em7/pathjoin_for_lua_or_vimscript_do_we_have_anything/
