/**
 * @jest-environment jest-environment-jsdom
 */

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


test('should add tasks', async () => {
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

