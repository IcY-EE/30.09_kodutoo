import { readFile } from 'node:fs/promises';

export async function loadTasks(filePath) {
  let text;
  try {
    text = await readFile(filePath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  let tasks;
  try {
    tasks = JSON.parse(text);
  } catch (error) {
    throw new Error(`Invalid JSON in ${filePath}: ${error.message}`);
  }
  if (!Array.isArray(tasks)) {
    throw new Error(`Invalid task data in ${filePath}: expected a JSON array`);
  }
  return tasks;
}

const filePath = process.argv[2] || '14-valid.json';
try {
  console.log(await loadTasks(filePath));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
