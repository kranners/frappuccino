---
id: Replacing actions in Telescope
aliases:
  - Replacing actions in Telescope
tags: []
---

# Replacing actions in Telescope

https://github.com/nvim-telescope/telescope.nvim/blob/master/developers.md#replacing-actions

`attach_mappings` as a function inside the picker

```lua
  attach_mappings = function(prompt_bufnr, map)
      actions.select_default:replace(function()
        actions.close(prompt_bufnr)
        local selection = action_state.get_selected_entry()
        -- print(vim.inspect(selection))
        vim.api.nvim_put({ selection[1] }, "", false, true)
      end)
      return true
    end,
```

```lua
local delete_note = function(prompt_bufnr)
  vim.print("Hello from delete_note()")
end

attach_mappings = function(_, map)
  map({ "i", "n" }, "<C-d>", delete_note)

  -- Keep the default bindings intact
  return true
end
```
