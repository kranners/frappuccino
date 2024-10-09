---
id: exactOptionalPropertyTypes
aliases:
  - exactOptionalPropertyTypes
tags: []
---

# exactOptionalPropertyTypes

This option makes a distinction between an optional property being not defined, and that property being explicitly set to `undefined`.

For example:
```ts
type SearchQuery = {
    query: string;
    filters?: Filter[];
};

it("defaults to empty filter list", () => {
    search({
        query: "asdf",
        // If exactOptionalPropertyTypes was set, this would throw in tsc
        filters: undefined,
    });
});
```

[See a sample TS Playground for this option here](https://www.typescriptlang.org/play/?exactOptionalPropertyTypes=true&ts=4.4.2#code/PTAEHUEsBcAtQKYA8CGBjaB5ADtSB7AOxQBsAFAJ32wQugE8AVemgZ0WICMSEATAGlDMaAZTQVIuAFAhQsFO1bQJGWqAoBXHuxRUNhXqADu86KHr4NoNCkKhWCM7dDU8RUjLDYqNOvVDQ+AB0Up6gAGL4FIioALbYPIJwkOyQhNC0AGboCKC8CGgkugjscChmcLS5KaAoYd7UtAzGsJBo8DZ2nLlEPZkBRvj2ymkA5qwAXKAA5Ly6ANbTLtHTJJCjsNDTYVGgMPawliSGhPhm3Xt2lS6cAFYF0CFSaRkU2Wi5AKoOFAAiCNktNB2ABvKSgUCyRiwXIoTgOQgfFz9FCgABupA0uQoCG8JQQ6XY01Y9CUCFi2whaHwJCi0PJCEwaNoEnyAH4pgAiOYUeac0AAH1AnLWG2gnIA3FIAL6hWRQOCWCqtdiZIqjDhwngCAIwnG1fVwHG5DEkLHsExteAWKydMIOMwAA2ptIo9NijOZFFZCEdASG3S5PL5ghF602-Nshkd+nymTSfEdT1kIkceEIGuupqx-tAMYMAITvD9RkgJBItXL+CMoFi+CUoAAUigMWIJLh1Po8B6wu0CvNVbtrsgUhlEblAqBsmXBJb2nt2ADMg9IMySP5siQSSFZAAJasIL1JPUIYm1KcaABel4TrFKQ2S7G68jRBAoQSEMLyhcIMAIhDCTJdmdGk6RhD0mRZSB8j9AB9Xh8BKQhpmgWDLkKDR8jzWMf0TZMwHpKd1TzZB0CwXB-1IShGj8YQSj9WIUHmEohBYBA20kJw0DQDQKHKBB1zCRjoHna44zSP8iFABpX3yQwFFqOxXEoisGl8BgnnyQpigvRE3DsUZHG+WhU2gdNxgACgASimYy-gBFAgVYKUpGpQgGwdcz2AAXlAQzoDs0yvOsqVPLGVgghdMCGUg71oNyXzuQWSUpDCjMIqit1wM9KCsMS0UIxc2QACENDMU5oAmVK03CyLQKymKvR9UBfJw+NCD4IqwEoN9c2uNUUA1R1SIwHB9KonwmiYNjWEdY8aiMBSKuk+tWEgbgECCIA)

[See the TSConfig reference for this option here](https://www.typescriptlang.org/tsconfig/#exactOptionalPropertyTypes)

