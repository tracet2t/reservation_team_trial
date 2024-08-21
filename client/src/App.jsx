import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./features/home/Home.jsx";
import { Route, Routes } from "react-router-dom";
import CreateUser from './features/create_todo/CreateTodo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
    </Routes>
  );
}

export default App;
