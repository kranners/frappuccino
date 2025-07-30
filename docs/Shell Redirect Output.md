---
id: Shell Redirect Output
aliases: []
tags:
  - shell
  - scripting
  - output
  - redirection
---

# Shell Redirect Output

Use the redirection `2>&1` at the end of any command to pipe stderr into stdout.

```shell
command-throws-errors 2>&1 > full-log.log
```

Use this in conjunction with `less` to interactively read long command outputs

```shell
yarn eslint . --verbose 2>&1 | less
```

Redirect both stderr and stdout to `/dev/null` to bury all output / suppress errors / silence errors from a command.

```shell
useless-output-command 2>/dev/null 1>&2
``` 