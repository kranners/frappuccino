---
id: Neovim add a filetype restricted bind
date: "24 November, 2025"
---

# Neovim add a filetype restricted bind

```lua
vim.api.nvim_create_autocmd("filetype", {
  pattern = { "markdown" },
  callback = function()
    vim.schedule(function()
      vim.keymap.set("n", "<CR>", commands.cycle_checkbox)
    end)
  end,
})
```

[See this Reddit post](https://www.reddit.com/r/neovim/comments/16f3kap/how_to_define_custom_keys_for_only_a_certain/)

