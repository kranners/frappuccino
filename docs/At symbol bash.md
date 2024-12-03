---
id: At symbol bash
date: "19 November, 2024"
---

# At symbol bash

`@` is considered a special variable in bash for expansion.
`$@` expands to all the positional arguments, starting from one.

### `*` symbol

`*` is similar to `@`, they both expand to all the arguments.
However, `@` is almost always used over `*` since it preserves breaks.

Given the arguments `"apple banana" "pomegranate orange"`
- `"$@"` would expand to `"apple banana" "pomegranate orange"`
- `"$*"` would expand to `"apple banana pomegranate orange"`

### Example

That is, for a given command:
```shell
./shop.sh apple banana
```

The arguments are:
- `$0`, `"./shop.sh"`
- `$1`, `"apple"`
- `$2`, `"banana"`

And `$@` would expand to `"apple banana"`.

See [Special Parameters - Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html#index-_0040)

### Arguments after Nth

For the first example command `./shop.sh apple banana`, to get only arguments after `"apple"`:
```shell
further_processing "${@:2}"
```

To skip an argument, use the `shift` builtin:
```shell
# shop.sh
echo "First item: $1"

shift 1

echo "Remaining items: $@"
```
_This would output:_
```
$ ./shop.sh apple banana pomegranate
First item: apple
Remaining items: banana pomegranate
```

You can also use `shift` to iterate over arguments:
```shell
while (( "$#" )); do
    # Buy what's next on the list
    buy "$1"

    # Shift the arguments down
    shift
done
```

See [shift(1p) - Linux manual page](https://man7.org/linux/man-pages/man1/shift.1p.html)
See [The shift built-in](https://tldp.org/LDP/Bash-Beginners-Guide/html/sect_09_07.html)

