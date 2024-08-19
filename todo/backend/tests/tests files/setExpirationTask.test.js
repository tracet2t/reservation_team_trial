const { setExpiration, tasks } = require('../../controllers/setExpirationController');

beforeEach(() => {
  // Reset tasks array before each test
  tasks.length = 0;
  tasks.push(
    { id: '1', title: 'Task 1', description: 'Description 1', dueDate: null, priority: 'Low', expiration: null },
    { id: '2', title: 'Task 2', description: 'Description 2', dueDate: null, priority: 'Medium', expiration: null }
  );
});

describe('setExpiration', () => {
  it('should set the expiration date for an existing task', () => {
    const newExpiration = '2024-08-31T23:59:59';
    const result = setExpiration('1', newExpiration);

    expect(result).toEqual({
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      dueDate: null,
      priority: 'Low',
      expiration: newExpiration,
    });
  });

  it('should throw an error if the task ID is not found', () => {
    expect(() => setExpiration('999', '2024-08-31T23:59:59')).toThrow('Task not found');
  });

  it('should update the expiration date if it is already set', () => {
    const initialExpiration = '2024-08-30T23:59:59';
    setExpiration('1', initialExpiration); // Set  expiration

    const newExpiration = '2024-08-31T23:59:59'; 
    const result = setExpiration('1', newExpiration);

    expect(result).toEqual({
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      dueDate: null,
      priority: 'Low',
      expiration: newExpiration,
    });
  });
});
