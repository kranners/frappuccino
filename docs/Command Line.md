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

#### xargs

`xargs` is a utility for passing a stdin stream into another set of commands.

```shell
# Remove all files that end with .zip
find . -name "*.zip" | xargs rm

# Print out the result of ls, just with spaces instead of tabs.
ls | xargs
```

#### For each file in folder

To perform a function for each file in a given folder you can use a `for` loop over either the output of a `find` or over just a regular [[Glob]].

```shell
for filename in ./*.zip; do
	# Avoid the corner case where the file does not exist.
	[ -e "$filename" ] || continue

	# Perform the action.
	unzip $filename
done
```
