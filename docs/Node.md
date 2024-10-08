---
id: Node
aliases: []
tags:
  - node,
  - javascript,
  - typescript,
  - programming
---

NodeJS is a backend runtime for [[JavaScript]].

# Troubleshooting

> I can't import any Node libraries!

If Node types are not present, you can install them with `yarn` using:
```shell
yarn add -D @types/node
```

# Filesystem

## Getting the `tmp` directory

This can be done with the `os` module, using `os.tmpdir()`.

Example:

```js
const os = require('os');
const path = require('path');

const filePath = path.join(os.tmpdir(), "hello.txt"); // /tmp/hello.txt
```

## Listing files in a folder

This is done using a combination of `fs.readdir()` (or `fs.readdirSync()`) *and* `fs.stat()` plus `stats.isDirectory()` if needing to filter out directories.

Example:

*ls.ts*
```typescript
const fs = require('fs');

// [ "ls.ts" ]
function ls(path?: string = __dirname) {
	return fs.readdirSync(path);
}

function lsNoFolders(path?: string = __dirname) {
	return fs.readdirSync(path).filter((file) => {
		return !fs.statSync(file).isDirectory();
	});
}
```

You could potentially use this to list out all files recursively.

*recursive.ts*
```typescript
const { join } = require('path');
const { readdirSync, statSync } = require('fs');

function listRecursive(dir: string, files: string[] = []) {
	const singleLevelFiles = readdirSync(dir);

	for (const file of singleLevelFiles) {
		const name = join(dir, file);

		if (statSync(name).isDirectory()) {
			listRecursive(name, files);
		} else {
			files.push(name);
		}
	}

	return files;
}
```

### Environment variables

[See the docs page on the command-line options.](https://nodejs.org/api/cli.html#node_optionsoptions)

