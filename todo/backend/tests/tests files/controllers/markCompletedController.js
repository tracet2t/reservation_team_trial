const tasks = []; 

const markCompleted = (id) => {
  const task = tasks.find(task => task.id === id);
  if (!task) {
    throw new Error('Task not found');
  }
  task.completed = true;
  return task;
};

module.exports = { markCompleted, tasks };