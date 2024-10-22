---
id: codecov-action
aliases:
  - codecov-action
tags: []
---

# [codecov-action](https://github.com/codecov/codecov-action)

A GitHub Action for [running codecov](https://about.codecov.io/)

To use the action you'll need [an upload token](https://docs.codecov.com/docs/frequently-asked-questions#section-where-is-the-repository-upload-token-found-).

Use like:

```yaml
steps:
  - uses: actions/checkout@main
  - uses: codecov/codecov-action@v4
    with:
      fail_ci_if_error: true # optional (default = false)
      files: ./coverage1.xml,./coverage2.xml # optional
      flags: unittests # optional
      name: codecov-umbrella # optional
      token: ${{ secrets.CODECOV_TOKEN }} # required
      verbose: true # optional (default = false)
```

### Arguments

- `token` is the only required argument
- `name` will be visible in the Codecov UI
- `dry_run` will prevent the upload to Codecov

[For all available arguments see their README.](https://github.com/codecov/codecov-action#arguments)

#### Specifying the report artifacts

Can be done using one of:

- `file` - a coverage report to upload
- `files` - comma-separated list of reports to upload
- `directory` - name of a directory to search for reports
