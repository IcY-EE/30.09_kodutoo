import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { loadTasks, saveTasks } from './12.js';

const portValue = Number(process.env.PORT ?? 3000);
const port = Number.isInteger(portValue) && portValue > 0 ? portValue : 3000;
const tasksFile = process.env.TASKS_FILE || './data/tasks.json';
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const app = express();
let tasks = [];
let nextId = 1;

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());
app.get('/api/tasks', (request, response) => response.json(tasks));
app.post('/api/tasks', async (request, response, next) => {
  const title = request.body?.title;
  if (typeof title !== 'string' || !title.trim()) {
    return response.status(400).json({ error: 'title must be a non-empty string' });
  }
  const task = { id: nextId++, title: title.trim(), completed: false };
  tasks.push(task);
  try {
    await saveTasks(tasksFile, tasks);
    response.status(201).json(task);
  } catch (error) {
    tasks.pop();
    next(error);
  }
});
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

async function start() {
  tasks = await loadTasks(tasksFile);
  nextId = Math.max(0, ...tasks.map((task) => Number(task.id) || 0)) + 1;
  app.listen(port, () => {
    console.log(`Task API listening at http://localhost:${port}`);
    console.log(`Task data file: ${tasksFile}`);
  });
}

start().catch((error) => {
  console.error(`Could not load task data: ${error.message}`);
  process.exitCode = 1;
});
