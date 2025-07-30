---
id: Shell Case Switch
aliases: []
tags:
  - shell
  - scripting
  - case
  - arguments
---

# Shell Case Switch

## Basic Case Switch

```shell
PET="dog"

case "$PET" in
	dog)
		echo "Woof!"
		;;
	cat)
		echo "Meow!"
		;;
	snake)
		echo "Hissssssss 🐍"
		;;
	*)
		echo "idk about that one"
		;;
esac
```

## Parsing Boolean Arguments

```shell
while [[ "$#" > 0 ]]; do
	case "$1" in
		-v|--verbose) VERBOSE=1; shift;;
		-s|--silent) SILENT=1; shift;;
		*) echo "Unknown parameter $1"; exit 1;;
	esac
done

[[ -z "$VERBOSE" ]] || echo "I am extra verbose!!"
[[ -z "$SILENT" ]] || echo "Ssshhhhhh..."
```

```
$ ./test.sh --verbose
I am extra verbose!!

$ ./test.sh --silent
Ssshhhhhh...

$ ./test.sh howdy
Unknown parameter howdy
```

## Parsing Arguments with Values

```shell
while [[ "$#" > 0 ]]; do
	case "$1" in
	    -n|--name) NAME="$2"; shift 2;;
		*) echo "Unknown parameter $1"; exit 1;;
	esac
done

[[ -z "$NAME" ]] || echo "Hi there, $NAME!"
```

```
$ ./test.sh -n "Big Guy"
Hi there, Big Guy!

$ ./test.sh --name "lil dude"
Hi there, lil dude!
``` 