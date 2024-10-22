---
id: mapStateToProps Redux
aliases:
  - mapStateToProps Redux
tags: []
---

# mapStateToProps Redux

First argument passed in to the `connect()` function for a component.

- Selects the part of state that the component needs, and merges it into the components props.
- Called every time the store changes.
- Receives an argument of the entire store, returns an object of the data needed for the component.

For this example:

```js
const TodoProps = {
    todos: Todo[];
}

const TodoList: React.FC<TodoProps> = ({ todos }) => {
    return {todos.map(TodoListItem)};
}

const mapStateToProps = (state) => {
    const { todos } = state;

    return { todos };
}
```

The `TodoList` component now receives `todos` as a prop.

[See more details in the React Redux documentation](https://react-redux.js.org/using-react-redux/connect-mapstate)
