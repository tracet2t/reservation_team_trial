document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    let editMode = false;
    let taskToEdit = null;

    // Add task on button click
    addTaskBtn.addEventListener('click', () => handleAddTask());

    // Add task on Enter key press
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });

    // handle adding or updating a task
    function handleAddTask() {
        const taskTitle = taskInput.value.trim();

        if (taskTitle === '') {
            alert('Task cannot be empty');
            return;
        }

        if (editMode) {
            updateTask(taskTitle);
        } else {
            addNewTask(taskTitle);
        }

        // Clear the input field
        taskInput.value = '';
    }

    // update an existing task
    function updateTask(taskTitle) {
        taskToEdit.querySelector('.task-text').textContent = taskTitle;
        addTaskBtn.textContent = 'Add Task'; // Reset the button text
        editMode = false;
        taskToEdit = null;
    }

    // add a new task
    function addNewTask(taskTitle) {
        const taskItem = createTaskElement(taskTitle);
        taskList.appendChild(taskItem);
    }

    // create a task element
    function createTaskElement(taskTitle) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('flex', 'items-center', 'justify-between', 'bg-gray-200', 'p-2', 'rounded', 'mb-2');

        const taskText = document.createElement('span');
        taskText.textContent = taskTitle;
        taskText.classList.add('task-text'); // Add a class for styling

        const buttonContainer = createButtonContainer(taskItem);

        taskItem.appendChild(taskText);
        taskItem.appendChild(buttonContainer);

        return taskItem;
    }

    // create a button 
    function createButtonContainer(taskItem) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('flex', 'space-x-2'); 

        const editBtn = createButton('Edit', 'bg-yellow-600', 'text-white', () => editTask(taskItem));
        const deleteBtn = createButton('Delete', 'bg-red-600', 'text-white', () => deleteTask(taskItem));

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        return buttonContainer;
    }

    // create a button 
    function createButton(text, bgColor, textColor, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add(bgColor, textColor, 'p-2', 'rounded-lg');
        button.addEventListener('click', onClick);
        return button;
    }

    //  edit a task
    function editTask(taskItem) {
        taskInput.value = taskItem.querySelector('.task-text').textContent; // Populate input with task text
        editMode = true;
        taskToEdit = taskItem; // Store the task being edited
        addTaskBtn.textContent = 'Save Task'; // Change button text to 'Save Task'
    }

    //delete a task
    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
    }
});
