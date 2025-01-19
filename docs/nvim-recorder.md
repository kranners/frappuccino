---
id: nvim-recorder
date: "15 January, 2025"
---

# nvim-recorder

Neovim plugin for simplifying macro usage
https://github.com/chrisgrieser/nvim-recorder

Instead of `qA` then `@A`, it's just `q` then `Q`.
Repeats work as expected.

## Configuration

Updating mappings is done under the `mapping` key in the config table.

```lua
require("recorder").setup({
    mapping = {
        addBreakPoint = "<Leader>q",
    },
})
```

See [Configuration in the nvim-recorder README](https://github.com/chrisgrieser/nvim-recorder#configuration)

