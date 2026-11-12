"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  GraduationCap,
  Users,
  Image,
  Mail,
  FolderArchive,
  MessageSquare,
  Award,
} from "lucide-react";
import { useContactStats } from "@/hooks/useContactStats";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  subItems?: MenuItem[];
}

const AdminSidebar = () => {
  const pathname = usePathname();
  const { useUnreadMessageCount } = useContactStats();
  const { data: unreadCount = 0 } = useUnreadMessageCount();
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: "/admin/dashboard",
    },
    {
      title: "Blog",
      icon: <FileText className="w-5 h-5" />,
      href: "/admin/blog",
    },
    {
      title: "Research",
      icon: <BookOpen className="w-5 h-5" />,
      href: "/admin/research",
      subItems: [
        {
          title: "Article Publications",
          icon: <FileText className="w-4 h-4" />,
          href: "/admin/research/articles",
        },
        {
          title: "Book Publications",
          icon: <BookOpen className="w-4 h-4" />,
          href: "/admin/research/books",
        },
        {
          title: "Academic Presentations",
          icon: <GraduationCap className="w-4 h-4" />,
          href: "/admin/research/academic-presentations",
        },
      ],
    },
    {
      title: "Professional Leadership",
      icon: <FolderArchive className="w-5 h-5" />,
      href: "/admin/professional-leadership",
      subItems: [
        {
          title: "Supervision",
          icon: <Users className="w-4 h-4" />,
          href: "/admin/professional-leadership/supervision",
        },
        {
          title: "Speaking Engagement",
          icon: <GraduationCap className="w-4 h-4" />,
          href: "/admin/professional-leadership/speaking-engagement",
        },
      ],
    },
    {
      title: "Community Service",
      icon: <Users className="w-5 h-5" />,
      href: "/admin/community-service",
    },
    {
      title: "Awards",
      icon: <Award className="w-5 h-5" />,
      href: "/admin/awards",
    },
    {
      title: "Contacts",
      icon: <MessageSquare className="w-5 h-5" />,
      href: "/admin/contacts",
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      title: "Newsletter",
      icon: <Mail className="w-5 h-5" />,
      href: "/admin/newsletter",
    },
  ];

  return (
    <div className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex-shrink-0">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Link href="/admin/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            Admin Panel
          </span>
        </Link>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isParentActive = pathname?.startsWith(item.href);
          const isSubMenuActive = item.subItems?.some((subItem) =>
            pathname?.startsWith(subItem.href)
          );

          if (item.subItems) {
            return (
              <div key={item.title}>
                <button
                  onClick={() => toggleSubMenu(item.title)}
                  className={`flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors text-left ${
                    isParentActive || isSubMenuActive
                      ? "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </div>
                  {openSubMenus[item.title] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {openSubMenus[item.title] && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.subItems.map((subItem) => {
                      const isSubItemActive =
                        pathname === subItem.href ||
                        pathname?.startsWith(`${subItem.href}/`);
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`flex items-center px-4 py-2 rounded-md transition-colors text-sm ${
                            isSubItemActive
                              ? "bg-gray-200 dark:bg-gray-600 text-blue-600 dark:text-blue-500"
                              : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {subItem.icon && (
                            <span className="mr-2">{subItem.icon}</span>
                          )}
                          {subItem.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </div>
              {item.badge !== undefined && (
                <span className="flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
