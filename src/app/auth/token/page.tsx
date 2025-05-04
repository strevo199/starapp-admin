'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store.tsx';
import { login } from '@/store.tsx/slices/authSlice';

export default function ManualTokenAuth() {
  const [token, setToken] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    await fetch('/api/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    dispatch(login());

    router.push('/dashboard');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">Paste Your Auth Token</h2>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Enter token from backend"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Authenticate
      </button>
    </div>
  );
}
