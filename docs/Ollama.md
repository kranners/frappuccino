---
id: Ollama
date: "12 June, 2025"
---

# Ollama

[Ollama is a server](https://ollama.com/) and set of command-line tools for running open-source AI
models on local hardware.

## Installation

### [[NixOS]]

Follow the steps available on [the NixOS wiki for this.](https://wiki.nixos.org/wiki/Ollama)

It'll look something like:
```nix
services.ollama = {
  enable = true;
};
```

For AMD GPUs, you'll have to ensure that your GPU supports ROCM to begin with.

Check out the [AMD compatibility matrix](https://rocm.docs.amd.com/en/latest/compatibility/compatibility-matrix.html) and [GPU arch specs pages](https://rocm.docs.amd.com/en/latest/reference/gpu-arch-specs.html) for info on that.

Then you need to get the LLVM target, which you can get on NixOS like:
```shell
nix run nixpkgs#"rocmPackages.rocminfo" -- --run "rocminfo" | grep "gfx"
```

Which should output something like:
```
❯ nix run nixpkgs#"rocmPackages.rocminfo" -- --run "rocminfo" | grep "gfx"
  Name:                    gfx1030                            
      Name:                    amdgcn-amd-amdhsa--gfx1030         
```

In this case the number we care about is `1030`. That is, `10.3.0`.
