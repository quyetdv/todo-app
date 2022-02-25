import { Table, Button } from 'antd';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import TodoListContext from '../context/TodoList';

const priorityMapper = (data) => {
  const mapper = { 0: 'High', 1: 'Medium', 2: 'Low' };
  return mapper[data];
};

function TodoTable({ onView, onMarkDone, onDelete }) {
  const { todoList } = useContext(TodoListContext);

  const footer = () => {
    return (
      <>
        <span className="footer-span">Total: {todoList.length}</span>
        <span className="footer-span">
          Completed: {todoList.filter((todoItem) => todoItem.completed).length}
        </span>
      </>
    );
  };

  const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
      render: (text, record) => (
        <span
          style={{ textDecoration: record.completed ? 'line-through' : null }}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.task - b.task,
      width: '30%',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (text, record) => (
        <span
          style={{ textDecoration: record.completed ? 'line-through' : null }}
        >
          {priorityMapper(record.priority)}
        </span>
      ),
      sorter: (a, b) => a.priority - b.priority,
      width: '10%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => (
        <span
          style={{ textDecoration: record.completed ? 'line-through' : null }}
        >
          {text}
        </span>
      ),
      width: '40%',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <div className="button-group">
          <Button
            onClick={() => {
              onView(record.key);
            }}
          >
            {record.completed ? 'View' : 'Edit'}
          </Button>
          <Button
            // style={{ backgroundColor: 'green', color: 'white' }}
            disabled={record.completed}
            onClick={() => {
              onMarkDone(record.key);
            }}
          >
            Mark As Done
          </Button>
          <Button
            type="danger"
            onClick={() => {
              onDelete(record.key);
            }}
          >
            Delete
          </Button>
        </div>
      ),
      width: '20%',
    },
  ];

  return (
    <Table
      className="todo-table"
      columns={columns}
      dataSource={todoList}
      footer={footer}
      bordered
    />
  );
}

TodoTable.propTypes = {
  onView: PropTypes.func,
  onMarkDone: PropTypes.func,
  onDelete: PropTypes.func,
};

TodoTable.defaultProps = {
  onView: () => {},
  onMarkDone: () => {},
  onDelete: () => {},
};

export default TodoTable;
