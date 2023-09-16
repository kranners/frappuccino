---
tags: rust, programming, languages, low-level
---

# Rust

[Rust](https://www.rust-lang.org/) is a highly-performant low-level multi-purpose programming language with "zero cost high level abstractions".

## Getting started

To install Rust on [[MacOS]], it is:
```shell
# Run this, then follow the on-screen instructions to install.
# Then restart your shell.
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

After running this command, you'll also get [Cargo](#Cargo).

To create a new project:
```shell
cargo new my-project
```

If you're a [[VSCode]] fan, you can also download the [Rust language extension](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).
## Cargo

[Cargo](https://doc.rust-lang.org/cargo/index.html) is the rust package manager.