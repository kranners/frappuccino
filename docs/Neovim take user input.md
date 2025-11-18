---
id: Neovim take user input
date: "17 November, 2025"
---

# Neovim take user input

[Use `vim.ui.input`.](https://neovim.io/doc/user/lua.html#vim.ui.input())

[Was merged in 2021](https://github.com/neovim/neovim/pull/15959)

Takes in two arguments, `opts` and a callback function.

[`opts` takes in the properties for `input`.](https://neovim.io/doc/user/vimfn.html#input())

That includes a prompt and options for completion.

The callback function takes in the user input as a string.

eg.
```lua
local create_new_note = function(title)
  if title == "" or title == nil then
    vim.notify("Provide a title for the note")
    return
  end

  -- Make a new note with that title
end

M.prompt_for_new_note = function()
  vim.ui.input({ prompt = "Enter note title" }, create_new_note)
end
```

