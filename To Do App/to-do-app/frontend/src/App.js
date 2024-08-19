import React,  { useState }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import EditTask from './components/EditTask';
import Auth from'./components/Auth';
import Header from './components/Header';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
         <Routes>
            <Route path="/"  element={
              <><Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
              <div className="app-container">
                <div className="add-task-container">
                <AddTask />
                </div>
                <div className="task-list-container">
                  <TaskList />
                  </div>
              </div>
              </>
              }
            />
            <Route path="/editTask/" element={<EditTask />} />
            <Route path="/auth/:authType" element={<Auth setIsAuthenticated={setIsAuthenticated}/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
