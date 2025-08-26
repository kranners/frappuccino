---
id: Sanity custom types
date: "01 August, 2025"
---

# Sanity custom types

See [[Sanity schema types]] for what a schema type is at all.

A custom type in Sanity allows you to create custom documents and custom
objects that go into your custom documents.

For example, to manage a Hero section in a landing page, you might want to
define a _Hero_ type.

Custom types are generally going to either use the underlying type `"document"`
for any custom pages, or the underlying type `"object"` for anything which goes
into a page.

[See the Object type.](https://www.sanity.io/docs/studio/object-type)

## `defineType()`

Typically, you'll use Sanity's `defineType()` function when defining custom types.

This function doesn't do any mutation to your arguments, but instead provides
completion and checks that your type is correctly formed.

As an example the custom type below won't use `defineType()`, but if it did it
would look like:
```typescript
// schema/types/hero.ts <-- or whatever
import { defineType } from 'sanity';

export const hero = defineType({ ... });
```

## Hero example

For our _Hero_ type, it would be an object. Maybe one that looks like:
```typescript
// schema/types/hero.ts <-- or whatever
export const hero = {
    title: "Hero",   // Content editor visible name
    name: "hero",    // Internal reference name
    type: "object",  // Underlying type.
    fields: [        // Defines what fields live inside this object
        {
            title: "Heading",
            name: "heading",
            type: "string",
        },
        {
            title: "Banner",
            name: "banner",
            type: "image",
        },
    },
};
```

## Preview

Sanity presents content editors a compact representation for lists of objects.

For example, you might have a Hero, a few content sections, and a video
section.

Instead of presenting all of the information contained in everything at once
when viewing the entire page at a glance, Sanity will show little blocks with
titles and subtitles to the content editor.

[This is configurable using the `preview` field in any given type.](https://www.sanity.io/docs/studio/previews-list-views)

By default, without any custom preview, Sanity will attempt to guess which
field should be used. So, if you define a `title`, then Sanity will use that.

The preview field looks like this:
```typescript
export const movie = {
  name: 'movie',
  type: 'document',
  fields: [
    {
        title: "Title",
        name: "title",
        type: "string",
    },
    {
        title: "Director",
        name: "director",
        type: "reference",
        to: [{ type: "person" }],
    },
  ],
  preview: {
    select: {                   // Select section defines which fields should be used in a preview
      title: 'title',           // Here we set the selection key of "title" to refer to the title field
      director: 'director.name' // If the movie has a director, follow the reference and get the name
    },
    prepare: (selection) => {   // This function returns what will actually be shown to the editor
      const {
        title,
        director,
      } = selection;
      
      if (director) {
        return {
          title,
          subtitle: `Directed by ${director}`,
        }
      }

      return {
        title: title,
        subtitle: "Director unknown"
      }
    }
  }
}
```

Here for a Movie document, the previewed title of the document will be the title of the movie.
The previewed subtitle will be `Directed by <the directors name>`, or `Director unknown`.

