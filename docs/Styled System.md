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

*card.jsx*
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

