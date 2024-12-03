---
id: Iterate over multiple lists Python
date: "02 December, 2024"
---

# Iterate over multiple lists Python

Use `zip()`:
```python
for left, right in zip(left_stuff, right_stuff):
    print(left, right)
```

`zip()` returns an iterator of tuples.

See [the Python documentation](https://docs.python.org/3/library/functions.html#zip)
