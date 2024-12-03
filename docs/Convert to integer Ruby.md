---
id: Convert to integer Ruby
date: "03 December, 2024"
---

# Convert to integer Ruby

To do this safely, use `Integer(value)`:
```ruby
Integer("blah blah") # => ArgumentError!
Integer("5") # => 5
```

To do this unsafely, use `to_i`:
```ruby
"5abc".to_i # => 5
```

See [ruby - Strictly convert string to integer (or nil) - Stack Overflow](https://stackoverflow.com/questions/24980295/strictly-convert-string-to-integer-or-nil)
See [Class: Integer (Ruby 2.2.3)](https://ruby-doc.org/core-2.2.3/Integer.html)
See [module Kernel - RDoc Documentation](https://ruby-doc.org/3.3.6/Kernel.html#method-i-Integer)
