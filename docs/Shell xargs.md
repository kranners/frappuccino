---
id: Shell xargs
aliases: []
tags:
  - shell
  - scripting
  - xargs
  - parallel
---

# Shell xargs

`xargs` is a utility for passing a stdin stream into another set of commands.

```shell
# Remove all files that end with .zip
find . -name "*.zip" | xargs -I {} rm {}

# Print out the result of ls, just with spaces instead of tabs.
ls | xargs
```

## Parallel processing

`xargs` can be used to perform actions in parallel rather than sequentially:

```shell
# -P 20 = Parallel with 20 workers
# -I {} = Replace "{}" in the command with the xargs input

printf "%s\n" "${links[@]}" | xargs -P 20 -I {} curl {}
``` 