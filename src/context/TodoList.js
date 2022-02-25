import { createContext } from 'react';

const TodoListContext = createContext({
  todoList: [
    { description: '', task: '', priority: 0, key: 0, completed: false },
  ],
  setTodoList: () => {},
});

export default TodoListContext;
