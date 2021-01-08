import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
      <CSSTransition
        classNames="task-transition"
        timeout={350}
        key={t._id}
      >
        <li>
          <label className="Tasks-task" htmlFor={t._id}>
            <input
              id={t._id}
              type="checkbox"
              checked={t.isCompleted}
              onChange={completeTask.bind(null, t._id)}
            />
            <div className="Task-checkbox__wrapper">
              <span className="Tasks-checkbox">
                <svg>
                  <use xlinkHref={`${check}#check`} />
                </svg>
              </span>
            </div>
            <p className="Tasks-text">{t.title}</p>
            <Dropdown>
              {/* eslint-disable */}
              <DropdownItem onClick={removeTask.bind(this, t._id)}>
                Delete
              </DropdownItem>
            </Dropdown>
          </label>
        </li>
      </CSSTransition>
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
      <ul className="Tasks-list" data-testid="uncompleted">
        <TransitionGroup component={null}>
          {uncompleted}
        </TransitionGroup>
      </ul>
      <div className="Tasks-completed">
        <p>Completed</p>
      </div>
      <ul className="Tasks-list" data-testid="completed">
        <TransitionGroup component={null}>
          {completed}
        </TransitionGroup>
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
