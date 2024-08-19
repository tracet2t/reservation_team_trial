let tasks = [
    { id: '1', title: 'Task 1', description: 'Description 1', dueDate: null, priority: 'Low' },
    { id: '2', title: 'Task 2', description: 'Description 2', dueDate: null, priority: 'Medium' }
  ];
  
  function editTask(id, updates) {
    const task = tasks.find(task => task.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
  
    Object.assign(task, updates);
    return task;
  }
  
  module.exports = { editTask, tasks };
  