import React, { useState, useRef, useEffect } from 'react';
import Profile from 'src/components/Profile';
import Tasks from 'src/components/Tasks';
import CreateForm from 'src/components/CreateForm';
import { useTodoAPI } from 'src/api/TodoAPI';
import { useAlert } from 'src/utils/Alert';
import './Dashboard.scss';

const Dashboard = () => {
  const wrapperRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const todoAPI = useTodoAPI();
  const alert = useAlert();

  useEffect(async () => {
    try {
      const { data } = await todoAPI.getAll();
      setTasks(data);
    } catch (err) {
      if (err.message === 'Network Error') {
        alert.handleAlert('Network error. Please, check your internet connection.');
      } else {
        throw new Error(err);
      }
    }
  }, []);

  const addTask = async (title) => {
    try {
      const { status, data } = await todoAPI.create(title);
      if (status === 201) {
        setTasks([...tasks, data]);
      }
    } catch (err) {
      if (err.message === 'Network Error') {
        alert.handleAlert('Network error. Please, check your internet connection.');
      } else {
        throw new Error(err);
      }
    }
  };

  const completeTask = async (id) => {
    /* eslint-disable no-underscore-dangle */
    const { isCompleted } = tasks.find((t) => t._id === id);

    try {
      const { status } = await todoAPI.update(id, { isCompleted: !isCompleted });
      if (status === 200) {
        setTasks(tasks.map((t) => (t._id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
      }
    } catch (err) {
      if (err.message === 'Network Error') {
        alert.handleAlert('Network error. Please, check your internet connection.');
      } else {
        throw new Error(err);
      }
    }
  };

  const removeTask = async (id) => {
    try {
      const { status } = await todoAPI.remove(id);
      if (status === 200) {
        setTasks(tasks.filter((t) => t._id !== id));
      }
    } catch (err) {
      if (err.message === 'Network Error') {
        alert.handleAlert('Network error. Please, check your internet connection.');
      } else {
        throw new Error(err);
      }
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
