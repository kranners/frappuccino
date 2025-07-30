---
id: Shell Count Lines
aliases: []
tags:
  - shell
  - scripting
  - files
  - count
---

# Shell Count Lines

Pipe them into [`wc`](https://ss64.com/bash/wc.html).

To count files in a folder:

```shell
# The -l flag counts lines specifically.
ls folder | wc -l

> 1330
```

## Count unique lines in a file

To get counts of sorted repeated lines in a file:

```shell
sort FILE.txt | uniq -c
```

To get the most frequent ones at the top of the command:

```shell
sort FILE.txt | uniq -c | sort -bgr
``` 