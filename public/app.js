document.addEventListener('DOMContentLoaded',()=>{
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    //const viewTasks = document.getElementById('view-tasks')

    taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const taskId = document.getElementById('task-id').value;
      if (taskId) {
          updateTask(taskId);
      } else {
          addTask();
      }
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
              confirmMessage('Task added succeessfully','success');
            });       
    }

    function renderTasks(tasks) {
      console.log('Rendering tasks:', tasks); // Log the tasks to be rendered
      taskList.innerHTML = '';
      tasks.forEach(task => {
          const taskElement = document.createElement('div');
          taskElement.className = 'bg-white p-4 rounded shadow mb-4';
          taskElement.innerHTML = `
            <h2 class="text-xl font-bold">Title : ${task.title}</h2>
            <p class="text-sm text-gray-600 font-mono font-semibold">Description : ${task.description}</p>
            <p class="text-sm text-gray-600 font-mono font-semibold">Due Date: ${task.dueDate}</p>
            <p class="text-sm text-gray-600 mb-5 font-mono font-semibold">Priority : ${task.priority}</p>
            <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="editTask(${task.id})">Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTask(${task.id})">Delete</button>
            ${!task.completed ? `<button class="bg-green-500 text-white px-2 py-1 rounded" onclick="markCompleted(${task.id})">Mark as Completed</button>` : ''}
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
          confirmMessage('Task deleted successfully!', 'success');
      })
      .catch(error => 
        console.error('Error deleting task:', error));
        confirmMessage('Failed to delete task.', 'error');
    }
    window.deleteTask = deleteTask;

    function editTask(id){
      fetch(`/task/${id}`).then(response=>response.json())
        .then(task=>{
            document.getElementById('task-id').value = task.id;
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description;
            document.getElementById('due-date').value = task.dueDate;
            document.getElementById('priority').value = task.priority;

            document.getElementById('submit-btn').textContent = 'Update Task';
         })
         .catch(error => console.error('Error fetching task:', error));
    }
    window.editTask = editTask;

    function updateTask(id) {
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const dueDate = document.getElementById('due-date').value;
      const priority = document.getElementById('priority').value;
  
      fetch(`/updateTask`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, title, description, dueDate, priority })
      })
      .then(response => response.json())
      .then(data => {
          renderTasks(data.tasks);
          taskForm.reset();
          document.getElementById('task-id').value = ''; 
          document.getElementById('submit-btn').textContent = 'Add Task';
          confirmMessage('Task updated successfully!', 'success');
      });
    }

    function markCompleted(id) {
      fetch('/markCompleted', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
      })
      .then(response => response.json())
      .then(data => {
          renderTasks(data.tasks);
          confirmMessage('Task is completed!', 'success');
      })
      .catch(error => console.error('Error marking task as completed:', error));
    }
    window.markCompleted = markCompleted;

    function confirmMessage(messages, type='info'){
      const message = document.getElementById('confirmation');
      message.innerText = messages;

      switch(type){
        case 'success':
          message.className = 'fixed top-0 right-0 m-4 p-2 bg-green-500 text-white rounded shadow-lg';
          break;
        case 'error':
          message.className = 'fixed top-0 right-0 m-4 p-2 bg-red-500 text-white rounded shadow-lg';
          break;
        default:
          message.className = 'fixed top-0 right-0 m-4 p-2 bg-blue-500 text-white rounded shadow-lg';
          break;
      }

      message.classList.remove('hidden');
      setTimeout(() => {
        message.classList.add('hidden');
      }, 3000);
    }
  




});