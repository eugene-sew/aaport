'use client';

import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

const inter = Inter({ subsets: ['latin'] });

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (!loading && session) {
      router.push('/admin/dashboard');
    }
  }, [session, loading, router]);

  return (
    <div className={inter.className}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
