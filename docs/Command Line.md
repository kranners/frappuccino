---
id: Command Line
aliases: []
tags:
  - command
  - line,
  - cli,
  - development
---

# Command Line

The command line or terminal is the interface between a user and the operating systems [[Shell]].

## FTP

MacOS does not come with an FTP command line tool.
You can install it (and other old-school network tools) by installing `inetutils`.

```shell
brew install inetutils
```

### Usage

_Log into your server_

```shell
ftp username@server
```

_Copy folder of files across, this will copy across all files in the local CWD._

```
ftp> mput
(local-file) *
```

:::tip
`ftp` defaults to interactive mode, meaning all files will require a confirmation before sending.\*\*
:::
To disable interactive mode, either run the command with the `-i` flag or use the command `prompt` to switch.

### LFTP

FTP is old and sucky in a variety of ways. [LFTP (command-**line** file transfer program)](https://linux.die.net/man/1/lftp) is a more modern version of the same thing.

**Disable SSL certificate verification**
Some hosts, like [[Hostinger]] have invalid SSL certificates over FTP.

```
lftp [...]:/> set ssl:verify-certificate false
```

**Recursively and concurrently mirror a folder**

```
lftp [...]:/> mirror -R --parallel [local] [remote]
```

**Run a command un-interactively**

```shell
lftp -u user,pass -e "... ; quit"
```

## Symlinks

A symlink (symbolic link) is a pointer in a given location, pointing back to a file or folder.
References to the link will effectively be the same as references to the original file.

:::tip
If your math includes spaces, multiple symlinks separated by spaces will be made.\*\*
:::

```shell
# Note that the symlink path can be omitted.
# When omitted, by default a symlink at ./original will be made.
ln -s /path/to/original /path/to/symlink

ls -s /path/to/original-with spaces

# original-with -> /path/to/original
# spaces -> spaces
# These links have been made wrong since the original was not quoted.
ls -l
```

## Tips & Tricks

### Defining functions

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

### xargs

`xargs` is a utility for passing a stdin stream into another set of commands.

```shell
# Remove all files that end with .zip
find . -name "*.zip" | xargs -I {} rm {}

# Print out the result of ls, just with spaces instead of tabs.
ls | xargs
```

#### Parallel processing

`xargs` can be used to perform actions in parallel rather than sequentially:

```shell
# -P 20 = Parallel with 20 workers
# -I {} = Replace "{}" in the command with the xargs input

printf "%s\n" "${links[@]}" | xargs -P 20 -I {} curl {}
```

### If Not

```shell
if [ ! -z "$MYVAL" ] ; then
	echo "MYVAL is set! :)"
fi
```

### For each file in folder

To perform a function for each file in a given folder you can use a `for` loop over either the output of a `find` or over just a regular [[Glob]].

```shell
for filename in ./*.zip; do
	# Avoid the corner case where the file does not exist.
	[ -e "$filename" ] || continue

	# Perform the action.
	unzip $filename
done
```

### Redirect stderr into stdout

Use the redirection `2>&1` at the end of any command to pipe stderr into stdout.

```shell
command-throws-errors 2>&1 > full-log.log
```

Use this in conjunction with `less` to interactively read long command outputs

```shell
yarn eslint . --verbose 2>&1 | less
```

Redirect both stderr and stdout to `/dev/null` to bury all output / suppress errors / silence errorsfrom a command.

```shell
useless-output-command 2>/dev/null 1>&2
```

### Default / fallback values

The generic here for defining a value with a fallback looks like:

```shell
# If $may_exist is there, that will be used as the value.
# Otherwise, it's $fallback.
some_value=${may_exist:-fallback}
```

You can use this in functions to define default parameters:

```shell
print_price() {
	price=${1:-0}

	echo "\$${price} to buy this!"
}

print_price 5
print_price
```

:::tip
The syntax `${maybe:-fallback}` will evaluate to `fallback` and do nothing else, BUT `${maybe:=fallback}` will evaluate to `fallback` AND assign the value of `maybe` to `fallback`.
As in:

```shell
# The value MAYBE is intentionally left unset
DEFINITELY=${MAYBE:="yeah"}

# Now it's set!
echo "$MAYBE" # "yeah"
```
:::

### Check variable for value or setting

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

To check for matches against a regular expression (regex pattern), use [the `=~` matching operator](https://tldp.org/LDP/abs/html/bashver3.html#REGEXMATCHREF):

```shell
NUMBER_IN_QUOTES='"3"'

# Note the double braces! The operator only works in double braces.
if [[ "$NUMBER_IN_QUOTES" =~ ^\"[0-9]+\"$ ]]; then
	echo "It is what it is"
fi
```

### Check that a file does or doesn't exist

Checking for a file:

```shell
if [ -f "../some-path" ]; then
  echo "it exists! yay"
fi

if [ ! -f "../some-other-path" ]; then
  echo "it does not exist! oh no!"
fi
```

Checking for a directory:

```shell
if [ -d "../some-path" ]; then
  echo "it exists! yay"
fi

if [ ! -d "../some-other-path" ]; then
  echo "it does not exist! oh no!"
fi
```

### Check if program exists in script

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

### Count stuff

Pipe them into [`wc`](https://ss64.com/bash/wc.html).

To count files in a folder:

```shell
# The -l flag counts lines specifically.
ls folder | wc -l

> 1330
```

### Count unique lines in a file

To get counts of sorted repeated lines in a file:

```shell
sort FILE.txt | uniq -c
```

To get the most frequent ones at the top of the command:

```shell
sort FILE.txt | uniq -c | sort -bgr
```

### Kill process at port

_For more info, check out [the Stack Overflow thread this was shamelessly stolen from](https://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac)._

Find a process PID using a port using:

```shell
# Find processes using port 3000.
sudo lsof -i :3000
```

Kill the process using PID with:

```shell
# Kill a process.
kill -15 <pid>

# Use kill -9 to REALLY kill it.
```

Combine this all together with:

```shell
# Where <port> is the port you want to kill.
kill -15 $(lsof -i :<port> | awk 'NR > 1 {print $2}')
```

### Parse arguments, `case` syntax

Basic case switch:

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

Parsing boolean arguments:

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

Parsing arguments with values:

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

### Print over multiple lines

```shell
cat << EOF
usage: whatever

hello

I'm down here!! WOAH
EOF
```

### Get directory containing script

[One-liner stolen shamelessly from Stack Overflow](https://stackoverflow.com/questions/59895/how-do-i-get-the-directory-where-a-bash-script-is-located-from-within-the-script):

```bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
```

### Convert string to lowercase

Can use either `tr` or `awk`.

```shell
echo "I AM UPPER GRAAAHHH" | tr '[:upper:]' '[:lower:]'
```

Or `awk`:

```shell
echo "I AM UPPER GRAAAHHH" | awk '{print tolower($0)}'
```

### Filter to lines

Use `awk`:

```shell
# just get me the first line, thankx
cat really-long-file.txt | awk 'NR == 1'
```
