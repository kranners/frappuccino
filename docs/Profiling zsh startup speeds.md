---
id: Profiling zsh startup speeds
date: "18 June, 2025"
---

# Profiling zsh startup speeds

Profiling a slow `zsh` startup time [can be done with the builtin module `zprof`](https://zsh.sourceforge.io/Doc/Release/Zsh-Modules.html#The-zsh_002fzprof-Module).

### Enabling `zprof`

Outside of [[Nix]] systems, you can enable `zprof` by adding the mod to the top and bottom of your ~/.zshrc:
```sh
zmodload zsh/zprof

# remainder of your .zshrc

zprof
```

[[Nix]] users can use the provided [[Home Manager]] [option `programs.zsh.zprof.enable`:](https://nix-community.github.io/home-manager/options.xhtml#opt-programs.zsh.zprof.enable)
```nix
{
    programs.zsh = {
        enable = true;

        # Enable profiling
        zprof.enable = true;
    };
}
```

