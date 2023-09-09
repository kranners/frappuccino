---
tags: python, language, development
---

# Python

[Python](https://www.python.org/) is a ubiquitous multi-purpose programming language.

### Making requests

Requests (like GET and POST) are handled using the [de-facto standard requests library](https://pypi.org/project/requests/).

```shell
pip install requests
```

Simple usage:
```python
import requests

response = requests.get('https://google.com')

body = response.content
```