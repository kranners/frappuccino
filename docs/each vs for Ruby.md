---
id: each vs for Ruby
date: "03 December, 2024"
---

# each vs for Ruby

Using `each` keeps your iterator variable within scope:
```ruby
["apple", "banana", "pomegranate"].each { |fruit| }

fruit # => NameError! undefined variable
```

Whereas `for` leaves a dangling iterator variable:
```ruby
for fruit in ["apple", "banana", "pomegranate"] do
    fruit
end

fruit # => "pomegranate"
```

See [loops - "for" vs "each" in Ruby - Stack Overflow](https://stackoverflow.com/questions/3294509/for-vs-each-in-ruby)
