import http from 'node:http';

const task = { id: 2, title: 'Practise React state', completed: false };
const server = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/api/tasks/2') {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify(task));
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(0, '127.0.0.1', async () => {
  const { port } = server.address();
  const url = `http://127.0.0.1:${port}/api/tasks/2`;

  try {
    const response = await fetch(url);
    const responseBody = await response.json();
    console.log('Request:', { method: 'GET', url: '/api/tasks/2' });
    console.log('Response:', { status: response.status, body: responseBody });
  } finally {
    server.close();
  }
});
