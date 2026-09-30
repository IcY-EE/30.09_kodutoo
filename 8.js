import express from 'express';

const app = express();
app.use(express.json());
const tasks = [
  { id: 1, title: 'Read Node.js notes', completed: true },
  { id: 2, title: 'Practise React state', completed: false },
];

app.get('/api/tasks', (request, response) => response.json(tasks));

app.patch('/api/tasks/:id', (request, response) => {
  const task = tasks.find((item) => item.id === Number(request.params.id));
  if (!task) return response.status(404).json({ error: 'Task not found' });

  const update = request.body;
  const fields = Object.keys(update ?? {});
  if (fields.length === 0 || fields.some((field) => !['title', 'completed'].includes(field))) {
    return response.status(400).json({ error: 'Provide title and/or completed only' });
  }
  if ('title' in update && (typeof update.title !== 'string' || !update.title.trim())) {
    return response.status(400).json({ error: 'title must be a non-empty string' });
  }
  if ('completed' in update && typeof update.completed !== 'boolean') {
    return response.status(400).json({ error: 'completed must be a boolean' });
  }

  if ('title' in update) task.title = update.title.trim();
  if ('completed' in update) task.completed = update.completed;
  response.json(task);
});

app.delete('/api/tasks/:id', (request, response) => {
  const index = tasks.findIndex((item) => item.id === Number(request.params.id));
  if (index === -1) return response.status(404).json({ error: 'Task not found' });
  tasks.splice(index, 1);
  response.status(204).end();
});

app.listen(3000, () => console.log('PATCH/DELETE API listening at http://localhost:3000'));
