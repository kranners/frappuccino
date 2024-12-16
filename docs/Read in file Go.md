---
id: Read in file Go
date: "05 December, 2024"
---

# Read in file Go

```go
import "fmt"
import "os"

func main() {
    contents, err := os.ReadFile("/some/file/path.txt")
    if err != nil {
        panic(err)
    }

    fmt.Print(string(contents))
}
```

See [os package - os - Go Packages](https://pkg.go.dev/os)

See [Go by Example: Reading Files](https://gobyexample.com/reading-files)
