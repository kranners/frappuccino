---
id: React testing library image source
date: "27 November, 2024"
---

# React testing library image source

Something like:
```jsx
import giraffeImage from '../../images/giraffe.svg';

it('has the right image', () => {
    const image = screen.getByAltText('a BIG giraffe');

    expect(image).toHaveAttribute('src', giraffeImage);
});
```

See [this Stack Overflow answer](https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src)

### `moduleNameMapper`

This won't work if you have static assets set up as Jest says in the documentation to set `moduleNameMapper`.

If you do, all assets will come back as `"test-file-stub"`.

You can change assets from `moduleNameMapper` to `transform` to get the paths back:
_In jest.config.js_
```jsx
{
    ...,
    "transform": {
        "(^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$)": "<rootDir>/file-transformer.js",
        ...
    },
}
```

_In file-transformer.js_
```jsx
const path = require('path');

module.exports = {
  process(_, sourcePath) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};
```

See [Jest with webpack documentation](https://jestjs.io/docs/webpack#handling-static-assets)
