import app from './5-app.js';

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Health API listening at http://localhost:${port}`);
});
