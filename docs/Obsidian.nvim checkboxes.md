---
id: Obsidian.nvim checkboxes
aliases:
  - Obsidian.nvim checkboxes
tags: []
---

# Obsidian.nvim checkboxes

Checkboxes are defined like:

```lua
{
    ui = {
        checkboxes = {
            [" "] = { char = " ", hl_group = "ObsidianTodo" },
            [">"] = { char = ">", hl_group = "ObsidianDone" },
        }
    }
}
```

- `key` is what is actually used as the underlying value in markdown
- `char` is the replacement value used by `ui.enable`
- `hl_group` is what is used for `ui.enable` for coloring the todo items

There is a hidden, undocumented `order` value for checkboxes which defines their sorting order.

See: [The `toggle_checkbox()` documentation](https://github.com/epwalsh/obsidian.nvim/blob/14e0427bef6c55da0d63f9a313fd9941be3a2479/lua/obsidian/commands/toggle_checkbox.lua#L4)

### In Nixvim

[Option documentation here in Nixvim](https://nix-community.github.io/nixvim/plugins/obsidian/settings/ui/checkboxes.html)

[Defined here under the Obsidian options](https://github.com/nix-community/nixvim/blob/main/plugins/by-name/obsidian/options.nix#L368)

