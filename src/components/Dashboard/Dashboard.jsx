import React, { useState, useRef, useEffect } from 'react';
import Profile from 'src/components/Profile';
import Tasks from 'src/components/Tasks';
import CreateForm from 'src/components/CreateForm';
import { useTodoAPI } from 'src/api/TodoAPI';
import './Dashboard.scss';

const Dashboard = () => {
  const wrapperRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const todoAPI = useTodoAPI();

  useEffect(async () => {
    const { data } = await todoAPI.getAll();
    setTasks(data);
  }, []);

  const addTask = async (title) => {
    try {
      const { status, data } = await todoAPI.create(title);
      if (status === 201) {
        setTasks([...tasks, data]);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const completeTask = async (id) => {
    /* eslint-disable no-underscore-dangle */
    const { isCompleted } = tasks.find((t) => t._id === id);
    const { status } = await todoAPI.update(id, { isCompleted: !isCompleted });
    if (status === 200) {
      setTasks(tasks.map((t) => (t._id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
    }
  };

  const removeTask = async (id) => {
    const { status } = await todoAPI.remove(id);
    if (status === 200) {
      setTasks(tasks.filter((t) => t._id !== id));
    }
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

export default Dashboard;
