import React from 'react';
import renderer from 'react-test-renderer';
import TodoItemModal from './TodoItemModal';

describe('TodoItemModal', () => {
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

  it('renders TodoItemModal component', () => {
    const component = renderer.create(<TodoItemModal />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
