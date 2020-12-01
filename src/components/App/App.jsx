import React, { useState } from 'react';
import { v4 } from 'uuid';
import Profile from 'src/components/Profile';
import Tasks from 'src/components/Tasks';
import './App.scss';

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: v4(),
      title: 'Nulla sapien augue sed neque, proin dignissim amet eu diam. 2',
      isCompleted: false,
    },
    {
      id: v4(),
      title: 'Nulla sapien augue sed neque, proin dignissim amet eu diam. 1',
      isCompleted: false,
    },
    {
      id: v4(),
      title: 'Nulla sapien augue sed neque, proin dignissim amet eu diam. 3',
      isCompleted: false,
    },
  ]);

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

  return (
    <div className="App-wrapper">
      <Profile />
      <Tasks
        tasks={tasks}
        completeTask={completeTask}
      />
    </div>
  );
};

export default App;
