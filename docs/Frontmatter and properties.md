---
id: Frontmatter and properties
aliases:
  - Frontmatter and properties
tags: []
---

# Frontmatter and properties

[Frontmatter is a block of YAML or JSON](https://help.obsidian.md/Getting+started/Glossary#Frontmatter) (usually YAML) at the top of a Markdown file which defines arbitrary properties.

There is no global specification for what these properties are, it can be anything the Markdown consumer or client needs.

```md
---
title: A Frontmatter Story
date: 09-11-2024
author: Biggie Cheese 🐀
---

# A Tale of Frontmatter

The stuff in those ---s above is frontmatter. This is normal content.
```

### Frontmatter in Obsidian (Properties)

For Obsidian, these are [Properties.](https://help.obsidian.md/Editing+and+formatting/Properties)

Properties are always in YAML format.

Like Frontmatter in general, these can be anything you want.

However, [there are default properties that Obsidian recognizes and uses.](https://help.obsidian.md/Editing+and+formatting/Properties#Default+properties)

#### Default properties

`tags` and `aliases` are both lists of strings.
See [Tags - Obsidian Help](https://help.obsidian.md/Editing+and+formatting/Tags)
See [Aliases - Obsidian Help](https://help.obsidian.md/Linking+notes+and+files/Aliases)

`cssclasses` can be used to apply styling per-note.
See [CSS snippets - Obsidian Help](https://help.obsidian.md/Extending+Obsidian/CSS+snippets)

### Outside of Obsidian

[For Frontmatter usage in GitHub articles, see their respective documentation.](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter)

[For use in MDX, see their respective documentation.](https://mdxjs.com/guides/frontmatter/)

