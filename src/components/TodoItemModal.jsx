import { Modal, Form, Input, Radio } from 'antd';
import PropTypes from 'prop-types';

function TodoItemModal({ visible, onConfirm, onCancel, isEdit, currentTask }) {
  const [form] = Form.useForm();
  const { completed, priority, task, description, key } = currentTask;
  return (
    <Modal
      visible={visible}
      title={
        // eslint-disable-next-line no-nested-ternary
        completed
          ? 'Viewing current task'
          : isEdit
          ? 'Editing current task'
          : 'Creating a new task'
      }
      okText="Confirm"
      cancelText={completed ? 'Close' : 'Cancel'}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onConfirm(values, key);
          })
          .catch((info) => {
            // eslint-disable-next-line no-console
            console.log('Validate Failed:', info);
          });
      }}
      okButtonProps={{ disabled: completed }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        fields={[
          {
            name: ['priority'],
            value: priority,
          },
          {
            name: ['task'],
            value: task,
          },
          {
            name: ['description'],
            value: description,
          },
        ]}
      >
        <Form.Item
          name="task"
          label="Task"
          rules={[
            {
              required: true,
              message: 'Please input the task!',
            },
          ]}
        >
          <Input disabled={completed} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" disabled={completed} />
        </Form.Item>
        <Form.Item
          name="priority"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value={0} disabled={completed}>
              High
            </Radio>
            <Radio value={1} disabled={completed}>
              Medium
            </Radio>
            <Radio value={2} disabled={completed}>
              Low
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}

TodoItemModal.propTypes = {
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  isEdit: PropTypes.bool,
  currentTask: PropTypes.shape({
    description: PropTypes.string,
    task: PropTypes.string,
    priority: PropTypes.number,
    key: PropTypes.number,
    completed: PropTypes.bool,
  }),
};

TodoItemModal.defaultProps = {
  visible: false,
  onConfirm: () => {},
  onCancel: () => {},
  isEdit: false,
  currentTask: {},
};

export default TodoItemModal;
