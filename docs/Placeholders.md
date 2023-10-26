---
tags:
  - web
  - development
  - tools
---

# Placeholders

Often you will need placeholder images or content in pages which are under development.

### Placeholder images

For placeholder images, you can use tools like [**Lorem Picsum**](https://picsum.photos/) (for more generic images), or **[placekitten](https://placekitten.com/)** (for cats).

```html
<!-- This tag will get you a random 200x200 image -->
<img src="https://picsum.photos/200/200" alt="Placeholder" />

<!-- This tag will get you a random 200x300 cat -->
<img src="http://placekitten.com/200/300" alt="Placeholder cat" />
```

### Lorem ipsum

[Lorem ipsum](https://www.lipsum.com/) is the widely known standard for all placeholder text.

To add lorem ipsum to your content, consider using the [Emmet `lorem` tool](https://docs.emmet.io/abbreviations/lorem-ipsum/) in [[VSCode]].
You will have something similar, or can [install Emmet in your favorite editor](https://docs.emmet.io/).

To use this:
```html
<!-- div>ul>(li>lorem5)*5 -->
<!-- This expands to: -->
<div>
    <ul>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Quae ratione totam vitae architecto!</li>
        <li>Accusantium quae consequuntur ex temporibus.</li>
        <li>Vitae expedita libero hic praesentium.</li>
        <li>Eveniet rem optio eaque suscipit?</li>
    </ul>
</div>
```