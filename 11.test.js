import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from './11-app.js';

describe('Task API integration', () => {
  let app;

  beforeEach(() => {
    app = createApp([
      { id: 1, title: 'Read Node.js notes', completed: true },
      { id: 2, title: 'Practise React state', completed: false },
    ]);
  });

  it('returns tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('creates a valid task', async () => {
    const response = await request(app).post('/api/tasks').send({ title: ' Learn Express ' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 3, title: 'Learn Express', completed: false });
  });

  it('rejects an empty title', async () => {
    const response = await request(app).post('/api/tasks').send({ title: '   ' });
    expect(response.status).toBe(400);
  });

  it('returns 404 for an unknown task', async () => {
    const response = await request(app).get('/api/tasks/999');
    expect(response.status).toBe(404);
  });

  it('deletes a task', async () => {
    const deleted = await request(app).delete('/api/tasks/1');
    const remaining = await request(app).get('/api/tasks');
    expect(deleted.status).toBe(204);
    expect(deleted.text).toBe('');
    expect(remaining.body.map((task) => task.id)).toEqual([2]);
  });
});
