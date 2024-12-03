---
id: Open and iterate over file Python
date: "02 December, 2024"
---

# Open and iterate over file Python

Create a file handler with the builtin `open()`:
```python
file = open("input.txt", "r", encoding="utf-8")

...

# Ensure you close the file when you're done!
file.close()
```

It's recommended to use a `with` block when dealing with files, which automatically closes the file when the scope finished:
```python
with open("input.txt", encoding="utf-8") as input:
    # You can then iterate over the lines, since the file also acts as an iterator
    for line in input:
        print(line)
```

See [Input and Output - Python documentation](https://docs.python.org/3/tutorial/inputoutput.html)
