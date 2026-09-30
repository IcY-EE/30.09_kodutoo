import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function loadTasks(filePath = './data/tasks.json') {
  try {
    const text = await readFile(filePath, 'utf8');
    const tasks = JSON.parse(text);
    if (!Array.isArray(tasks)) throw new Error('Task data must be an array');
    return tasks;
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function saveTasks(filePath, tasks) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(tasks, null, 2));
}

async function main() {
  const filePath = './data/tasks.json';
  let tasks = await loadTasks(filePath);
  if (tasks.length === 0) {
    tasks = [{ id: 1, title: 'Save tasks to a JSON file', completed: false }];
    await saveTasks(filePath, tasks);
    console.log('Created the task file.');
  }
  console.log('Loaded tasks:', tasks);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
