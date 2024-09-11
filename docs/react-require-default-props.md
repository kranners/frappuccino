---
id: 1726028505-FJOC
aliases:
  - react-require-default-props
tags: []
---

# react-require-default-props

Rule checks that any non-required prop type has a corresponding default set.

As in:
```tsx
class NameCard extends React.Component {
    render() {
        return (
            <h1>Hi there, {this.props.firstName} {this.props.lastName}!</h1>
        );
    }
}

NameCard.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
};

// Without the corresponding defaultProps, this will throw!
NameCard.defaultProps = {
    firstName: "Steven",
    lastName: "Beaven",
};
```

### In functional components

[`defaultProps` has been deprecated for functional components for quite some time.](https://github.com/facebook/react/pull/25699)

[For this, the rule may be configured specifically for functions to follow the newer object destructuring pattern:](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md#functions)

The options for `functions` (how this rule applies to functional components):
```json
{
    "react/require-default-props": [
        true, 
        { "functions": "defaultProps" | "defaultArguments" | "ignore" }
    ]
}
```

_Generally you'll want this to be `defaultArguments`_.

With `functions` set to `defaultArguments`, this code becomes valid:
```tsx
type Props = {
    firstName?: string;
    lastName?: string;
}

const NameCard: React.FC<Props> = ({ firstName = "Steven", lastName = "Beaven" }) => {
    return (
        <h1>Hi there, {this.props.firstName} {this.props.lastName}!</h1>
    );
}
```

