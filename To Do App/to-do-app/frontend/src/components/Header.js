import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/auth/login');
  };

  return (
    <header className="header">
      <h1>To-Do App</h1>
      <nav>
        <ul className="header-nav">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/">Home</Link> 
                {/* AddTask page */}
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
              <Link to="/auth/login">Login</Link>
              </li>
              <li>
                <Link to="/auth/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
