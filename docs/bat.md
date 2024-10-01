---
id: bat
aliases:
  - bat
tags: []
---

# bat

[Generally a `cat` replacement for viewing files, but fancier.](https://github.com/sharkdp/bat)

To open a file in a pager (like `less`):
```shell
bat flake.nix
```

To open a file without a page (like `cat`):
```shell
bat flake.nix --pager=never
```

To use `bat` as a previewer for `fzf`:
```shell
fzf [...] --preview "bat --color=always --style=numbers --line-range=:500 {}"
```

