---
tags: meta, obsidian, tags, search, query, graph
---

# Features

## Search

Searching can be done in Obsidian by entering the quick search menu with ⌘+Shift+F.

### Basic rules for searches
- `meeting work` returns all pages containing **both** meeting and work.
- `meeting OR work` returns all pages containing meeting **or** work.
- `personal (meeting OR work)` returns all pages containing **both** personal **and one of** meeting or work.
- `personal -work` returns all pages containing personal and **not** work.

## Operators

To find notes using tags, use the tag search operator like `tag:#meeting`.
To find notes with filenames, use the `file:` operator, like `file:.jpg`
To find notes with particular paths, use the `path:` operator like `Obsidian.md`

## Tags

[Tags](https://help.obsidian.md/Editing+and+formatting/Tags) are an alternate means of organising [[Obsidian]] pages outside of a nested folder structure.

Tags can be added to anywhere with the hash (#) key, like `#cool-tag` but for whole pages, they should be added to the metadata, where the hash is unnecessary.

# Plugins

### Obsidian Git

[Obsidian Git](https://publish.obsidian.md/git-doc/Start+here) is a plugin for automatically syncing an [[Obsidian]] vault to a [[Git]] repository.

To install, follow the usual steps from the Obsidian community plugin section.
