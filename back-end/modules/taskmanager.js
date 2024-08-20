const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TaskManger {
    constructor(userId) {
        this.user_id = userId;
        this.now = new Date();
    }

    async findExpiredTasks() {
        return prisma.todo.findMany({
            where: {
                userId: this.user_id,
                dueDate: {lt: this.now},
                completed: false
            },
        });
        
    }

}

module.exports = TaskManger;