import React from 'react';
import renderer from 'react-test-renderer';
import TodoTable from './TodoTable';

describe('TodoTable', () => {
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

  it('renders TodoTable component', () => {
    const component = renderer.create(<TodoTable />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
