---
id: Shell For Each File
aliases: []
tags:
  - shell
  - scripting
  - files
  - loop
---

# Shell For Each File

To perform a function for each file in a given folder you can use a `for` loop over either the output of a `find` or over just a regular [[Glob]].

```shell
for filename in ./*.zip; do
	# Avoid the corner case where the file does not exist.
	[ -e "$filename" ] || continue

	# Perform the action.
	unzip $filename
done
``` 