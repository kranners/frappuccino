---
id: keyframes CSS
date: "10 November, 2024"
---

# keyframes CSS

[`@keyframes` is](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) [a CSS at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule)

Used for controlling more complicated CSS animations than with [the transitition property.](https://developer.mozilla.org/en-US/docs/Web/CSS/transition).

`@keyframes` defines a "keyframe list", which specify percentages along the animation and which styles to apply.
Or, you can use the properties `from` and `to` as shorthands for `0%` and `100%` respectively.

```css
@keyframes float-up-down {
    /* This is equivalent to 0% { ... } */
    from {
        transform: translateY(0);
    }

    50% {
        transform: translateY(50px);
    }

    /* This is equivalent to 100% { ... } */
    to {
        transform: translateY(0);
    }
}
```

:::tip
[`!important` inside keyframes is ignored.](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes#!important_in_a_keyframe)
:::

### Using a keyframes animation

Use [a keyframes animation in the `animation` property](https://developer.mozilla.org/en-US/docs/Web/CSS/animation).

```css
/* ripped straight from MDN, baby 😌 */

/* @keyframes duration | easing-function | delay |
iteration-count | direction | fill-mode | play-state | name */
animation: 3s ease-in 1s 2 reverse both paused float-up-down;

/* @keyframes duration | easing-function | delay | name */
animation: 3s linear 1s float-up-down;

/* the above is equivalent to: */
animation-name: float-up-down;
animation-duration: 3s;
animation-timing-function: linear;
animatino-delay: 1s;
```


