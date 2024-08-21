"use client"; 

import React, { useState } from 'react';
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
      {/* Translucent Background */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full text-center">
          <p>{message}</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </div>
      </div>
    </>
  );
};

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', { email, password, name });
      const { token } = response.data;

      // Save token to cookies
      document.cookie = `token=${token}; path=/; max-age=3600`; 

      setSuccess('Registration successful! Redirecting to tasks...');
      setShowMessage(true);
      dispatch(login()); 

      setTimeout(() => {
        router.push('/tasks');
      }, 1500);
    } catch (error) {
      setError('Failed to register. Please try again.');
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
        <h2 className="text-2xl font-bold text-center mb-8">Register</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
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
          <Button type="submit" className="w-full">Register</Button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
        </p>
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

export default RegisterPage;
