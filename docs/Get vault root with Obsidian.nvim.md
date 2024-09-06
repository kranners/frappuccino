---
id: 1725516067-XFXG
aliases:
  - Get vault root with Obsidian.nvim
tags: []
---

# Get vault root with Obsidian.nvim

Use the client `vault_root()` function

```lua
local client = require("obsidian").get_client()
vim.print(client:vault_root().filename)
```

See: [[1725515967-LTKQ|obsidian.nvim client source]]

