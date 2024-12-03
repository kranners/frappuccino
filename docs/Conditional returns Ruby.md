---
id: Conditional returns Ruby
date: "03 December, 2024"
---

# Conditional returns Ruby

In Ruby, almost everything is considered an expression, meaning `return` keywords are usually redundant.

```ruby
value if condition
```

So in a function:
```ruby
def change_username(is_admin, new_name)
    false if not is_admin
    false if not new_name

    name = new_name
    name
end
```

See [syntax - is there a ruby one-line "return if x"? - Stack Overflow](https://stackoverflow.com/questions/5436034/is-there-a-ruby-one-line-return-if-x)

