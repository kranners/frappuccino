---
tags: ruby, environment, version
---

# rbenv

[rbenv](https://github.com/rbenv/rbenv) is a [[Ruby]] version management tool.

It can be installed on [[MacOS]] using [[Homebrew]]
```shell
brew install rbenv ruby-build

# After installation, this will tell you how to complete setup.
rbenv init
```

### Usage

```shell
# List available versions
rbenv install -l

# Install a Ruby version
rbenv install 1.2.3

# Set the Ruby version globally
rbenv global 1.2.3

# Set the Ruby version for this directory
rbenv local 1.2.3
```
