const { markCompleted, tasks } = require('../../controllers/markCompletedController');

beforeEach(() => {
  // Reset tasks array before each test
  tasks.length = 0;
  tasks.push(
    { id: '1', title: 'Task 1', description: 'Description 1', dueDate: null, priority: 'Low', expiration: null, completed: false },
    { id: '2', title: 'Task 2', description: 'Description 2', dueDate: null, priority: 'Medium', expiration: null, completed: false }
  );
});

describe('markCompleted', () => {
  it('should mark an existing task as completed', () => {
    const result = markCompleted('1');

    expect(result).toEqual({
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      dueDate: null,
      priority: 'Low',
      expiration: null,
      completed: true,
    });
  });

  it('should throw an error if the task ID is not found', () => {
    expect(() => markCompleted('999')).toThrow('Task not found');
  });

  it('should correctly handle tasks that are already completed', () => {
    // Mark the task as completed first
    markCompleted('1');

    // Try to marking it again
    const result = markCompleted('1');

    expect(result).toEqual({
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      dueDate: null,
      priority: 'Low',
      expiration: null,
      completed: true,
    });
  });
});
