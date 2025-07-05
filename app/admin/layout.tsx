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
  const { session, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (loading) return; // Wait until authentication state is loaded

    // If not authenticated and not on the login page, redirect to login
    if (!session && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [session, loading, router, isLoginPage]);

  // While loading, show a spinner
  if (loading) {
    return (
      <div className={inter.className}>
        <div className="flex h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // If on the login page, render it without the admin sidebar/header
  if (isLoginPage) {
    return (
      <div className={inter.className}>
        {children}
      </div>
    );
  }

  // If authenticated and not on the login page, show the full admin layout
  if (session) {
    return (
      <div className={inter.className}>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          <AdminSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader user={session.user} />
            <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
              {children}
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for unauthenticated users on non-login pages (should be redirected, but good to have)
  return null;
}
