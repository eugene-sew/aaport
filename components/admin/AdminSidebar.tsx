'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  GraduationCap, 
  Users, 
  Image, 
  Settings,
  FolderArchive
} from 'lucide-react';

const AdminSidebar = () => {
  const pathname = usePathname();
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: '/admin/dashboard',
    },
    {
      title: 'Blog',
      icon: <FileText className="w-5 h-5" />,
      href: '/admin/blog',
    },
    {
      title: 'Research',
      icon: <BookOpen className="w-5 h-5" />,
      href: '/admin/research',
    },
    {
      title: 'Teaching',
      icon: <GraduationCap className="w-5 h-5" />,
      href: '/admin/teaching',
    },
    {
      title: 'Leadership',
      icon: <Users className="w-5 h-5" />,
      href: '/admin/leadership',
    },
    {
      title: 'Categories',
      icon: <FolderArchive className="w-5 h-5" />,
      href: '/admin/categories',
    },
    {
      title: 'Media',
      icon: <Image className="w-5 h-5" />,
      href: '/admin/media',
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      href: '/admin/settings',
    },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex-shrink-0">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Link href="/admin/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</span>
        </Link>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
