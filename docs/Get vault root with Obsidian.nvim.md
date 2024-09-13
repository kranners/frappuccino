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

See: [obsidian.nvim client source](https://github.com/epwalsh/obsidian.nvim/blob/main/lua/obsidian/client.lua)

For getting a specific vault:
```
local client = require("obsidian").get_client({ dir = "/path/to/vault" })
```

[For all the options available to the client, see the client class docs.](https://github.com/epwalsh/obsidian.nvim/blob/main/lua/obsidian/client.lua#L61)

