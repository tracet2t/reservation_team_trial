/**
 * @jest-environment jest-environment-jsdom
 */

//import {renderTasks} from '../public/app.js';
//const {renderTasks} = require('../public/app');

global.fetch = jest.fn(()=>
    Promise.resolve({
        json: () => Promise.resolve({tasks:[]}),
    })
);

beforeEach(() => {
    document.body.innerHTML = `
      <form id="task-form">
        <input type="text" id="title" value="Test Task">
        <input type="hidden" id="task-id" value="">
        <textarea id="description">Test Description</textarea>
        <input type="date" id="due-date" value="2024-08-20">
        <select id="priority">
          <option value="Low" selected>Low</option>
        </select>
        <button id="submit-btn" type="submit">Add Task</button>
      </form>
      <div id="task-list"></div>
      <div id="confirmation" class="hidden"></div>
    `;
});


test('it should add tasks', async () => {
    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        fetch('/addTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                dueDate: document.getElementById('due-date').value,
                priority: document.getElementById('priority').value,
            }),
        });
    });

    const event = new Event('submit');
    taskForm.dispatchEvent(event);

    await fetch;

    expect(fetch).toHaveBeenCalledWith('/addTask', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'Test Task',
            description: 'Test Description',
            dueDate: '2024-08-20',
            priority: 'Low'
        })
    }));
});

function renderTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
  
    tasks.forEach(task => {
      const taskItem = `
        <div class="task">
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <p>Due Date: ${task.due_date}</p>
          <p>Priority: ${task.priority}</p>
        </div>
      `;
      taskList.innerHTML += taskItem;
    });
  }

test('it should render tasks', () => {
    const tasks = [
      { id: 1, title: 'Test Task 1', description: 'Test Desc 1', due_date: '2024-08-21', priority: 'High', completed: false }
    ];
    const taskList = document.getElementById('task-list');
  
    renderTasks(tasks);
  
    expect(taskList.innerHTML).toContain('Test Task 1');
    expect(taskList.innerHTML).toContain('Test Desc 1');
    expect(taskList.innerHTML).toContain('2024-08-21');
    expect(taskList.innerHTML).toContain('High');
  });

  
function handleTaskSubmission(taskId, title, description, dueDate, priority) {
    if (taskId) {
      return fetch('/updateTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, title, description, due_date: dueDate, priority })
      });
    } else {
      return fetch('/addTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate, priority })
      });
    }
  }
  
test('should call updateTask when task ID is present', async () => {
    const response = handleTaskSubmission('1', 'Test Task', 'Test Description', '2024-08-20', 'Low');
  
    await response;
  
    expect(fetch).toHaveBeenCalledWith('/updateTask', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        due_date: '2024-08-20',
        priority: 'Low'
      })
    }));
  });
  

test('should delete a task', async () => {
  const deleteTask = (id) => {
    return fetch('/deleteTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
  };

  deleteTask(1);

  expect(fetch).toHaveBeenCalledWith('/deleteTask', expect.objectContaining({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 1 })
  }));
});
