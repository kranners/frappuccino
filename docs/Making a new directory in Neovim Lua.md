---
id: Making a new directory in Neovim Lua
date: "01 August, 2025"
---

# Making a new directory in Neovim Lua

Use the Neovim `vim.fn` wrapper to call the Vim function `mkdir`.

Which itself is just the regular `mkdir` command.

In Vim it would be:
```vim
-- Or any flags
:call mkdir("/path/to/folder", "p")
```

[See the Lua-VimScript bridge](https://neovim.io/doc/user/lua.html#_lua-vimscript-bridge)

[See the page on Vim builtins](https://neo.vimhelp.org/builtin.txt.html)

