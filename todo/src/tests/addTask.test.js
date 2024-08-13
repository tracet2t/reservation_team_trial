const { addTask } = require('../controllers/addTaskController');
const { sequelize } = require('../../index');

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Syncing the database before tests
});

afterAll(async () => {
    await sequelize.close();  // Close the database connection after all tests
});

describe('Task Management', () => {
    it('should add a new task with title, description, due date, and priority', () => {
        const task = {
            title: 'Test Task',
            description: 'This is a test task',
            dueDate: '2024-08-15',
            priority: 'High'
        };

        const addedTask = addTask(task);
        expect(addedTask).toEqual(expect.objectContaining(task));
    });

    it('should throw an error if the title is missing', () => {
        const task = {
            description: 'This is a test task without a title',
            dueDate: '2024-08-15',
            priority: 'High'
        };

        expect(() => addTask(task)).toThrow('Title is required');
    });

    it('should add a task with only the title', () => {
        const task = { title: 'Test Task' };
        const addedTask = addTask(task);
        expect(addedTask).toEqual(expect.objectContaining({
            title: 'Test Task',
            description: '',
            dueDate: null,
            priority: 'Medium'
        }));
    });

    it('should add a task with title and priority', () => {
        const task = {
            title: 'Test Task',
            priority: 'Low'
        };
        const addedTask = addTask(task);
        expect(addedTask.priority).toBe('Low');
    });
});
