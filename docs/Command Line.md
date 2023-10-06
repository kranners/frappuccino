---
tags: command line, cli, development
---

The command line or terminal is the interface between a user and the operating systems [[Shell]].

## FTP

MacOS does not come with an FTP command line tool.
You can install it (and other old-school network tools) by installing `inetutils`.

```shell
brew install inetutils
```

### Usage

*Log into your server*
```shell
ftp username@server
```

*Copy folder of files across, this will copy across all files in the local CWD.*
```
ftp> mput
(local-file) *
```

**NOTE: `ftp` defaults to interactive mode, meaning all files will require a confirmation before sending.**
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

**NOTE: If your math includes spaces, multiple symlinks separated by spaces will be made.**

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

### Count stuff

Pipe them into [`wc`](https://ss64.com/bash/wc.html).

To count files in a folder:
```shell
# The -l flag counts lines specifically.
ls folder | wc -l

> 1330
```

### Kill process at port

*For more info, check out [the Stack Overflow thread this was shamelessly stolen from](https://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac).*

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