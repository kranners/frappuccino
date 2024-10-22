---
id: Define a keymap in Nixvim
aliases:
  - Define a keymap in Nixvim
tags: []
---

# Define a keymap in Nixvim

Keymaps are defined under the `programs.nixvim.keymaps` option.

This option is a list of attrsets with:

Takes in four arguments:

- `mode`: The mode shorthand, or an array of mode shorthands (`[ "n" "i" "v" ]`)
- `key`: The user binding (called left-hand side)
- `action`: What the binding does (called the right-hand side)
- `options`: An optional attrset of arguments and options

```nix
{
  programs.nixvim.keymaps = [
    {
      key = "]";
      action = "<CMD>lua require('goto-preview').goto_preview_definition()<CR>";
      options = { desc = "Preview declaration"; };
      mode = "n";
    }
  ];
}
```

To execute a Lua function in your keybind, use `action.__raw`:

```nix
  {
    key = "<Leader>S";
    action.__raw = ''
      function()
        require('resession').save(vim.fn.getcwd(), { dir = "dirsession" })
      end
    '';
    options = { desc = "Save session"; };
    mode = "n";
  }
```

:::tip
The raw action _must_ be wrapped in a `function()`.
:::

[See the Nixvim options on keymaps for more info](https://nix-community.github.io/nixvim/keymaps/index.html)
