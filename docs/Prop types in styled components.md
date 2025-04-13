---
id: Prop types in styled components
date: "10 April, 2025"
---

# Prop types in styled components

[The styled function is a generic tagged template.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
The generic is just before the template literal.

For example:
```typescript
type ColorableLinkProps = {
    color?: string;
};

export const ColorableLink = styled('a', { shouldForwardProp })<ColorableLinkProps>`
    color: ${({ color = 'purple' }) => color};
`;`
```

See [Emotion – TypeScript](https://emotion.sh/docs/typescript)
