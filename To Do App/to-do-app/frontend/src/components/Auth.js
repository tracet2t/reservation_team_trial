import React, { useState } from'react';
import { useNavigate } from'react-router-dom';
import'../styles/Auth.css';

function Auth() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    if (isRegistering) {
      console.log('Registering:', { username, password });
    } else {
      console.log('Logging in:', { username, password });
    }
    navigate('/');
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleAuth} className="auth-form">
        <h1 className="auth-title">{isRegistering ? 'Register' : 'Login'}</h1>
        <label className="auth-label">Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="auth-input" required />
        <label className="auth-label">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" required />
        <button type="submit" className="auth-button"> {isRegistering ? 'Register' : 'Login'} </button>
        <p onClick={() => setIsRegistering(!isRegistering)} className="auth-toggle"> {isRegistering? 'Already have an account? Login': "Don't have an account? Register"}</p>
      </form>
  </div>
  );
}

export default Auth;
