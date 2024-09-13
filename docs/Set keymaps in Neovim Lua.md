---
id: 1726142892-DYMF
aliases:
  - Set keymaps in Neovim Lua
tags: []
---

# Set keymaps in Neovim Lua

Use `vim.keymap.set`:
```lua
-- Map a keybind to a lua function
vim.keymap.set(
    'n',
    '<Leader>lr',
    function()
        vim.lsp.buf.references
    end
)
```

Takes in four arguments:
1. The mode shorthand, or a table of mode shorthands (`{ 'n', 'i', 'v' }`)
2. The user binding (called left-hand side)
3. What the binding does (called the right-hand side)
4. An optional table of arguments and options

For the arguments, see `:h map-arguments`.
For the options, they can be:
- `buffer: integer|boolean`, for if the mapping should be buffer-local. If `true` uses current buffer.
- `remap: boolean (false)`, makes the mapping recursive.

