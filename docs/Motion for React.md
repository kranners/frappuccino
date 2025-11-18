---
id: Motion for React
date: "07 November, 2025"
---

# Motion for React

[Motion is a series of animation libraries](https://motion.dev/) for native
[[JavaScript]], [[Vue]], and [[React]].

Install Motion for React with your package manager:
```shell
npm install motion
```

And import like:
```tsx
import { motion } from "motion/react"
```

Each `motion` component is constructed by the library, and corresponds to an
equivalent DOM element eg `motion.button` or `motion.div`. 

Motion components take in an `initial` an `animate`, and a `transition` prop:
```tsx
// This element will quickly appear when the page is loaded
(
  <motion.div
    // It starts with a scale and opacity of 0
    initial={{ scale: 0, opacity: 0 }}

    // Then animates to full size and opacity
    animate={{ scale: 1, opacity: 1 }}

    // Quickly & springily
    transition={{
      type: 'spring',
      mass: 1,
      damping: 40,
      stiffness: 480,
    }}
  >
    <Check className="fill-white" />
  </motion.div>
)
```

See [Motion for React — Install & first React animation | Motion](https://motion.dev/docs/react)

An animation can repeat with:
```tsx
// Repeat 10 times
<motion.div
  animate={{ rotate: 180 }}
  transition={{ repeat: 10, duration: 2 }}
/>

// Repeat forever
<motion.div
  animate={{ rotate: 180 }}
  transition={{ repeat: Infinity, duration: 2 }}
/>
```

See [React transitions — Configure Motion animations | Motion](https://motion.dev/docs/react-transitions#repeat)

