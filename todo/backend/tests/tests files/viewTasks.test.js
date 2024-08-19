const { getTasks, tasks } = require('../../controllers/viewTasksController');

beforeEach(() => {
  // Resetting tasks array before each test
  tasks.length = 0;
  tasks.push(
    { id: '1', title: 'Task 1', description: 'Description 1', dueDate: '2024-08-01', priority: 'Low', completed: false },
    { id: '2', title: 'Task 2', description: 'Description 2', dueDate: '2024-07-01', priority: 'High', completed: true },
    { id: '3', title: 'Task 3', description: 'Description 3', dueDate: '2024-08-15', priority: 'Medium', completed: false }
  );
});

describe('getTasks', () => {
  it('should return all tasks by default', () => {
    const result = getTasks();
    expect(result).toEqual(tasks);
  });

  it('should filter tasks by completed status', () => {
    const result = getTasks('completed');
    expect(result).toEqual([
      { id: '2', title: 'Task 2', description: 'Description 2', dueDate: '2024-07-01', priority: 'High', completed: true }
    ]);
  });

  it('should filter tasks by pending status', () => {
    const result = getTasks('pending');
    expect(result).toEqual([
      { id: '1', title: 'Task 1', description: 'Description 1', dueDate: '2024-08-01', priority: 'Low', completed: false },
      { id: '3', title: 'Task 3', description: 'Description 3', dueDate: '2024-08-15', priority: 'Medium', completed: false }
    ]);
  });

  it('should sort tasks by due date', () => {
    const result = getTasks('all', 'dueDate');
    expect(result).toEqual([
      { id: '2', title: 'Task 2', description: 'Description 2', dueDate: '2024-07-01', priority: 'High', completed: true },
      { id: '1', title: 'Task 1', description: 'Description 1', dueDate: '2024-08-01', priority: 'Low', completed: false },
      { id: '3', title: 'Task 3', description: 'Description 3', dueDate: '2024-08-15', priority: 'Medium', completed: false }
    ]);
  });

  it('should sort tasks by priority', () => {
    const result = getTasks('all', 'priority');
    expect(result).toEqual([
      { id: '2', title: 'Task 2', description: 'Description 2', dueDate: '2024-07-01', priority: 'High', completed: true },
      { id: '3', title: 'Task 3', description: 'Description 3', dueDate: '2024-08-15', priority: 'Medium', completed: false },
      { id: '1', title: 'Task 1', description: 'Description 1', dueDate: '2024-08-01', priority: 'Low', completed: false }
    ]);
  });
});
