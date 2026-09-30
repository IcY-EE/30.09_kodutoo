import express from 'express';

export function createApp(initialTasks = [
  { id: 1, title: 'Read Node.js notes', completed: true },
  { id: 2, title: 'Practise React state', completed: false },
]) {
  const app = express();
  const tasks = initialTasks.map((task) => ({ ...task }));
  let nextId = Math.max(0, ...tasks.map((task) => task.id)) + 1;

  app.use(express.json());
  app.get('/api/tasks', (request, response) => response.json(tasks));
  app.get('/api/tasks/:id', (request, response) => {
    const task = tasks.find((item) => item.id === Number(request.params.id));
    if (!task) return response.status(404).json({ error: 'Task not found' });
    response.json(task);
  });
  app.post('/api/tasks', (request, response) => {
    const title = request.body?.title;
    if (typeof title !== 'string' || !title.trim()) {
      return response.status(400).json({ error: 'title must be a non-empty string' });
    }
    const task = { id: nextId++, title: title.trim(), completed: false };
    tasks.push(task);
    response.status(201).json(task);
  });
  app.delete('/api/tasks/:id', (request, response) => {
    const index = tasks.findIndex((item) => item.id === Number(request.params.id));
    if (index < 0) return response.status(404).json({ error: 'Task not found' });
    tasks.splice(index, 1);
    response.status(204).end();
  });
  return app;
}
