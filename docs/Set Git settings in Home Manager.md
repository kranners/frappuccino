---
id: 1726220403-OKQR
aliases:
  - Set Git settings in Home Manager
tags: []
---

# Set Git settings in Home Manager

To enable git:
```nix
{
    programs.git.enable = true;
}
```

To set config options:
```nix
{
    programs.git = {
        enable = true;

        extraConfig = {
            init.defaultBranch = "main";
        };
    };
}
```

There are also options for diff viewers:
```nix
{
    programs.git = {
        delta.enable = false;
        difftastic.enable = false;
        diff-so-fancy.enable = false;
    };
}
```

[See the home-manager git source](https://github.com/nix-community/home-manager/blob/master/modules/programs/git.nix)

