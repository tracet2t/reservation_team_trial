import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ToDo from './ToDo';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/" element={<Register />} /> {/* Default route */}
            <Route path="*" element={<Register />} /> {/* Redirect any unknown route to register */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;