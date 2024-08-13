const { editTask, tasks } = require('../controllers/editTaskController'); // Adjust the path as needed

beforeEach(() => {
  // Reset tasks array before each test
  tasks.length = 0;
  tasks.push(
    { id: '1', title: 'Task 1', description: 'Description 1', dueDate: null, priority: 'Low' },
    { id: '2', title: 'Task 2', description: 'Description 2', dueDate: null, priority: 'Medium' }
  );
});

describe('editTask', () => {
  it('should edit an existing task', () => {
    const updatedTask = { title: 'Updated Task 1' };
    const result = editTask('1', updatedTask);

    expect(result).toEqual({
      id: '1',
      title: 'Updated Task 1',
      description: 'Description 1',
      dueDate: null,
      priority: 'Low',
    });
  });

  it('should throw an error if the task ID is not found', () => {
    expect(() => editTask('999', { title: 'Non-existent Task' })).toThrow('Task not found');
  });

  it('should allow partial updates', () => {
    const updatedFields = { priority: 'Low' };
    const result = editTask('1', updatedFields);

    expect(result).toEqual({
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      dueDate: null,
      priority: 'Low',
    });
  });
});
