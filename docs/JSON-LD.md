---
id: JSON-LD
date: "19 November, 2025"
---

# JSON-LD

[JSON for Linking Data is a schema for JSON for providing context to otherwise contextless JSON data.](https://json-ld.org/)

For example, given the following data for an apple:
```json
{
    "name": "Apple",
    "price": {
        "amount": 5,
        "currency": "AUD"
    },
    "stockRemaining": 200,
    "description": "Crisp and sweet!"
}
```

This is great (fruit is lovely), but those keys could be anything.

You and I can read them and know what they mean, but robots have no clue.
- What is `price` meaning here exactly? How do you parse that?
- I don't care about `stockRemaining`, I just want to know if it is in stock or not.

For services which need to link together, supporting every possible schema to
understand what everything is would be impossible.

This is especially important for software which needs to support data from all
over the place in a standard way, _like a search engine_, _like Google_.

[Google and others support and recommend JSON-LD for what they call _Structured Data_.](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

Structured data is a way to provide known content to Google so they can mark it
up in a fancy way for you. This looks nicer on search results, and generally
means better SEO outcomes.

The apple marked up as JSON-LD might look like:
```json
{
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Apple",
    "description": "Crisp and sweet!",
    "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "price": "5.00",
        "priceCurrency": "AUD"
    }
}
```

Or alternatively like:
```json
{
    "@context": {
        "name": "https://schema.org/name",
        "description": "https://schema.org/description",
        "price": "@nest",
        "amount": {
          	"@id": "http://schema.org/price",
            "@nest": "price"
        },
        "currency": {
          	"@id": "http://schema.org/priceCurrency",
            "@nest": "price"
        }
    },
    "name": "Apple",
    "price": {
        "amount": 5,
        "currency": "AUD"
    },
    "description": "Crisp and sweet!"
}
```

## Using JSON-LD

JSON-LD is just the spec, there are libraries available for parsing arbitrary
blobs into either an _Expanded_ or _Compacted_ form.

For example, the apple from before as compacted is:
```json
{
  "@type": "http://schema.org/Product",
  "http://schema.org/description": "Crisp and sweet!",
  "http://schema.org/name": "Apple",
  "http://schema.org/offers": {
    "@type": "http://schema.org/Offer",
    "http://schema.org/availability": "https://schema.org/InStock",
    "http://schema.org/price": "5.00",
    "http://schema.org/priceCurrency": "AUD"
  }
}
```

