import React, { useRef, useState } from 'react';
import { v4 } from 'uuid';
import Profile from 'src/components/Profile';
import Tasks from 'src/components/Tasks';
import CreateForm from 'src/components/CreateForm';
import './App.scss';

const App = () => {
  const wrapperRef = useRef(null);
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    setTasks([...tasks, {
      id: v4(),
      title,
      isCompleted: false,
    }]);
  };

  const completeTask = (id) => {
    setTasks(tasks.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
        };
      }
      return t;
    }));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="App-wrapper" ref={wrapperRef}>
      <Profile />
      <Tasks
        tasks={tasks}
        completeTask={completeTask}
        removeTask={removeTask}
      />
      <CreateForm
        ref={wrapperRef}
        addTask={addTask}
      />
    </div>
  );
};

export default App;
