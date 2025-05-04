'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const finalizeAuth = async () => {
      const code = searchParams.get('code');
      if (!code) return;

      try {
        const res = await fetch(`https:// /api/auth/callback?code=${code}`);
        const data = await res.json();

        if (data.authToken) {
          localStorage.setItem('authToken', data.authToken);
          router.push('/dashboard');
        } else {
          console.error('No authToken returned');
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
      }
    };

    finalizeAuth();
  }, [searchParams]);

  return <p>Authenticating via GitHub...</p>;
}
