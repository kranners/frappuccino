
---
id: Inheriting attributes in Nix
date: "06 November, 2024"
---

# Inheriting attributes in Nix

The `inherit` keyword is a shorthand for copying variables from another scope into the current one.

```nix
{ pkgs, lib, ... }:
let
    # This is equivalent to:
    # isLinux  = pkgs.hostPlatform.isLinux
    # isDarwin = pkgs.hostPlatform.isDarwin
    inherit (pkgs.hostPlatform) isLinux isDarwin;

    let name = "arn";
in
{
    darwinConfig = lib.mkIf isDarwin {
        # This is equivalent to
        # name = name;

        inherit name;
        platform = "darwin";
    };

    linuxConfig = lib.mkIf isLinux {
        inherit name;
        platform = "linux;"
    }
}
```

[See Inheriting attributes from the Nix manual](https://nix.dev/manual/nix/2.17/language/constructs#inheriting-attributes)
