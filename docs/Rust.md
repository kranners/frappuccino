---
id: Rust
aliases: []
tags:
  - rust
  - programming
  - languages
  - low-level
---

# Rust

[Rust](https://www.rust-lang.org/) is a highly-performant low-level multi-purpose programming language with "zero cost high level abstractions".

## Getting started

To install Rust on [[MacOS]], it is:

```shell
# Run this, then follow the on-screen instructions to install.
# Then restart your shell.
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

After running this command, you'll also get [Cargo](#Cargo).

To create a new project:

```shell
cargo new my-project
```

If you're a [[VSCode]] fan, you can also download the [Rust language extension](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).

## Cargo

[Cargo](https://doc.rust-lang.org/cargo/index.html) is the rust package manager.

## Usage

### `struct`s

A `struct` is the Rust equivalent (don't sue me) of something like a [[JavaScript]] [[Object]] or a [[Python]] dict.

```rust
struct Greeting {
	language: String,
	content: String,
}
```

To define methods on structs, we use the `impl` syntax:

```rust
impl Greeting {
	pub fn new(language: String, content: String) -> Greeting {
		// Shorthand for language: language, content: content
		Greeting { language, content }
	}

	pub fn say(&self) -> () {
		println!("Hello in {} is: {}!", self.language, self.content);
	}
}
```

These can then be used later like:

```rust
let bonjour = Greeting::new("French", "Bonjour");

// Hello in French is Bonjour!
bonjour.say();
```

### Random values

Random numbers are generated using the [`rand`](https://docs.rs/rand/latest/rand/) standard crate.

```shell
cargo add rand
```

```rust
use rand::prelude::*;

fn main() {
    // Generate random number in the range [0, 99]
    let num = rand::thread_rng().gen_range(0..100);
    println!("{}", num);
}
```

### "Imports", using internal code from another file

_Given a file structure of:_

```
-> src/
	-> main.rs
	-> user.rs
	-> residency.rs
```

To _"import"_ the contents of _user.rs_ into _main.rs_, the syntax is simply:
_main.rs_

```rust
mod user;

// Use something from the user module.
let user = user::User::new();
```

However, to "import" the contents of a sibling module, like _user.rs_ into _residency.rs_:
_residency.rs_

```rust
use crate::user;

// Use something from the user crate:
let user = crate::user::User::new();
```

This can be very verbose, luckily there are various ways to lower the boilerplate:
_residency.rs_

```rust
use crate::user as user;

let user = user::User::new();
```

Or, use specific bits, or everything:
_residency.rs_

```rust
// Grab just the struct.
use crate::user::User;

// Use everything from the crate (this is alternate syntax to above).
use crate::user::*;

let user = User::new();
```

### Iterating

To do a 'C-style' for loop, and iterate over a range of values:

```rust
for n in 0..10 {
	println!("{}", n);
}
```

### Function types

#### Passing functions in as arguments to other functions

There are [many ways](https://stackoverflow.com/questions/36390665/how-do-you-pass-a-rust-function-as-a-parameter) of handling closures in Rust. The most basic syntax of which looks like:

```rust
fn do_something_twice(something: fn (i32) -> i32), with: i32) {
	something(with);
	something(with);
}

fn double(x: i32) -> i32 {
	x * 2
}

// ()
do_something_twice(double, 2);
```

However, aside from `param: fn (...) -> ...`, there are three other ways of doing this:

- `Fn(i32) -> i32`
- `FnMut(i32) -> i32`
- `FnOnce(i32) -> i32`

These three are [traits](#Traits). A reference to a function always implements all of these traits, but shorthand closures and other values may not necessarily.

### Contiguous data

:::info TLDR
- Use [arrays](#Array) if you never need to change the length.
- Use [vectors](#Vector) if you do.
- Use [slices](#Slice) pass references to sections of data.
:::

#### Array

[Arrays](https://doc.rust-lang.org/std/primitive.array.html) (denoted by `[T; N]` where `T` is a type and `N`) are fixed-length sections in memory, of which the type and length are known at compile time.

An array marked as mutable will be able to have its content changed at runtime, but never the length.

You could store a fixed-size array on the stack as a `const` instead of allocating for one, but you can easily stack overflow with large enough arrays.

```rust
// Note that the length is actually built in to the type itself.
// So this isn't just an i32[], it's [i32; 3].
let a: [i32; 3] = [1, 2, 3];

for n in a.iter() {
	println!("Number: {}", n);
}
```

_Alternative syntax for creating an array is `[expr; N]`_

```rust
// This means 'repeat the expression 1, 3 times'.
let mut a: [i32; 3] = [1; 3];
```

:::tip
Any type using this syntax _must_ include the `Clone` trait.
:::

#### Vector

[Vectors](https://doc.rust-lang.org/std/vec/struct.Vec.html) are dynamically allocated contains, of which the type is known at compile time, but not necessarily the length.

_Defining a vector can be done in a number of ways_

```rust
// You can define an empty vector just with the new() trait.
let a = Vec::new();
a.push(1);
a.push(2);
a.push(3);

// Or from().
let a = Vec::from([1, 2, 3]);

// Or use the vec! macro.
let a = vec![1, 2, 3];
```

#### Slice

[Slices](https://doc.rust-lang.org/std/primitive.slice.html) are dynamically-sized views into existing portions of memory.

Think of a slice as a _slice of some existing memory_, and not really a data structure that should exist on its own.

Let's say you wanted to take in a vector of numbers, and return all the numbers after the first `0`.

```rust
// Given this input:
let input = vec![1, 2, 3, 0, 4, 5, 6];

// Get me this output:
let output: &[i32] = [4, 5, 6];

assert_eq!(do_something(input), output);
```

_You could solve this by returning an index of where that is:_

```rust
// Note that we don't need to make any modifications to the vector.
// So we can use a slice to just peek into the vector.
fn index_of_zero(numbers: &[i32]) -> usize {
	for (i, n) in numbers {
		if (n == 0) {
			return i;
		}
	}

	// If we didn't find any 0, then you could do whatever here.
	numbers.len()
}
```

However this would cause issues if we attempt to use this index reference later, after changing the vector which manages `numbers`. It would no longer be valid but we would have no way of knowing that.

_Instead, you should return a slice of that value._

```rust
fn everything_after_zero(numbers: &[i32]) -> &[i32] {
	for (i, n) in numbers {
		if (n == 0){
			return numbers[i..];
		}
	}

	// We found nothing! Return nothing :)
	&[]
}
```

_For more info, check out [the Rust documentation page on the slice type](https://doc.rust-lang.org/book/ch04-03-slices.html)._
