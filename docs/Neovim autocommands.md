---
id: 1727347728-BXIE
aliases:
  - Neovim autocommands
tags: []
---

# Neovim autocommands

An autocommand (autocmd) is a function which is executed in response to an event. Automatically 👻.

[See here for the Neovim docs autocmd explanation](https://neovim.io/doc/user/usr_40.html#40.3)
[See here for the Neovim docs on autocmds](https://neovim.io/doc/user/autocmd.html)
[See here for the Neovim Lua guide on autocommands](https://neovim.io/doc/user/lua-guide.html#_autocommands)

### Creating an autocommand

You can create an autocommand using `vim.api.nvim_create_autocmd()`, which takes in two arguments:
- `event`: a string or table of strings containing the events which will trigger the command.
- `opts`: a table of options which define the command itself.

Important options are:
- `callback`: the Lua function to run
- `pattern`: a string pattern or table of patterns. Defaults to `*`.

You can also define a Vim command using `command`, instead of `callback`.

Generally your patterns will be globs to match against files.

A pattern of `*` will match all files.
A pattern of `*.js` will match all .js files.

See `:h autocmd-pattern`

### Events

See the full list below for all the events - but here's the highlights:
- [VimLeave](https://neovim.io/doc/user/autocmd.html#VimLeave), called just before Neovim exits.
- [VimLeavePre](https://neovim.io/doc/user/autocmd.html#VimLeavePre), called before that.
- [UserGettingBored](https://vimdoc.sourceforge.net/htmldoc/autocmd.html#UserGettingBored) ([also here](https://neovim.io/doc/user/autocmd.html#UserGettingBored)) called whenever the user idles for 5 minutes. Just kidding! :-)
- [WinEnter](https://neovim.io/doc/user/autocmd.html#WinEnter), called just before entering a window.

[See events reference](https://neovim.io/doc/user/autocmd.html#_5.-events)

