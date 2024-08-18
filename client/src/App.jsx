import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./features/home/Home";
import { Route, Routes } from "react-router-dom";
import CreateUser from "./features/create_user/CreateUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
    </Routes>
  );
}

export default App;
