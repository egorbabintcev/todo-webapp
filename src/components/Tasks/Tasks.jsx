import React from 'react';
import PropTypes from 'prop-types';
import './Tasks.scss';

const Tasks = (props) => {
  const {
    tasks,
    completeTask,
  } = props;
  const uncompleted = tasks.filter((t) => !t.isCompleted);
  const completed = tasks.filter((t) => t.isCompleted);

  return (
    <div className="Tasks">
      <h3>Tasks</h3>
      <ul className="Tasks-list">
        {uncompleted.map((t) => (
          <li key={t.id}>
            <label className="Tasks-task" htmlFor={t.id}>
              <input
                id={t.id}
                type="checkbox"
                checked={t.isCompleted}
                onChange={completeTask.bind(this, t.id)}
              />
              <span className="Tasks-checkbox" />
              <p className="Tasks-text">{t.title}</p>
            </label>
          </li>
        ))}
      </ul>
      <div className="Tasks-completed">
        <p>Completed</p>
      </div>
      <ul className="Tasks-list">
        {completed.map((t) => (
          <li key={t.id}>
            <label className="Tasks-task" htmlFor={t.id}>
              <input
                id={t.id}
                type="checkbox"
                checked={t.isCompleted}
                onChange={completeTask.bind(null, t.id)}
              />
              <span className="Tasks-checkbox" />
              <p className="Tasks-text">{t.title}</p>
            </label>
          </li>
        ))}
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
};

Tasks.defaultProps = {
  tasks: [],
  completeTask: () => {},
};

export default Tasks;
