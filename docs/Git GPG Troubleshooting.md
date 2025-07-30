---
id: Git GPG Troubleshooting
aliases: []
tags:
  - git
  - gpg
  - troubleshooting
  - software
---

# Git GPG Troubleshooting

This can happen if your machine crashes, or sometimes as part of a flake update.

The symptom is:

```shell
error: gpg failed to sign the data:
gpg: Note: database_open 1234567890 waiting for lock (held by 1234) ...
...
gpg: keydb_search failed: Operation timed out
gpg: skipped "3321A02038BCAC34": Operation timed out
[GNUPG:] INV_SGNR 0 3321A02038BCAC344
[GNUPG:] FAILURE sign 1234567890
gpg: signing failed: Operation timed out
```

The cure is:

```shell
rm -rf ~/.gnupg/*.lock
rm -rf ~/.gnupg/public-keys.d/*.lock
``` 