const tasks = []; 
const getTasks = (filter = 'all', sort = 'dueDate') => {
  let filteredTasks = tasks;

  // Filter tasks based on the status
  if (filter === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.completed);
  } else if (filter === 'pending') {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  }

  // Sort tasks based on the sort criteria
  filteredTasks.sort((a, b) => {
    if (sort === 'dueDate') {
      return (a.dueDate || '').localeCompare(b.dueDate || '');
    } else if (sort === 'priority') {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return filteredTasks;
};

module.exports = { getTasks, tasks };