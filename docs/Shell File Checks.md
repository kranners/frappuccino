---
id: Shell File Checks
aliases: []
tags:
  - shell
  - scripting
  - files
  - conditions
---

# Shell File Checks

## Check for File

Checking for a file:

```shell
if [ -f "../some-path" ]; then
  echo "it exists! yay"
fi

if [ ! -f "../some-other-path" ]; then
  echo "it does not exist! oh no!"
fi
```

## Check for Directory

Checking for a directory:

```shell
if [ -d "../some-path" ]; then
  echo "it exists! yay"
fi

if [ ! -d "../some-other-path" ]; then
  echo "it does not exist! oh no!"
fi
``` 