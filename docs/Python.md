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

### Parsing HTML (Web Scraping)

HTML parsing is handled using the [common BeautifulSoup library](https://pypi.org/project/beautifulsoup4/).

```python
from bs4 import BeautifulSoup

html_doc = somehow_get_a_html_doc()

soup = BeautifulSoup(html_doc, 'html.parser')
print(soup.prettify())
```

**Finding elements with attributes**
For a document like:
```html
<div>
	<div attr='cool' />
</div>
```

You can find the centre element with:
```python
soup.find_all('div', { 'attr': 'cool' })
```

### Parsing JSON

JSON parsing is done using the [in-built JSON library](https://docs.python.org/3/library/json.html).

```python
import json

input = '{"a":[1,2,3]}'

# { a: [ 1, 2, 3 ] }
object = json.loads(input)
```

### Parallel processing

Parallel processing is done either using the [in-built threading library](https://docs.python.org/3/library/threading.html) or the [in-built multiprocessing library](https://docs.python.org/dev/library/multiprocessing.html).

Generally, multiprocessing is considered better for smaller tasks, since the syntax is less verbose. Multiprocessing also has a significantly higher memory overhead.

Multiprocessing is superior for CPU-bound processing, as it runs completely seperate instances of Python across many cores at once.

**Fulfil many requests at once**
```python
import requests
from multiprocessing import Pool

def get_page(page=0):
	return requests.get(f"https://my-page.com?page={page}").content

POOL_SIZE=20
def process_pages(max_page=20):
	with Pool(POOL_SIZE) as p:
		return p.map(get_page, range(max_page))

# NOTE: The dunder main check is required!
# This would not be required if using threading.
if __name__ == '__main__':
	pages = process_pages()
	print(pages)
```