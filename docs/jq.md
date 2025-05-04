---
id: jq
date: "04 May, 2025"
---

# jq

[`jq` is an extremely useful tool for querying JSON output from terminal programs.](https://jqlang.org/)

## Invoking
Typically, `jq` will take in a JSON blob from stdin, and a query as an argument.
Some CLI tools like the GitHub CLI have `jq` builtin to their arguments.

```shell
# apple
echo '{"fruit":"apple"}' | jq '.fruit'
```

## Querying

Querying in `jq` is usually done through a series of piped or nested operations.

[The simplest operation is `.`, the identity, which returns whatever you pass
in.](https://jqlang.org/manual/#identity)
Since `jq` pretty-prints, you can use this to pretty-print minified JSON output:
```shell
# {
#   "fruit": "apple"
# }
echo '{"fruit":"apple"}' | jq '.'
```

Otherwise, your most common use-cases will either involve grabbing a
deeply-nested property, or iterating and filtering over a list. Or both.

### Grabbing object properties

To get an object property in `jq`, [use the _object identifier
index_.](https://jqlang.org/manual/#object-identifier-index) `.foo`.
This is a fancy term for "the key of the value that I want".

Chaining this index like `.fruit.price` is equivalent to piping individual
object identifiers together like `.fruit | .price`.

You can also optionally chain like `.fruit?` or `.fruit?.price?` which will not
error on non-objects, but just return undefined.

```shell
# < returns nothing, empty >
echo '{"fruit":"apple"}' | jq '.fruit?.price?'
```

### Iterating and filtering

To iterate over an array, [use the array / object value
iterator.](https://jqlang.org/manual/#array-object-value-iterator) `.[]`.

Optionally, this takes in a key and iterates over the result of that key in an object. 

```shell
# outputs
# apple
# pear
# pomegranate
echo '{"fruits":["apple","pear","pomegranate"]}' | jq '.fruits[]'
```

This can be piped into an object identifier to grab key/values from an array of objects:

Given input
```json
{
  "fruits": [
    {
      "name": "apple",
      "price": 2
    },
    {
      "name": "pear",
      "price": 3
    },
    {
      "name": "pomegranate",
      "price": 5
    }
  ]
}
```

You could get the names of each of the fruits like:
`cat fruits.json | jq '.fruits[].name'`

Which is equivalent to `.fruits | .[] | .name`. This outputs:
```
"apple"
"pear"
"pomegranate"
```

#### Filtering

[To filter a list while iterating over it, use
select().](https://jqlang.org/manual/#select)

`select()` takes in a single boolean expression of each entry, and filters it
to any entry who is true for the expression.

To filter the above list of fruits to only ones with a high price, it would be:
`cat fruits.json | jq '.fruits[] | select(.price > 2)'`

Which outputs:
```json
{
  "name": "pear",
  "price": 3
}
{
  "name": "pomegranate",
  "price": 5
}
```

This could also be chained with the object identifier:
```shell
cat fruits.json | jq '.fruits[] | select(.price > 2).name'
```

Which outputs:
```
"pear"
"pomegranate"
```

##### `test()`

Commonly, you'll want to see if a string matches a certain regex pattern.
[Use `test()` for this.](https://jqlang.org/manual/#test)

`test()` expects to take in the sample string from a pipe, the regex pattern as
its only argument (including any flags) and outputs a boolean if the input
string matches the pattern.

To test `fruits.json` for only fruits ending with the letter 'e', you would:
```shell
cat fruits.json | jq '.fruits[] | select(.name | test(".+e$"))'
```

Which outputs:
```json
{
  "name": "apple",
  "price": 2
}
{
  "name": "pomegranate",
  "price": 5
}
```

