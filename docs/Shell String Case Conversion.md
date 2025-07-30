---
id: Shell String Case Conversion
aliases: []
tags:
  - shell
  - scripting
  - string
  - case
---

# Shell String Case Conversion

Can use either `tr` or `awk`.

```shell
echo "I AM UPPER GRAAAHHH" | tr '[:upper:]' '[:lower:]'
```

Or `awk`:

```shell
echo "I AM UPPER GRAAAHHH" | awk '{print tolower($0)}'
``` 