import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('App', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders App component', () => {
    const component = renderer.create(<App />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('creates a new task', async () => {
    const { queryByText, getByLabelText } = render(<App />);

    fireEvent.click(queryByText('New Task'));
    await waitFor(async () => {
      expect(queryByText('Creating a new task')).toBeInTheDocument();
      const taskInput = getByLabelText('Task');
      fireEvent.change(taskInput, { target: { value: 'Task number 1' } });
      fireEvent.click(queryByText('Confirm'));
      await waitFor(() => {
        expect(queryByText('Task number 1')).toBeInTheDocument();
      });
    });

    fireEvent.click(queryByText('New Task'));
    await waitFor(async () => {
      expect(queryByText('Creating a new task')).toBeInTheDocument();
      const taskInput = getByLabelText('Task');
      fireEvent.change(taskInput, { target: { value: 'Task number 2' } });
      fireEvent.click(queryByText('Confirm'));
      await waitFor(() => {
        expect(queryByText('Task number 2')).toBeInTheDocument();
      });
    });

    fireEvent.click(queryByText('New Task'));
    await waitFor(async () => {
      expect(queryByText('Creating a new task')).toBeInTheDocument();
      const taskInput = getByLabelText('Task');
      fireEvent.change(taskInput, { target: { value: 'Task number 4' } });
      fireEvent.click(queryByText('Confirm'));
      await waitFor(() => {
        expect(queryByText('Task number 4')).toBeInTheDocument();
      });
    });
  });

  it('edit existing task', async () => {
    const { getByText, getAllByText, getByLabelText } = render(<App />);

    fireEvent.click(getAllByText('Edit')[0]);
    await waitFor(async () => {
      expect(getByText('Editing current task')).toBeInTheDocument();
      const taskInput = getByLabelText('Task');
      fireEvent.change(taskInput, { target: { value: 'Task number 3' } });
      fireEvent.click(getByText('Confirm'));
      await waitFor(() => {
        expect(getByText('Task number 3')).toBeInTheDocument();
      });
    });
  });

  it('stop using modal by clicking Cancel', async () => {
    const { getByText, getAllByText } = render(<App />);

    fireEvent.click(getAllByText('Edit')[0]);
    await waitFor(async () => {
      expect(getByText('Editing current task')).toBeInTheDocument();
      fireEvent.click(getByText('Cancel'));
    });
  });

  it('marks a task as done', async () => {
    const { getAllByText } = render(<App />);

    const firstDoneButton = getAllByText('Mark As Done')[0];
    fireEvent.click(firstDoneButton);
    expect(firstDoneButton.closest('button')).toBeDisabled();
  });

  it('deletes a task', async () => {
    const { getAllByText, queryByText } = render(<App />);

    const firstDoneButton = getAllByText('Delete')[0];
    fireEvent.click(firstDoneButton);
    expect(queryByText('Task number 3')).not.toBeInTheDocument();
  });
});
