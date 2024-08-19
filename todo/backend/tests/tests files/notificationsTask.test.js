const { notifyUpcomingTasks, tasks } = require('../../controllers/notificationsController');

beforeEach(() => {
  // Reset tasks array before each test
  tasks.length = 0;
  tasks.push(
    { id: '1', title: 'Task 1', description: 'Description 1', dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), priority: 'Low', completed: false }, // Due in 12 hours
    { id: '2', title: 'Task 2', description: 'Description 2', dueDate: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(), priority: 'High', completed: true }, // Due in 36 hours
    { id: '3', title: 'Task 3', description: 'Description 3', dueDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), priority: 'Medium', completed: false } // Overdue
  );
});

describe('notifyUpcomingTasks', () => {
  it('should generate notifications for tasks due within 24 hours', () => {
    const notifications = notifyUpcomingTasks();
    expect(notifications).toEqual([
      {
        id: '1',
        title: 'Task 1',
        message: `Reminder: Your task "Task 1" is approaching its due date.`,
        dueDate: expect.any(String),
      }
    ]);
  });

  it('should not generate notifications for tasks due in more than 24 hours or overdue', () => {
    const notifications = notifyUpcomingTasks();
    expect(notifications).not.toContainEqual({
      id: '2',
      title: 'Task 2',
      message: `Reminder: Your task "Task 2" is approaching its due date.`,
      dueDate: expect.any(String),
    });
    expect(notifications).not.toContainEqual({
      id: '3',
      title: 'Task 3',
      message: `Reminder: Your task "Task 3" is approaching its due date.`,
      dueDate: expect.any(String),
    });
  });
});
