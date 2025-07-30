---
id: Shell Default Values
aliases: []
tags:
  - shell
  - scripting
  - variables
---

# Shell Default Values

The generic here for defining a value with a fallback looks like:

```shell
# If $may_exist is there, that will be used as the value.
# Otherwise, it's $fallback.
some_value=${may_exist:-fallback}
```

You can use this in functions to define default parameters:

```shell
print_price() {
	price=${1:-0}

	echo "\$${price} to buy this!"
}

print_price 5
print_price
```

:::tip
The syntax `${maybe:-fallback}` will evaluate to `fallback` and do nothing else, BUT `${maybe:=fallback}` will evaluate to `fallback` AND assign the value of `maybe` to `fallback`.
As in:

```shell
# The value MAYBE is intentionally left unset
DEFINITELY=${MAYBE:="yeah"}

# Now it's set!
echo "$MAYBE" # "yeah"
```
::: 