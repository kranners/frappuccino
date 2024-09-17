---
id: 1726368648-SQVA
aliases:
  - Sway inputs
tags: []
---

# Sway inputs

```shell
# it has a big output
swaymsg -t get_inputs | less
```

##### Disable mouse acceleration in Nix

Use `wayland.windowManager.sway.config.input."type:pointer".accel_profile`.
```nix
{
  input = {
    "type:pointer" = {
      accel_profile = "flat";
      pointer_accel = "-0.5";
    };
  };
}
```

