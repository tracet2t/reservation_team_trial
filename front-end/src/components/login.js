"use client"; 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';



const MessageModal = ({ message, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full text-center">
          <p>{message}</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </div>
      </div>
    </>
  );
};

const getCookieValue = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5150/api/v1/auth/login', { email, password });

      const { token,isAdmin } = response.data;
      console.log(token,isAdmin);

      document.cookie = `token=${token}; path=/; max-age=3600`; 
      document.cookie = `isAdmin=${isAdmin}; path=/; max-age=3600`; 

      setSuccess('Login successful! Redirecting to tasks...');
      setShowMessage(true);
      dispatch(login()); 



      setTimeout(() => {
        router.push('/tasks');
      }, 1500);
    } catch (error) {
      setError('Invalid email or password');
      setShowMessage(true);
    }
  };

  const closeMessageModal = () => {
    setShowMessage(false);
    if (success) {
      router.push('/tasks');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="p-8 bg-white shadow-md rounded-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>

      </div>

      {showMessage && (
        <MessageModal 
          message={success || error} 
          onClose={closeMessageModal} 
        />
      )}
    </div>
  );
};

export default LoginPage;
