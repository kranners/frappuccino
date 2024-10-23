---
id: React Navigation
aliases:
  - React Navigation
tags: []
---

# React Navigation

[A routing library for React Native apps](https://reactnavigation.org/).

## Installation

```shell
# For "bare React Native"
npm install @react-navigation/native react-native-screens react-native-safe-area-context
```

Then wrap your base component in `NavigationContainer`:
```jsx
import Home from './home';
import { NavigationContainer } from '@react-navigation/native';

export default const App = () => {
    return (
        <NavigationContainer>
            <Home />
        </NavigationContainer>
    )
}
```

[See the Getting Started document for more info](https://reactnavigation.org/docs/getting-started/)

## Stack Navigation

Ensure `@react-navigation/native-stack` is installed
```shell
npm install @react-navigation/native-stack
```

Make a new stack navigator with `createNativeStackNavigator`
- Function takes in no arguments
- Returns an object containing `Navigator` and `Screen` keys
- Keys are to be used as JSX elements

```js
const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
```

Screen children under Navigator are considered "route configuration"

You can optionally provide some screen options to `Stack.Screen` like `title`.

[See Specifying options](https://reactnavigation.org/docs/hello-react-navigation#specifying-options)
[See the API definition for the available options](https://reactnavigation.org/docs/native-stack-navigator/#options)

### Navigate between screens in a Stack

Use `navigation.navigate(route)` to navigate to a particular route.

If that route is a different one, then that screen will be added to the top of the stack.

Calling `navigate()` with the current route is a no-op - to forcibly re-navigate to the same screen, use `navigation.push(route)`.

To navigate backwards in the stack, use either `navigation.pop()` to go up one level, or `navigation.popToTop()` to navigate to the top of the stack.

To navigate backwards in something that isn't necessarily a stack navigator (ie tabs) use `navigation.goBack()`

Hardware back buttons work as expected.

