const tasks = []; 

const setExpiration = (id, expiration) => {
  const task = tasks.find(task => task.id === id);
  if (!task) {
    throw new Error('Task not found');
  }
  task.expiration = expiration;
  return task;
};

module.exports = { setExpiration, tasks };