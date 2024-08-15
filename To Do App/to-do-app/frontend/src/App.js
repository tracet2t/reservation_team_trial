import React from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1>To-Do App</h1>
        <AddTask />
      <TaskList />
    </div>
  );
}

export default App;
