import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadTasks, saveTasks } from './12.js';

describe('task file persistence', () => {
  it('saves and reloads tasks using temporary data', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'task-tracker-'));
    const filePath = join(directory, 'tasks.json');
    const tasks = [
      { id: 1, title: 'One', completed: false },
      { id: 2, title: 'Two', completed: true },
    ];

    try {
      await saveTasks(filePath, tasks);
      await expect(loadTasks(filePath)).resolves.toEqual(tasks);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
