---
id: Shell Functions
aliases: []
tags:
  - shell
  - scripting
  - functions
---

# Shell Functions

```shell
# This is the function definition, note that there are no arguments up here.
greeting () {
	# Because arguments are given like in a script.
	name="$1"
	echo "Hello ${name}!"
}

# This'll say "Hello Jeff!"
greeting Jeff
``` 