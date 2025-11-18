---
id: Setting up GitHub on a new machine
date: "13 November, 2025"
---

# Setting up GitHub on a new machine

The goal here is to set up a new SSH key and a GPG signing key for a new MacOS
machine, using the GitHub `gh` cli.

Install the CLI using [[Homebrew]]:
```shell
brew install gh
```

Then login:
```shell
gh auth login
```

Authorize the CLI to manage signing keys:

```shell
gh auth refresh -h github.com -s admin:ssh_signing_key
```

Create a new RSA key:
```shell
ssh-keygen -t rsa -b 4096
```

Add the new public key:
```shell
gh ssh-key add ~/.ssh/id_rsa.pub
```
