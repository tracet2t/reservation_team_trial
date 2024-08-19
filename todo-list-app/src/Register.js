import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ fetchFunction = fetch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchFunction('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Registration Response:', data); // Debug statement

      if (response.ok) {
        // Redirect to login page on successful registration
        navigate('/login');
      } else {
        console.error('Registration Error:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="login-button"
        >
          Already have an account? 
        </button>
      </form>
    </div>
  );
};

export default Register;
