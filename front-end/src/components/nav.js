
import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-bold">
          Todo
        </Link>
        <div className="flex space-x-4">

          <Link href="/login" passHref>
            <Button variant="outline" className="text-black border-black hover:bg-gray-200">
              Login
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button variant="outline" className="text-black border-black hover:bg-gray-200">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
