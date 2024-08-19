const tasks = [];  //array

const deleteTask = (id) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) {
    throw new Error('Task not found');
  }
  tasks.splice(index, 1);
  return { message: 'Task deleted successfully' };
};

module.exports = { deleteTask, tasks };