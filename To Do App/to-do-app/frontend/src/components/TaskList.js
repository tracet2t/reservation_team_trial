import { useEffect, useState } from 'react';
import { getTasks } from '../api/taskApi';

function TaskList() {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      const fetchTasks = async () => {
        const tasksData = await getTasks();
        setTasks(tasksData);
      };
  
      fetchTasks();
    }, []);
  
    return (
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="border p-4 mb-2 rounded">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</p>
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </div>
    );
  }

export default TaskList;
