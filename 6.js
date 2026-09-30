import express from 'express';

const app = express();
const tasks = [
  { id: 1, title: 'Read Node.js notes', completed: true },
  { id: 2, title: 'Practise React state', completed: false },
];

app.get('/api/tasks', (request, response) => {
  const { completed } = request.query;
  if (completed !== undefined && completed !== 'true' && completed !== 'false') {
    return response.status(400).json({ error: 'completed must be true or false' });
  }

  const result = completed === undefined
    ? tasks
    : tasks.filter((task) => task.completed === (completed === 'true'));
  response.json(result);
});

app.get('/api/tasks/:id', (request, response) => {
  const id = Number(request.params.id);
  if (!Number.isInteger(id)) {
    return response.status(400).json({ error: 'id must be an integer' });
  }

  const task = tasks.find((item) => item.id === id);
  if (!task) return response.status(404).json({ error: 'Task not found' });
  response.json(task);
});

app.listen(3000, () => console.log('GET API listening at http://localhost:3000'));
