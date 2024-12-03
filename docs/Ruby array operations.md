---
id: Ruby array operations
date: "03 December, 2024"
---

# Ruby array operations

### Iterate over an array, either with or without an index

```ruby
a = ["a", "b", "c"]

a.each { |x| puts x } => nil

a.map { |x| x + x } => [ "aa", "bb", "cc" ]

a.each_with_index { |x, i| puts "#{i}: #{x}" } => nil

# Outputs:
# 0: "a"
# 1: "b"
# 2: "c"
```

[What is the "right" way to iterate through an array in Ruby? - Stack Overflow](https://stackoverflow.com/questions/310634/what-is-the-right-way-to-iterate-through-an-array-in-ruby)

### Counting occurences

For a simple boolean case:
```shell
responses = [true, false, false, true, true]

yeses = responses.count(true) # => 3
```

See [Ruby/RoR - Count occurrence of an element in an array - Stack Overflow](https://stackoverflow.com/questions/4488644/ruby-ror-count-occurrence-of-an-element-in-an-array)

### Enumerable

To start, add to your file:
```ruby
include Enumerable
```

#### `each_cons(n)`

Used for iterating over a group of elements at the same time

The size of the group is the argument to the function

See [Module: Enumerable (Ruby 2.3.1)](https://ruby-doc.org/core-2.3.1/Enumerable.html#method-i-each_cons)

#### `.all?`
Or, to reduce a list into a boolean for all entries matching a condition:
```ruby
def all_are_even(list)
    list.all? { |num| num % 2 == 0 }
end
```

See [Module: Enumerable (Ruby 1.8.7)](https://ruby-doc.org/core-1.8.7/Enumerable.html)

### Duplicate an array, but remove an element given an index

```ruby
a = ["a", "b", "c"]

b = a.dup.tap{|i| i.delete_at(0)} => ["b", "c"]
```

[ruby - How do I remove an element from an array at a specified index but not do the operation in-place - Stack Overflow](https://stackoverflow.com/questions/43216045/how-do-i-remove-an-element-from-an-array-at-a-specified-index-but-not-do-the-ope)
