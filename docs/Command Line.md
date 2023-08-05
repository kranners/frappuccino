---
tags: command line, cli, development
---

The command line or terminal is the interface between a user and the operating systems [[Shell]].

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
