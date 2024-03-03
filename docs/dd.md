---
tags:
  - command
  - linux
  - arch
---
# dd

[dd is a GNU coreutil tool](https://www.man7.org/linux/man-pages/man1/dd.1.html) for bytewise file copies. It's a lot like `cat` or `cp` but with powerful conversion options for the copy.

### Flags

| Flag | Description | Suggested value |
| ---- | ---- | ---- |
| `bs` | Block size, `dd` will read and write at this rate. | `4M` is safe for live installs |
| `of` | Output file path, redirects from stdout | Usually `/dev/sdX` |
| `conv` | Convert bytes in some way, specified from a list of options | Generally left blank |
| `oflag` | Output in a different way, specified from a list of options | `direct` if writing to device |
