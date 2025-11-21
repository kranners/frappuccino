---
id: Setting up Remark and GFM in React
date: "21 November, 2025"
---

# Setting up Remark and GFM in React

Install dependencies
```shell
npm i react-markdown
```

Optionally install Remark plugins
```shell
npm i remark-gfm remark-breaks
```

Use the `<Markdown />` component to render Markdown content:
```tsx
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import { MyCustomLink } from "@/components/my-custom-link";

type MarkdownViewProps = {
  content: string;
}

export function MarkdownView({ content }: MarkdownViewProps) {
  return (
    <Markdown
      // Optionally install plugins
      remarkPlugins={[remarkGfm, remarkBreaks]}
      // Optionally provide a component map
      components={{
        a: MyCustomLink,
      }}
    >
      {content}
    </Markdown>
  )
}
```

[See react-markdown](https://github.com/remarkjs/react-markdown)

[See remark-gfm](https://github.com/remarkjs/remark-gfm)

[See remark-breaks](https://github.com/remarkjs/remark-breaks)

