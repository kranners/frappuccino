---
tags: web, components, javascript, typescript, react, astro
---

This is just a general dumping ground for common web components and some technologies around them.

For web components as in the [[JavaScript]] feature for custom HTML elements, see the page on [[Custom Elements]].

## Syntax Highlighting and Code Editing

Displaying syntax highlighted code on a page is a surprisingly difficult task.

For syntax highlighting **only**, there is:
- [Shiki](https://github.com/shikijs/shiki)
- [Prism](https://github.com/PrismJS/prism/)

For code **editing**, there is:
- [CodeMirror](https://codemirror.net/)
- [Monaco Editor](https://github.com/microsoft/monaco-editor) (internal VSCode rendering)

#### Using Shiki

Shiki is probably the easiest way to get a syntax highlighter onto a page.

**Setup**:
```shell
yarn add shiki
```

**Usage**:
You could use this with [[React]], using the [`dangerouslySetInnerHtml` prop](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html).

For [[Astro]], the implementation is very simple. It'd be similar for a [[Svelte]] component.

```tsx
---
import shiki from 'shiki';

interface Props {
    code: string;
    lang: string;
}

const { code, lang } = Astro.props;

const rendered = await shiki.getHighlighter({
    theme: 'nord',
}).then((highlighter) => {
    return highlighter.codeToHtml(code, { lang });
})
---

<div set:html={rendered} />
```

#### Using CodeMirror in React

Check out the [CodeMirror React component repository](https://github.com/uiwjs/react-codemirror#install) for more info.

**Setup**:
```shell
# Install react-codemirror and any required extensions (like JavaScript)
yarn add @uiw/react-codemirror @codemirror/lang-javascript
```

**Usage**:
Because of the way these usually work, you'll need to pass around a reference to be updated at runtime, into a hook provided by the library.

```tsx
import { javascript } from "@codemirror/lang-javascript";
import { useCodeMirror } from "@uiw/react-codemirror";
import type React from "react";
import { useEffect, useRef } from "react";

type SourceViewProps = {
  code: string;
  language: string;
};

const SourceView: React.FC<SourceViewProps> = ({ code, language }) => {
  const editor = useRef<HTMLDivElement | null>(null);

  const { setContainer } = useCodeMirror({
    container: editor.current,
	// Note that the extension here is always JavaScript
	// For more advanced usage, write a function to get the right one.
    extensions: [javascript()],
    value: code,
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  return <div ref={editor} />;
};

export default SourceView;
```