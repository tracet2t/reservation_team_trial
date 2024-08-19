document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const taskDateInput = document.getElementById('task-date-input');
    const taskTimeInput = document.getElementById('task-time-input');

    let editMode = false;
    let taskToEdit = null;
    const API_BASE_URL = 'http://localhost:3000/tasks'; 

    // Load tasks from backend on page load
    loadTasksFromBackend();

    // Add task on button click
    addTaskBtn.addEventListener('click', () => handleAddTask());

    // Add task on Enter key press
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });

    // adding + updating a task
    async function handleAddTask() {
        const taskTitle = taskInput.value.trim();
        const taskDate = taskDateInput.value;
        const taskTime = taskTimeInput.value;

        if (taskTitle === '' || taskDate === '' || taskTime === '') {
            alert('Task, date, and time cannot be empty');
            return;
        }

        const taskDeadline = new Date(`${taskDate}T${taskTime}`);

        if (editMode) {
            await updateTask(taskToEdit.dataset.id, taskTitle, taskDeadline);
        } else {
            await addNewTask(taskTitle, taskDeadline);
        }

        // Clear the input fields
        taskInput.value = '';
        taskDateInput.value = '';
        taskTimeInput.value = '';
    }

    // Add a new task
    async function addNewTask(taskTitle, taskDeadline) {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: taskTitle,
                expiration: taskDeadline.toISOString()
            })
        });
        const task = await response.json();
        const taskItem = createTaskElement(task);
        taskList.appendChild(taskItem);
    }

    // Update an existing task
    async function updateTask(taskId, taskTitle, taskDeadline) {
        await fetch(`${API_BASE_URL}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: taskTitle,
                expiration: taskDeadline.toISOString()
            })
        });
        taskToEdit.querySelector('.task-text').textContent = taskTitle;
        taskToEdit.dataset.deadline = taskDeadline.toISOString(); // Update deadline
        addTaskBtn.textContent = 'Add Task'; // Reset the button text
        editMode = false;
        taskToEdit = null;
    }

    // Create a task element
    function createTaskElement(task) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('flex', 'items-center', 'justify-between', 'bg-gray-200', 'p-2', 'rounded', 'mb-2');
        taskItem.dataset.id = task.id; // Store task ID for updates
        taskItem.dataset.deadline = task.expiration; // Store as ISO string

        // Format deadline for display
        const formattedDate = formatDateForDisplay(new Date(task.expiration));
        const formattedTime = formatTimeForDisplay(new Date(task.expiration));

        const taskText = document.createElement('span');
        taskText.textContent = task.title;
        taskText.classList.add('task-text');

        const buttonContainer = createButtonContainer(taskItem);

        taskItem.appendChild(taskText);
        taskItem.appendChild(buttonContainer);

        checkTaskExpiration(taskItem); 

        return taskItem;
    }

    function formatDateForDisplay(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear().toString().slice(-2);
        return `${month}/${day}/${year}`;
    }
    
    function formatTimeForDisplay(date) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        if (hours > 12) hours -= 12;
        if (hours === 0) hours = 12;
        return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    // Create a button container
    function createButtonContainer(taskItem) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('flex', 'space-x-2');

        const editBtn = createButton('Edit', 'bg-yellow-600', 'text-white', () => editTask(taskItem));
        const deleteBtn = createButton('Delete', 'bg-red-600', 'text-white', () => deleteTask(taskItem));

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        return buttonContainer;
    }

    // Create a button
    function createButton(text, bgColor, textColor, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add(bgColor, textColor, 'p-2', 'rounded-lg');
        button.addEventListener('click', onClick);
        return button;
    }

    // Edit a task
    function editTask(taskItem) {
        taskInput.value = taskItem.querySelector('.task-text').textContent; // Populate input with task text
        editMode = true;
        taskToEdit = taskItem; // Store the task being edited
        addTaskBtn.textContent = 'Save Task'; 
    }

    // Delete a task
    async function deleteTask(taskItem) {
        await fetch(`${API_BASE_URL}/${taskItem.dataset.id}`, {
            method: 'DELETE'
        });
        taskList.removeChild(taskItem);
    }

    // Load tasks from backend
    async function loadTasksFromBackend() {
        const response = await fetch(API_BASE_URL);
        const tasks = await response.json();
        tasks.forEach(task => {
            const taskItem = createTaskElement(task);
            taskList.appendChild(taskItem);
        });
    }

    // Check if the task has expired
    function checkTaskExpiration(taskItem) {
        const deadline = new Date(taskItem.dataset.deadline);
        const now = new Date();

        if (deadline < now) {
            taskItem.classList.add('bg-red-200'); // Highlight expired tasks
        } else {
            taskItem.classList.remove('bg-red-200'); // Remove highlight if the task is not expired
        }
    }

    // after some time check for expired tasks
    setInterval(() => {
         taskList.querySelectorAll('li').forEach(checkTaskExpiration);
        }, 60000); // Check in every minute
});
