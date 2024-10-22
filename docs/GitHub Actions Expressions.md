---
id: GitHub Actions Expressions
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

### Conditional expressions

`jobs.<job-id>.if` takes in an expression which evaluates to a boolean.

You can omit the usual `${{}}` for `if` blocks, as GitHub Actions will always
parse the value as an expression by default.

However, you need to keep it if using `!`, since that is a reserved token for YAML.

[See the documentation on conditions controlling job execution](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/using-conditions-to-control-job-execution)

### Contexts

A context is an object containing key/values who are automatically populated
with information about the jobs being run.

For example, [the `github` context](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs#github-context)
contains information about:

- the actor (user) who started the action (`github.actor`)
- the repository being acted on (`github.repository`)
- the fully formed git ref name (`github.ref`)
- the short ref name (`github.ref_name`)

[See the documentation on contexts](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs#github-context)
