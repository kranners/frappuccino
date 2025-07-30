---
id: Git Configuration
aliases: []
tags:
  - git
  - configuration
  - software
  - programming
---

# Git Configuration

## Standalone

Git configuration uses a [[TOML]] format, and is loaded from either `~/.gitconfig` or `~/.config/git/config`.

_Sample config_

```toml
[commit]
	gpgsign = true

[push]
	autoSetupRemote = true

[user]
	email = "patchy@the.pirate"
	name = "Patchy Pirate"
	signingkey = "3321A02038BCAC34"
```

## Under [[Home Manager]]

If using [[Home Manager]], your config can be managed through _home.nix_

```nix
programs.git = {
	enable = true;

	userName = "Patchy Pirate";
	userEmail = "patchy@the.pirate";

	extraConfig = {
		push = {autoSetupRemote = true;};
		user = {signingkey = "3321A02038BCAC34";};
		commit = {gpgsign = true;};
	};
};
``` 