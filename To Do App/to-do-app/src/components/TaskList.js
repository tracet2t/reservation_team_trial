import { useEffect, useState } from 'react';

function TaskList() {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      async function fetchTasks() {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
      }
      fetchTasks();
    }, []);
  
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.dueDate} - {task.priority}
          </li>
        ))}
      </ul>
    );
  }

export default TaskList;
