---
tags: nvim, neovim, editor, editing, programming
---

# Neovim

[Neovim](https://neovim.io/) is an extended version of the modal editor [Vim](https://www.vim.org/).

You can install it with:

```shell
brew install neovim
```

I generally use this with [[VSCode]] using [VSCode Neovim](https://github.com/vscode-neovim/vscode-neovim).

# Configuration

Config is usually written in [[Lua]] and is stored under `~/.config/nvim/init.lua`.

## Vim Options

For something that would normally be in [[Vimscript]] like:

```vimscript
set relativenumber
```

[[Lua]] does it like:

```lua
vim.opt.relativenumber = true
```
## Plugins

#### lazy.nvim

Which plugin manager to use changes with the moon phase 🌙.
At the moment it is [lazy.nvim](https://github.com/folke/lazy.nvim).

Install it by mindlessly copy/pasting this into your [config](#Configuration).

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)
```

#### [nvim-surround](https://github.com/kylechui/nvim-surround)

nvim-surround is a newer version of Tim Pope's famous [surround.vim](https://github.com/tpope/vim-surround).

Usage is one of `ys`, `cs`, or `ds`, then either a motion and a surrounding character or just the surrounding character.

```markdown
"this is a quote"
> I then enter ds"
It becomes
this is a quote
```

Install into your [config](#Configuration) with this lazy.nvim [[Lua]]:

```lua
{
    "kylechui/nvim-surround",
    version = "*",
    event = "VeryLazy",
    config = function()
        require("nvim-surround").setup({
            -- Configuration here, or leave empty to use defaults
        })
    end
}
```