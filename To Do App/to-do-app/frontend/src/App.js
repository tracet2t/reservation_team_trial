import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import EditTask from './components/EditTask';
import Auth from'./components/Auth';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
      <h1>To-Do App</h1>
          <Routes>
            <Route path="/"  element={
              <div className="app-container">
                <div className="add-task-container">
                <AddTask />
                </div>
                <div className="task-list-container">
                  <TaskList />
                  </div>
              </div>
              }
            />
            <Route path="/editTask/:id" element={<EditTask />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
