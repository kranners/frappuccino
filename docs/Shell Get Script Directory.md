---
id: Shell Get Script Directory
aliases: []
tags:
  - shell
  - scripting
  - path
---

# Shell Get Script Directory

[One-liner stolen shamelessly from Stack Overflow](https://stackoverflow.com/questions/59895/how-do-i-get-the-directory-where-a-bash-script-is-located-from-within-the-script):

```shell
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
``` 