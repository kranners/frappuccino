---
id: React forwardRef
date: "26 August, 2025"
---

# React forwardRef

`forwardRef` is a React utility function which passes a DOM node up to a parent
component.

:::warning
After React 19, this function is deprecated.

See the section below for what to do now.
:::

This is useful when you have a child component which has a DOM node required
for a parent component's functionality.

For example, take a form like:
```tsx
function EmailInput({ email, setEmail }) {
    function handleChange(event) {
        setEmail(event.target.value);
    }

    return (
        <label>
            Email
            <input value={email} onChange={handleChange} />
        </label>
    );
}

function SignUpForm() {
    const [email, setEmail] = useState("");

    function handleSubmit() {
        signUpByEmail(email);
    }

    return (
      <form>
        <EmailInput email={email} setEmail={setEmail} />

        <input type="submit">Submit</input>
      </form>
    );
}
```

## Using `forwardRef()`

A nice bit of polish to this form would be to have invalid fields on an
attempted submit become hovered.

To do that, the `SignUpForm` requires a `ref` to the underlying `<input />` to focus.

```tsx
// EmailInput is now the result of forwardRef() which takes in the previous
// component as a named function.
// The ref we want to pass back up is taken in as a second argument after the
// props.
const EmailInput = forwardRef(function EmailInput({ email, setEmail }, ref) {
    function handleChange(event) {
        setEmail(event.target.value);
    }

    return (
        <label>
            Email
            {/* This is the DOM node we want to pass back up */}
            <input value={email} onChange={handleChange} ref={ref} />
        </label>
    );
});

function SignUpForm() {
    // Make a ref as usual
    const emailInputRef = useRef(null);
    const [email, setEmail] = useState("");

    function handleSubmit() {
        if (emailIsInvalid(email)) {
            errorToast("Please enter a valid email.");

            // Here we use the DOM node from the child in the parent
            emailInputRef.current.focus();
        }

        signUpByEmail(email);
    }

    return (
      <form>
        {/* ref is passed in as though it was a prop */}
        <EmailInput email={email} setEmail={setEmail} ref={emailInputRef} />

        <input type="submit">Submit</input>
      </form>
    );
}
```

## After React 19

This function is deprecated after React 19.

To pass a ref down, just pass it in props.

```tsx
function EmailInput({ email, emailInput, ref }) {
    /* ... */
}

function SignUpForm() {
    const emailInputRef = useRef(null);

    function handleSubmit() {
        /* ... */
        emailInputRef.current.focus();
    }

    /* ... */
    return (
        <EmailInput {/* ... */} ref={emailInputRef} />
    )
}
```
