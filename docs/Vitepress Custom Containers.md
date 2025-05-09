---
id: Vitepress Custom Containers
date: "05 May, 2025"
---

# Vitepress Custom Containers

These are like [[Alerts in Markdown]] for GitHub-flavoured Markdown.

:::info
[GitHub-flavoured alerts are also supported in
Vitepress.](https://vitepress.dev/guide/markdown#github-flavored-alerts)
:::

Define them using blocks delimited with `:::`.

Like:
```markdown
:::info
This is an info box!
:::

:::tip
Check this out :D
:::
```

The types are `info`, `tip`, `warning`, `danger`, and `details`.

`details` acts as a hidden block which can be expanded by clicking on it.

You can also define a custom title for each container:
```markdown
:::danger THIS IS IMPORTANT!!
Oh hi there
:::

:::details dont click me
now u have infinity bad luck oh no
:::
```

[See Custom Containers from the Vitepress
documentation.](https://vitepress.dev/guide/markdown#custom-containers)

