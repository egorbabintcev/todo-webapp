import React from 'react';
import { render } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import CreateForm from './CreateForm';

describe('CreateForm component', () => {
  let ref;
  beforeEach(() => {
    ref = {
      current: {
        style: { height: 'auto' },
      },
    };
  })

  it('Should render textarea and button', () => {
    const { getByRole } = render(<CreateForm ref={ref} />);
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('Should display typed value in textarea', () => {
    const { getByRole } = render(<CreateForm ref={ref} />);
    const textarea = getByRole('textbox');
    expect(textarea).not.toHaveTextContent();
    userEvents.type(textarea, 'Test');
    expect(textarea).toHaveTextContent(/Test/i);
  });

  it('Should call addTask function with trimmed task text when press on submit button', () => {
    const addTaskMock = jest.fn();
    const { getByRole } = render(<CreateForm ref={ref} addTask={addTaskMock} />);
    const textarea = getByRole('textbox');
    const addTaskButton = getByRole('button');
    userEvents.type(textarea, 'Test');
    userEvents.click(addTaskButton);
    expect(addTaskMock).toHaveBeenCalledWith('Test');
  });

  it('Should not create task with empty string or end-of-line symbol', () => {
    const addTaskMock = jest.fn();
    const { getByRole } = render(<CreateForm ref={ref} addTask={addTaskMock} />);
    const textarea = getByRole('textbox');
    const addTaskButton = getByRole('button');
    userEvents.type(textarea, '  \n');
    userEvents.click(addTaskButton);
    expect(addTaskMock).not.toBeCalled();
  });

  it('Should create task, when press on enter, while typing', () => {
    const addTaskMock = jest.fn();
    const { getByRole } = render(<CreateForm ref={ref} addTask={addTaskMock} />);
    const textarea = getByRole('textbox');
    const addTaskButton = getByRole('button');
    userEvents.type(textarea, 'Test{enter}');
    userEvents.click(addTaskButton);
    expect(addTaskMock).toHaveBeenCalledWith('Test');
  });

  it('Should type end-of-line, when press shift+enter', () => {
    const addTaskMock = jest.fn();
    const { getByRole } = render(<CreateForm ref={ref} addTask={addTaskMock} />);
    const textarea = getByRole('textbox');
    const addTaskButton = getByRole('button');
    userEvents.type(textarea, 'Test{shift}{enter}{/shift}Test',);
    userEvents.click(addTaskButton);
    expect(addTaskMock).toHaveBeenCalledWith('Test\nTest');
  });
});
