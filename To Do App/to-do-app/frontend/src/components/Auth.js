import React, { useState } from'react';
import { useNavigate } from'react-router-dom';
// import'../styles/Auth.css';

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
    <form onSubmit={handleAuth}class Name="auth-form">
        <h1 class Name="text-2xl font-bold mb-4">{isRegistering ? 'Register' : 'Login'}</h1>
        <label class Name="block mb-2">Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded mb-4" required />
        <label class Name="block mb-2">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" required />
        <button type="submit"class Name="bg-blue-500 text-white px-4 py-2 rounded">{isRegistering ? 'Register' : 'Login'}</button>
        <p onClick={() => setIsRegistering(!isRegistering)} className="text-blue-500 cursor-pointer mt-4">
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}</p>
      
    </form>
  );
}

export default Auth;
