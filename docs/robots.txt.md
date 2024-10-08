---
tags:
  - web
  - devops
  - cloud
---

# robots.txt

[robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) is the conventional file which implements the [Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html).

It is used to inform web scrapers and spiders what parts of the website they are allowed to access, if any at all. It can also be used as a form of [[SEO]].

_A sample robots.txt which would block access for all web scrapers:_

```txt
User-agent: *

Disallow: /
```

:::tip
That the _robots.txt_ file itself has no power, and relies on spiders to voluntarily acknowledge and respect them. You may still get scraped.
:::
