'use client';

import { Inter } from 'next/font/google';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

const inter = Inter({ subsets: ['latin'] });

// Metadata needs to be in a separate file for client components
// We'll create a separate metadata.ts file if needed

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Check if path is /admin/login
  const isLoginPage = pathname === '/admin/login';
  
  useEffect(() => {
    // Only check authorization after auth has loaded
    if (!loading) {
      if (!session && !isLoginPage) {
        // Not authenticated and not on login page, redirect to login
        console.log('Not authenticated, redirecting to login');
        router.push('/admin/login');
      } else if (session) {
        // User is authenticated
        setIsAuthorized(true);
        
        // If on login page but already authenticated, redirect to dashboard
        if (isLoginPage) {
          console.log('Already authenticated, redirecting to dashboard');
          router.push('/admin');
        }
      }
    }
  }, [session, loading, router, isLoginPage, pathname]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className={inter.className}>
        <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  // For login page or authorized users, show the appropriate layout
  return (
    <div className={inter.className}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {session && <AdminSidebar />}
        <div className="flex-1 flex flex-col overflow-hidden">
          {session && <AdminHeader user={session.user} />}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
            {(isAuthorized || isLoginPage) ? children : null}
          </main>
        </div>
      </div>
    </div>
  );
}
