import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem } from 'src/components/Dropdown';
import './Tasks.scss';
import check from './check.svg';

const Tasks = (props) => {
  const {
    tasks,
    completeTask,
    removeTask,
  } = props;
  const uncompleted = [];
  const completed = [];

  /* eslint-disable no-underscore-dangle */
  tasks.forEach((t) => {
    const tItem = (
      <li key={t._id}>
        <label className="Tasks-task" htmlFor={t._id}>
          <input
            id={t._id}
            type="checkbox"
            checked={t.isCompleted}
            onChange={completeTask.bind(null, t._id)}
          />
          <span className="Tasks-checkbox">
            <svg>
              <use xlinkHref={`${check}#check`} />
            </svg>
          </span>
          <p className="Tasks-text">{t.title}</p>
          <Dropdown>
            {/* eslint-disable */}
            <DropdownItem onClick={removeTask.bind(this, t._id)}>
              Delete
            </DropdownItem>
          </Dropdown>
        </label>
      </li>
    );

    if (t.isCompleted) {
      completed.push(tItem);
    } else {
      uncompleted.push(tItem);
    }
  });

  return (
    <div className="Tasks">
      <h3>Today</h3>
      <ul data-testid="uncompleted" className="Tasks-list">
        {uncompleted}
      </ul>
      <div className="Tasks-completed">
        <p>Completed</p>
      </div>
      <ul data-testid="completed" className="Tasks-list">
        {completed}
      </ul>
    </div>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    isCompleted: PropTypes.bool,
  })),
  completeTask: PropTypes.func,
  removeTask: PropTypes.func,
};

Tasks.defaultProps = {
  tasks: [],
  completeTask: () => {},
  removeTask: () => {},
};

export default Tasks;
