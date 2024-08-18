import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Header />
      <App />
      <Footer />
    </Router>
  </StrictMode>
);
