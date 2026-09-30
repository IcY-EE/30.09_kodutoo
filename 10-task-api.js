const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function readResponse(response) {
  const body = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(body?.error || `Request failed (${response.status})`);
  return body;
}

export async function getTasks() {
  return readResponse(await fetch(`${apiUrl}/api/tasks`));
}

export async function createTask(title) {
  return readResponse(await fetch(`${apiUrl}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  }));
}
