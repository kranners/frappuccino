---
id: Set option or global in Lua Neovim
date: "17 February, 2025"
---

# Set option or global in Lua Neovim

Vim global dicts are accessible via `vim.*`:
```lua
vim.g.foo = 5     -- Set the g:foo Vimscript variable.
print(vim.g.foo)  -- Get and print the g:foo Vimscript variable.
vim.g.foo = nil   -- Delete (:unlet) the Vimscript variable.
vim.b[2].foo = 6  -- Set b:foo for buffer 2
```

Setting fields that are themselves dictionaries requires a bit more. That's
because indexing into the table returns copies, but you can set them by making
a temporary table and setting the option to that.

```lua
vim.g.my_dict.field1 = 'value'  -- Does not work

local my_dict = vim.g.my_dict   --
my_dict.field1 = 'value'        -- Instead do
vim.g.my_dict = my_dict         --
```

See `:h lua-vim-variables`
