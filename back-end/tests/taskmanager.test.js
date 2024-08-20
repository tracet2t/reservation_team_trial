const TaskManager = require('../modules/taskmanager');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid'); 

let testUser;
let taskManager;

beforeEach(async () => {
    const uniqueEmail = `testuser-${uuidv4()}@example.com`; 
    testUser = await prisma.user.create({
        data: {
            email: uniqueEmail,
            password: 'password123',
            name: 'Test User',
        },
    });

    taskManager = new TaskManager(testUser.id);
    console.log(taskManager.user_id);
    console.log(testUser.id);

    await prisma.todo.deleteMany();
});


afterEach(async () => {
    await prisma.todo.deleteMany();
});


afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
});


describe('testing Task Manager Class', () => {

    // 1)
    it('should be an instance of TaskManager class', () => {
        expect(taskManager).toBeInstanceOf(TaskManager);
    });
    
    // 2)
    it('the now attribute should be an instance of Date', () => {
        expect(taskManager.now).toBeInstanceOf(Date);
    });
    
    // 3)
    it('the findExpiredTasks method should return a list of tasks', async () => {
        const now = new Date();
        const pastDate = new Date(now.getTime() - 86400000); 

        await prisma.todo.create({
            data: {
                title: 'Expired Task',
                description: 'This task should be expired',
                dueDate: pastDate,
                completed: false,
                userId: testUser.id, 
            },
        });

        const expiredTasks = await taskManager.findExpiredTasks();
        console.log(expiredTasks[0])

        expect(Array.isArray(expiredTasks)).toBe(true);
        expect(expiredTasks.length).toBe(1);
        expect(expiredTasks[0]).toHaveProperty('title', 'Expired Task');
    });
});
