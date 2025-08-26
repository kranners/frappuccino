---
id: Listing files in a folder Node
date: "09 August, 2025"
---

# Listing files in a folder Node

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

