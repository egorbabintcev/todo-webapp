import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { v4 } from 'uuid';
import Tasks from './Tasks';

describe('Tasks component', () => {
  it('Default props', () => {
    const mockTasks = [{ id: v4(), title: 'Test', isCompleted: false }];
    const { getByRole } = render(<Tasks tasks={mockTasks} />);
    expect(userEvent.click(getByRole('checkbox'))).toBeUndefined();
  });

  it('Should render title and completed task separator', () => {
    const { getByText } = render(<Tasks />);
    expect(getByText(/Tasks/i)).toBeInTheDocument();
    expect(getByText(/Completed/i)).toBeInTheDocument();
  });

  it('Should render list item with task text from props specified array', () => {
    const mockTasks = [{ id: v4(), title: 'Test', isCompleted: false }];
    const { getByRole } = render(<Tasks tasks={mockTasks} />);
    expect(getByRole('listitem')).toHaveTextContent(/Test/i);
  });

  it('Should render completed and uncompleted tasks to different lists', () => {
    const mockTasks = [
      {
        id: v4(),
        title: 'Test 1',
        isCompleted: false,
      },
      {
        id: v4(),
        title: 'Test 2',
        isCompleted: true,
      },
    ];
    const { getByTestId, getByText } = render(<Tasks tasks={mockTasks} />);
    expect(getByTestId('uncompleted')).toContainElement(getByText(/Test 1/i));
    expect(getByTestId('completed')).toContainElement(getByText(/Test 2/i));
  });
});
