import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { v4 } from 'uuid';
import Tasks from './Tasks';

describe('Tasks component', () => {
  it('Default props', () => {
    const mockTasks = [{ _id: v4(), title: 'Test', isCompleted: false }];
    const { getByRole, getByText } = render(<Tasks tasks={mockTasks} />);
    expect(userEvent.click(getByRole('checkbox'))).toBeUndefined();
    expect(userEvent.click(getByText(/Delete/i))).toBeUndefined();
  });

  it('Should render title and completed task separator', () => {
    const { getByText } = render(<Tasks />);
    expect(getByText(/Today/i)).toBeInTheDocument();
    expect(getByText(/Completed/i)).toBeInTheDocument();
  });

  it('Should render list item with task text from props specified array', () => {
    const mockTasks = [{ _id: v4(), title: 'Test', isCompleted: false }];
    const { getByRole } = render(<Tasks tasks={mockTasks} />);
    expect(getByRole('listitem')).toHaveTextContent(/Test/i);
  });

  it('Should render completed and uncompleted tasks to different lists', () => {
    const mockTasks = [
      {
        _id: v4(),
        title: 'Test 1',
        isCompleted: false,
      },
      {
        _id: v4(),
        title: 'Test 2',
        isCompleted: true,
      },
    ];
    const { getByTestId, getByText } = render(<Tasks tasks={mockTasks} />);
    expect(getByTestId('uncompleted')).toContainElement(getByText(/Test 1/i));
    expect(getByTestId('completed')).toContainElement(getByText(/Test 2/i));
  });
});
