"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth, logout } from '@/store/authSlice';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

// Function to get a specific cookie value
const getCookieValue = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Retrieve isAdmin from the cookie
  const isAdmin = getCookieValue('isAdmin') === 'true';

  useEffect(() => {
    const token = getCookieValue('token');
    dispatch(setAuth(!!token));
  }, [dispatch]);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    document.cookie = 'isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className="bg-gray-100">
      <nav className="bg-gray-800 p-4 rounded-3xl ml-4 mr-4">
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
                </>
              ) : (
                <>
                  {isAdmin && (
                    <NavigationMenuItem>
                      <Link href="/register" passHref>
                        <NavigationMenuLink asChild>
                          <Button variant="outline" className={navigationMenuTriggerStyle()}>
                            Register
                          </Button>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )}
                  <NavigationMenuItem>
                    <Button
                      variant="outline"
                      className={navigationMenuTriggerStyle()}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
