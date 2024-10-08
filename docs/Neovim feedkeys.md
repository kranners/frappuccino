---
id: 1727148606-ZHKN
aliases:
  - Neovim feedkeys
tags: []
---

# Neovim feedkeys

### Simulate user input in Lua

Use `vim.api.nvim_feedkeys()`.

Takes three arguments - keys: keys to be typed in. - mode: `"m"` for _as though from a mapping_, `"t"` for _as though typed_. - escape_ks: whether to escape `K_SPECIAL (0x80)`

[To clarify `escape_ks`, see this Neovim issue.](https://github.com/neovim/neovim/issues/12297)

### Get internal representation of a keycode

Use `vim.api.nvim_replace_termcodes()`.

Takes in four arguments:

- str: The keycode to replace ("`<CR>`", "`<Esc>`", "`<C-o>`", ...)
- from_part: Legacy vim param, should be `true`
- do_lt: Also translate `<lt>`.
- special: Also replace special keycodes. See `:h keycodes`

:::tip
[`lt` means lesser than](https://neovim.io/doc/user/intro.html#%3Clt%3E)
:::

Example:

```lua
local cr = vim.api.nvim_replace_termcodes("<CR>", true, true, true)

# Simulate pressing the enter key
vim.api.nvim_feedkeys(cr, "t", false)
```

See:

- `:h nvim_feedkeys()`
- `:h feedkeys()`
- `:h nvim_replace_termcodes()`
