---
id: Setting up Streamdown in React
date: "21 November, 2025"
---

# Setting up Streamdown in React

Start by installing Streamdown:
```shell
npm i streamdown
```

If you're making a chatbot, then you'll probably want to do this as a part of

[AI Elements provided by Vercel.](https://ai-sdk.dev/elements)
```shell
npx ai-elements@latest add message
```

Use the `<Streamdown />` component to render Markdown content:
```tsx
import Streamdown from "streamdown";

// This is installed by default
import remarkGfm from "remark-gfm";

// This isn't installed by default
import remarkBreaks from "remark-breaks";

import { MyCustomLink } from "@/components/my-custom-link";

type MarkdownViewProps = {
  content: string;
}

export function MarkdownView({ content }: MarkdownViewProps) {
  return (
    <Streamdown
      // Optionally install plugins
      remarkPlugins={[remarkGfm, remarkBreaks]}
      // Optionally provide a component map
      components={{
        a: MyCustomLink,
      }}
    >
      {content}
    </Streamdown>
  )
}
```

[See Getting Started with Streamdown](https://streamdown.ai/docs/getting-started)

[See using Streamdown](https://streamdown.ai/docs/usage)
