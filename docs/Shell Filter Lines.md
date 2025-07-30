---
id: Shell Filter Lines
aliases: []
tags:
  - shell
  - scripting
  - text
  - filter
---

# Shell Filter Lines

Use `awk`:

```shell
# just get me the first line, thankx
cat really-long-file.txt | awk 'NR == 1'
``` 