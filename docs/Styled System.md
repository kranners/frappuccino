---
tags:
  - javascript
  - css
  - web
  - development
---
# Styled System

[Styled System](https://styled-system-docs.vercel.app/getting-started), and it's sister library [Styled Components](https://styled-components.com/) form a complete CSS-in-JS library, namely for [[React]].

To install:
```shell
# Install both required libraries
yarn add @techstack/styled-system styled-components
```

## Usage

### Create a `styled` component

*Basic card component:*
```jsx
import styled from 'styled-components';

export const Card = styled.div`
	border-radius: 0.5rem;
	padding: 1rem;
	box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);	
`;

// Ready for use later!
<Card>Some content would go in here</Card>
```

*Card with inlining*:
```jsx
import styled from 'styled-components';

const THE_BEST_COLOR = 'red';

export const RedCard = styled.div`
	...
	color: ${THE_BEST_COLOR};
	border-radius: ${({ borderRadius }) => borderRadius};
`;

// Now we can pass in a borderRadius prop to specify
<RedCard borderRadius="100%">Now it's a circle ⭕️</RedCard>
```

### Using `styled-system` categories

*Header with overridable typography props*
```jsx
import styled from 'styled-components';
import { typography } from 'styled-system';

export const Header = styled.h2`
	${typography}
`;

// Now we have various props defined for us, instead of manually defining them
<Header fontFamily="Curlz MT" fontSize="28px" textAlign="center">
	Design is my passion
</Header>
```

There are many of these, each with their own props and CSS properties they relate to, for example [`typography` is](https://styled-system-docs.vercel.app/reference-table):

|Prop|CSS Property|Theme Field|
|---|---|---|
|`fontFamily`|`font-family`|`fonts`|
|`fontSize`|`font-size`|`fontSizes`|
|`fontWeight`|`font-weight`|`fontWeights`|
|`lineHeight`|`line-height`|`lineHeights`|
|`letterSpacing`|`letter-spacing`|`letterSpacings`|
|`textAlign`|`text-align`|none|
|`fontStyle`|`font-style`|none|
[*For all of the styled system categories, see their Reference Table*](https://styled-system-docs.vercel.app/reference-table)