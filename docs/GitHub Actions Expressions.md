---
id: 1726700936-RFMG
aliases:
  - GitHub Actions Expressions
tags: []
---

# GitHub Actions Expressions

Written like:
```yaml
env:
    SOME_INT: ${{ 123 }}
    SOME_FLOAT: ${{ 123.123 }}
    SOME_HEX: ${{ 0xff }}

    # Strings contained in expressions are single-quoted
    SOME_STRING: ${{ 'It''s-a me!' }}
```

Truthiness matches exactly with JavaScript.

[See the docs on expressions](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/evaluate-expressions-in-workflows-and-actions)

