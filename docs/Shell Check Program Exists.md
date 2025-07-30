---
id: Shell Check Program Exists
aliases: []
tags:
  - shell
  - scripting
  - program
  - conditions
---

# Shell Check Program Exists

Use `program` to do this:

```shell
# Output on whether the command exists
command -v echo

# Do something if the command is installed
if [ -x "$(command -v git)" ]; then
  git clone "https://github.com/kranners/frappuccino.git"
fi

# Do something if the command is not installed
if ! [ -x "$(command -v git)" ]; then
  echo 'Error: git is not installed.' >&2
  exit 1
fi
``` 