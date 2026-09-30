import React, { useEffect, useState } from 'react';
import { createTask, getTasks } from './10-task-api.js';

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getTasks().then(setTasks).catch((requestError) => setError(requestError.message));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      const createdTask = await createTask(title);
      setTasks((currentTasks) => [...currentTasks, createdTask]);
      setTitle('');
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return React.createElement('main', null,
    React.createElement('h1', null, 'Task Tracker'),
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('label', null, 'New task', React.createElement('input', {
        value: title,
        onChange: (event) => setTitle(event.target.value),
        required: true,
      })),
      React.createElement('button', { type: 'submit' }, 'Add task')),
    error && React.createElement('p', { role: 'alert' }, error),
    React.createElement('ul', null, tasks.map((task) =>
      React.createElement('li', { key: task.id }, `${task.title} (id: ${task.id})`))),
  );
}
