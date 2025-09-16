---
id: Neovim Treesitter integration
date: "05 September, 2025"
---

# Neovim Treesitter integration

See [Treesitter - Neovim docs](https://neovim.io/doc/user/treesitter.html)

## What is Treesitter and how does it relate to Neovim?

[Treesitter](https://tree-sitter.github.io/tree-sitter/) is a parser generating tool and a parsing library.

Parsers for any given language in the Treesitter ecosystem are called grammars.

For example, there's [an official TypeScript grammar.](https://github.com/tree-sitter/tree-sitter-typescript)

Treesitter is integrated into [[Neovim]] without any plugin requirements.

There [is nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter),
but that's just a grammar installer.

By default, Neovim comes bundled with grammars for:
- C
- Lua
- Markdown
- Vimscript
- Vimdoc

## Treesitter module

Neovim comes bundled with a Lua module that exposes functions to interact with
the inbuilt Treesitter.

The first of these to note is `vim.treesitter.inspect_tree()`.

You can call this either in Lua or by using `:InspectTree`.

This will open up a separate buffer with the parsed tree for your current file.
Hovering over any of the nodes will highlight them in your original buffer.

### Getting nodes from the tree

To get the TSNode the cursor is hovering over, it's:
```lua
-- This could either be a TSNode or nil
local node = vim.treesitter.get_node()

if node == nil then
    -- Do some check to make sure it's not nil
end
```

