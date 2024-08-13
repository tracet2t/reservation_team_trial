const tasks = []; // Replace with db storage mechanism

const notifyUpcomingTasks = () => {
  const now = new Date();
  const notifications = [];

  tasks.forEach(task => {
    if (task.dueDate) {
      const dueDate = new Date(task.dueDate);
      const timeDiff = dueDate - now;

      // Check if the task is approaching its due date ex -  within 24 hours
      if (timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000) {
        notifications.push({
          id: task.id,
          title: task.title,
          message: `Reminder: Your task "${task.title}" is approaching its due date.`,
          dueDate: task.dueDate,
        });
      }
    }
  });

  return notifications;
};

module.exports = { notifyUpcomingTasks, tasks };