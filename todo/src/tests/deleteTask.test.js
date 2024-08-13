const { deleteTask, tasks } = require('../controllers/deleteTaskController');

beforeEach(() => {
  // Reset tasks array before each test
  tasks.length = 0;
  tasks.push(
    { id: '1', title: 'Task 1', description: 'Description 1', dueDate: null, priority: 'Low' },
    { id: '2', title: 'Task 2', description: 'Description 2', dueDate: null, priority: 'Medium' }
  );
});

describe('deleteTask', () => {
  it('should delete an existing task', () => {
    const result = deleteTask('1');

    expect(result).toEqual({ message: 'Task deleted successfully' });
    expect(tasks.find(task => task.id === '1')).toBeUndefined();
  });

  it('should throw an error if the task ID is not found', () => {
    expect(() => deleteTask('999')).toThrow('Task not found');
  });
});
