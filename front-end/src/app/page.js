import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { Button } from "@/components/ui/button"

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="width-4/5 max-w-6xl container p-8 bg-white shadow-md rounded-md text-center">
      
        {/* Logo Section */}
        <div className="flex justify-center mb-8 mt-16">
          <Image className="" src="/a.png" alt="Logo" width={100} height={100} /> 
        </div>

        <header className="mb-8">
          <h1 className="text-3xl font-bold">Welcome to My Todo App</h1>
          <p className="mt-2 text-gray-600">Organize your tasks and boost your productivity.</p>
        </header>

        <p className="text-lg m-32 text-gray-700">
          My Todo App helps you stay organized and focused by allowing you to create, manage, and prioritize your tasks efficiently.
        </p>
      </div>
    </div>
      
  );
};

export default HomePage;
