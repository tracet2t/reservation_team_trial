"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='));
      setIsLoggedIn(!!token); 
    };

    checkAuthStatus();
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    setIsLoggedIn(false); 
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" passHref>
          <span className="text-white text-lg font-bold">
            My Todo
          </span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {!isLoggedIn ? (
              <>
                <NavigationMenuItem>
                  <Link href="/login" passHref>
                    <NavigationMenuLink asChild>
                      <Button variant="outline" className={navigationMenuTriggerStyle()}>
                        Login
                      </Button>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/register" passHref>
                    <NavigationMenuLink asChild>
                      <Button variant="outline" className={navigationMenuTriggerStyle()}>
                        Register
                      </Button>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <Button
                  variant="outline"
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
