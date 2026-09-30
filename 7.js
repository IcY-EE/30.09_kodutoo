import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
const tasks = [{ id: 1, title: 'Read Node.js notes', completed: true }];
let nextId = 2;

app.get('/api/tasks', (request, response) => response.json(tasks));

app.post('/api/tasks', (request, response) => {
  const { title } = request.body ?? {};
  if (typeof title !== 'string' || title.trim().length === 0) {
    return response.status(400).json({ error: 'title must be a non-empty string' });
  }

  const task = { id: nextId++, title: title.trim(), completed: false };
  tasks.push(task);
  response.status(201).json(task);
});

app.listen(3000, () => console.log('POST API listening at http://localhost:3000'));
