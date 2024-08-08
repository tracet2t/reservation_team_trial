
document.addEventListener('DOMContentLoaded',()=>{
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    //const viewTasks = document.getElementById('view-tasks')

    taskForm.addEventListener('submit', (event)=>{
      event.preventDefault();
      addTask();
    });

    /*viewTasks.addEventListener('click', ()=>{
      fetchTasks();
    })*/

    function addTask(){
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;

        fetch('/addTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, dueDate, priority })
          }).then(response => response.json())
            .then(data => {
              renderTasks(data.tasks);
              taskForm.reset();
            });
    }

    function renderTasks(tasks) {
      console.log('Rendering tasks:', tasks); // Log the tasks to be rendered
      taskList.innerHTML = '';
      tasks.forEach(task => {
          const taskElement = document.createElement('div');
          taskElement.className = 'bg-white p-4 rounded shadow mb-2';
          taskElement.innerHTML = `
            <h2 class="text-xl font-bold">${task.title}</h2>
            <p>${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="editTask(${task.id})">Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTask(${task.id})">Delete</button>
            <button class="bg-green-500 text-white px-2 py-1 rounded" onclick="markCompleted(${task.id})">Mark as Completed</button>
          `;
          taskList.appendChild(taskElement);
      });
    }
  

    function fetchTasks() {
      fetch('/tasks')
          .then(response => response.json())
          .then(data => renderTasks(data.tasks))
          .catch(error => console.error('Error fetching tasks:', error));
    }
  
    fetchTasks();

    function deleteTask(id) {
      fetch('/deleteTask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
      })
      .then(response => response.json())
      .then(data => {
          renderTasks(data.tasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  }

  window.deleteTask = deleteTask;

});