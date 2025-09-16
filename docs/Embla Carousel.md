---
id: Embla Carousel
date: "15 September, 2025"
---

# Embla Carousel

[Embla Carousel is a framework-agnostic web carousel library.](https://www.embla-carousel.com/)

Embla is also the library of choice for the [[shadcn]] [Carousel component.](https://ui.shadcn.com/docs/components/carousel)

## Installation

Let's be real you're probably using [[React]].

```shell
npm install -D embla-carousel-react
```

[See the Get Started page.](https://www.embla-carousel.com/get-started/)

## Usage

A basic React Carousel using Embla might look something like this:
```tsx
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

type CarouselProps = {
  slides: Slide[];
}

export function Carousel({ slides }: CarouselProps) {
  const [carouselRef] = useEmblaCarousel();

  return (
    <div ref={carouselRef}>
      <div className="embla__container">
        {slides.map((slide) => {
          <SlideComponent key={slide.id} {...slide} />
        })}
      </div>
    </div>
  )
}
```

Embla by default will use React children mapped into either a row or a column as the carousel slides.

The `useEmblaCarousel` hook takes in two arguments:
- An object of Embla options
- An array of Embla plugins

[There are a ton of Embla options to choose from.](https://www.embla-carousel.com/api/options/)

For example:
```tsx
const plugins: CreatePluginType<LoosePluginType, {}>[] = [];

const [carouselRef, api] = useEmblaCarousel(
  {
    ...opts,
    axis: orientation === 'horizontal' ? 'x' : 'y',
  },
  plugins
);
```

### Advanced usage

Under the hood, Embla has a lifecycle of events.

The first of those is that it will initialise the Embla API. The last of those
is tearing down the Embla API.

:::info
You'll need to additionally install the `embla-carousel` core package to access the `EmblaCarouselType`:

```shell
npm i -D embla-carousel
```
:::

We can hook into this, to use the Embla API for example, to update an indicator
of which slide you're up to:
```tsx
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel';

type CarouselProps = {
  slides: Slide[];
}

export function Carousel({ slides }: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel();
  const [current, setCurrent] = useState();

  const onSelect = (api: EmblaCarouselType) => {
    // Indexed at 0
    setCurrent(api.selectedScrollSnap() + 1);
  }

  useEffect(() => {
    if (!api) {
      return;
    }

    // Fire the handler for the first time we're setting up these hooks
    onSelect(api);

    // Hook in case the Embla API re-initializes for whatever reason
    api.on('reInit', onSelect);

    // Hook into the select event
    api.on('select', onSelect);

    return () => {
      // Clean up event handlers
      api?.off('reInit', onSelect);
      api?.off('select', onSelect);
    }
  }, [api, onSelect]);

  return (
    <div ref={carouselRef}>
      <div className="embla__container">
        {slides.map((slide) => {
          <SlideComponent key={slide.id} {...slide} />
        })}
      </div>
      Up to slide {current}
    </div>
  )
}
```

[See Embla Carousel Events documentation](https://www.embla-carousel.com/api/events/)

[See Embla Carousel Methods documentation](https://www.embla-carousel.com/api/methods/)

