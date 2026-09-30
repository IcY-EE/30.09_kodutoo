export const tasks = [
  { id: 1, title: 'Read Node.js notes', completed: true },
  { id: 2, title: 'Practise React state', completed: false },
];

export function getAllTasks(inputTasks) {
  return [...inputTasks];
}

export function getTaskById(inputTasks, id) {
  return inputTasks.find((task) => task.id === id);
}

export function getCompletedTasks(inputTasks) {
  return inputTasks.filter((task) => task.completed === true);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  console.log('All tasks:', getAllTasks(tasks));
  console.log('Task 2:', getTaskById(tasks, 2));
  console.log('Completed:', getCompletedTasks(tasks));
}
