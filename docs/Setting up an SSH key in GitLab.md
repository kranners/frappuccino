---
id: Setting up an SSH key in GitLab
date: "17 November, 2025"
---

# Setting up an SSH key in GitLab

Start by installing the GitLab CLI:
```shell
# Or your equivalent
brew install glab
```

Log in to your account:
```shell
# Answer the questions to log into gitlab.com or other
glab auth login
```

Approve the OAuth request in the web browser.

Add an SSH key using `glab ssh-key add`:
```shell
# Requires a path to a key as a positional argument, and a title.
glab ssh-key add ~/.ssh/id_rsa.pub --title "My Machine"
```

[See the documentation for the GitLab CLI.](https://docs.gitlab.com/cli/)

