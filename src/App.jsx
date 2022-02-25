import { useState, useMemo, useEffect } from 'react';
import { Button } from 'antd';
import './App.css';
import TodoTable from './components/TodoTable';
import TodoListContext from './context/TodoList';
import TodoItemModal from './components/TodoItemModal';

const defaultTask = {
  description: '',
  task: '',
  priority: 0,
  key: 0,
  completed: false,
};

function App() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('todoList')) || []
  );

  // only rerun context when todoList is updated instead of on every render
  const value = useMemo(
    () => ({
      todoList,
      setTodoList,
    }),
    [todoList]
  );

  useEffect(() => {
    // storing data after changes registered
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState(defaultTask);

  const onConfirm = (values, key) => {
    if (isEdit) {
      // update the list
      const updatedList = todoList.map((todoItem) => {
        if (todoItem.key === key) {
          return { ...todoItem, ...values };
        }
        return todoItem;
      });
      setTodoList(updatedList);
    } else {
      // add new task to existing list
      const existingData = JSON.parse(JSON.stringify(todoList));
      setTodoList([
        ...existingData,
        { ...values, key: +new Date(), completed: false },
      ]);
    }
    setVisible(false);
  };

  const onView = (key) => {
    const selectedTask = todoList.find((todoItem) => todoItem.key === key);
    setCurrentTask(selectedTask);
    setIsEdit(true);
    setVisible(true);
  };

  const onMarkDone = (key) => {
    const updatedList = todoList.map((todoItem) => {
      if (todoItem.key === key) {
        return { ...todoItem, completed: true };
      }
      return todoItem;
    });
    setTodoList(updatedList);
  };

  const onDelete = (key) => {
    const taskToDelete = todoList.findIndex((todoItem) => todoItem.key === key);
    const clonedList = JSON.parse(JSON.stringify(todoList));
    clonedList.splice(taskToDelete, 1);
    setTodoList(clonedList);
  };

  return (
    <TodoListContext.Provider value={value}>
      <div className="App">
        <header className="App-header">
          <Button
            type="primary"
            onClick={() => {
              setCurrentTask(defaultTask);
              setIsEdit(false);
              setVisible(true);
            }}
          >
            New Task
          </Button>

          <TodoTable
            onView={onView}
            onMarkDone={onMarkDone}
            onDelete={onDelete}
          />

          <TodoItemModal
            visible={visible}
            onConfirm={onConfirm}
            onCancel={() => {
              setVisible(false);
            }}
            isEdit={isEdit}
            currentTask={currentTask}
          />
        </header>
      </div>
    </TodoListContext.Provider>
  );
}

export default App;
