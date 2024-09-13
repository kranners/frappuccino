---
id: 1726193154-TOXT
aliases:
  - Define a keymap in Nixvim
tags: []
---

# Define a keymap in Nixvim

Keymaps are defined under the `programs.nixvim.keymaps` option.

This option is a list of attrsets with:
- `key`: the 

Takes in four arguments:
`mode`: The mode shorthand, or an array of mode shorthands (`[ "n" "i" "v" ]`)
`key`: The user binding (called left-hand side)
`action`: What the binding does (called the right-hand side)
`options`: An optional attrset of arguments and options

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

[See the Nixvim options on keymaps for more info](https://nix-community.github.io/nixvim/keymaps/index.html)

