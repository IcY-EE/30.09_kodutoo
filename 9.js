import express from 'express';

const app = express();
const tasks = [{ id: 1, title: 'Read Node.js notes', completed: true }];
app.use(express.json());
app.use((request, response, next) => {
  console.log(`${request.method} ${request.path}`);
  next();
});

app.get('/api/tasks/:id', (request, response, next) => {
  const id = Number(request.params.id);
  if (!Number.isInteger(id)) {
    return next(Object.assign(new Error('id must be an integer'), { status: 400 }));
  }
  const task = tasks.find((item) => item.id === id);
  if (!task) return next(Object.assign(new Error('Task not found'), { status: 404 }));
  response.json(task);
});
app.get('/api/debug-failure', (request, response, next) => next(new Error('Private server detail')));

app.use('/api', (request, response) => response.status(404).json({ error: 'Route not found' }));
app.use((error, request, response, next) => {
  const status = [400, 404].includes(error.status) ? error.status : 500;
  const message = status === 500 ? 'Internal server error' : error.message;
  response.status(status).json({ error: message });
});

app.listen(3000, () => console.log('Middleware API listening at http://localhost:3000'));
