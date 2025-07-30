---
id: Shell Variable Checks
aliases: []
tags:
  - shell
  - scripting
  - variables
  - conditions
---

# Shell Variable Checks

## Check if Set

To check if a value IS set, use `-n`:

```shell
SOME_ARG="$2"

if [ -n "$SOME_ARG" ]; then
	echo "Now I can do some thing! Wow!"
fi
```

To check if a value IS NOT set, use `-z`

```shell
kill_port() {
	pid="$(lsof -i :${1} | awk 'NR > 1 {print $2}')"

	# If $pid is unset, this branch happens.
	if [ -z "${pid}" ]; then
		echo "No process using port ${port}"
		return 0
	fi

	kill -${signal:-15} $pid
}
```

## Check for Equality

To check for equality, or non-equality it's `-eq` or `-ne` respectively:

```shell
kill_pid() {
	pid="${1}"
	kill -15 ${pid}

	# If this worked, $? will be 0 to indicate success
	if [ $? -eq 0 ]; then
		echo "Killed ${pid}"
		return 0
	fi

	echo "Could not kill: ${pid}"
	return 1
}
```

## Check for Pattern Match

To check for matches against a regular expression (regex pattern), use [the `=~` matching operator](https://tldp.org/LDP/abs/html/bashver3.html#REGEXMATCHREF):

```shell
NUMBER_IN_QUOTES='"3"'

# Note the double braces! The operator only works in double braces.
if [[ "$NUMBER_IN_QUOTES" =~ ^\"[0-9]+\"$ ]]; then
	echo "It is what it is"
fi
``` 