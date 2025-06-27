---
id: Nix generate YAML file
date: "22 June, 2025"
---

# Nix generate YAML file

Generate a YAML file using the generator `lib.generators.toYAML`.

[Funnily enough, it literally just calls `toJSON` under the hood.](https://github.com/NixOS/nixpkgs/blob/master/lib/generators.nix#L923C3-L923C36)
Apparently YAML is a superset of JSON, so we can just use that. Wild.

The inputs are:
1. An attribute set of options. Currently this is just completely unused as
   there are no options defined. Why is this argument even here? Who knows.
   Probably for parity with the rest of the generators.
2. The value to convert to YAML/JSON.

Example:
```nix
  xdg.configFile.amethyst = {
    target = "./amethyst/amethyst.yml";

    text = lib.generators.toYAML { } {
      mod1 = [ "control" "option" ];
      mod2 = [ "control" "shift" "option" ];

      layouts = [ "middle-wide" ];
    };
  };
```

[See Noogle toYAML](https://noogle.dev/f/lib/generators/toYAML#inputs)

