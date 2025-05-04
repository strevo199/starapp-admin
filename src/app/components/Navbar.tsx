'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Navbar = ({isauth}:{isauth:boolean}) => {

  

    const router = useRouter();
  const handleLogin = async () => {
    try {
      const res = await fetch('/api/proxy-login');
      const {data} = await res.json();
console.log('data',data);

      if (data) {
        const authWindow = window.open(
            data,
            "_blank",
            "width=500,height=600"
          );
          window.location.href = '/auth/token';
          
      } else {
        console.error('OAuth URL not found');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout');
    window.location.href = '/';
  };
  

  return (
    <nav className="p-4 shadow-md flex justify-between">
      <h1 className="text-xl font-semibold">StarApp</h1>
      {isauth ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login with GitHub
        </button>
      )}
    </nav>
  );
};

export default Navbar;
