---
id: Add external plugin to Nixvim
aliases:
  - Add external plugin to Nixvim
tags: []
---

# Add external plugin to Nixvim

If there's no option for a plugin you want in Nixvim, you can add extra custom plugins using

- `programs.nixvim.extraPlugins`
  and
- `programs.nixvim.extraConfigLua`

:::tip
[There is a Nixvim PR which may change this soon](https://github.com/nix-community/nixvim/pull/1876)
:::

### Example

Example installing [[windline]]:

```nix
{ pkgs, inputs, ... }:
let
  windline = pkgs.vimUtils.buildVimPlugin {
    pname = "windline";
    version = "2024-09-06";
    src = inputs.windline;
    meta.homepage = "https://github.com/windwp/windline.nvim";
  };
in
{
  programs.nixvim = {
    extraPlugins = [ windline ];
    extraConfigLua = "require('wlsample.vscode')";
  };
}
```

### Note on `src`

If using a flake, you can add your remote inputs to your flake `inputs`:

```nix
{
    inputs = {
        nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";

        windline = {
          url = "github:windwp/windline.nvim";
          flake = false;
        };
    };
}
```

Then just refer to this as `inputs.windline`.

Otherwise, [you can use nurl to generate a fetcher for your source](https://github.com/nix-community/nurl):

```shell
$ nurl https://github.com/rachartier/tiny-code-action.nvim
fetchFromGitHub {
  owner = "rachartier";
  repo = "tiny-code-action.nvim";
  rev = "8a08113cae326f783a373345da7890c28df1f4bd";
  hash = "sha256-hAaelFWP/OyCkl7kbLvskVry8dXafa4z6ET9i4sTXYY=";
}
```
