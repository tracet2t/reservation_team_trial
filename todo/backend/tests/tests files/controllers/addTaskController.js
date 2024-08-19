function addTask(task) {
    if (!task.title) {
        throw new Error('Title is required');
    }

    const newTask = {
        title: task.title,
        description: task.description || '',
        dueDate: task.dueDate || null,
        priority: task.priority || 'Medium',
    };

    return newTask;
}   
module.exports = { addTask };