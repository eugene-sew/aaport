"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About",
    href: "/about",
    subItems: [{ title: "Counseling", href: "/about/counseling" }],
  },
  {
    title: "Research",
    href: "/research",
    subItems: [
      { title: "Publications", href: "/research/publications" },
      { title: "Book Chapters", href: "/research/book-chapters" },
      {
        title: "Conference Presentations",
        href: "/research/conference-presentations",
      },
    ],
  },
  { title: "Teaching", href: "/teaching" },
  {
    title: "Professional Leadership",
    href: "/professional-leadership",
    subItems: [
      { title: "Supervision", href: "/professional-leadership/supervision" },
      {
        title: "Community Service",
        href: "/professional-leadership/community-service",
      },
    ],
  },
  {
    title: "Blog",
    href: "/blog",
    subItems: [
      { title: "Diaries", href: "/blog/diaries" },
      { title: "Quotes", href: "/blog/quotes" },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
    subItems: [{ title: "Request my CV", href: "/contact/request-cv" }],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={closeMenu}
        >
          <span className="text-xl font-bold text-red-600">Asmau Ayub</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <div key={item.title} className="relative group">
              {item.subItems ? (
                <div className="flex items-center cursor-pointer">
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-red-600",
                      pathname === item.href
                        ? "text-red-600"
                        : "text-foreground"
                    )}
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                  <div className="absolute left-0 top-full hidden pt-2 group-hover:block">
                    <div className="rounded-xl border bg-background shadow-md">
                      <div className="p-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className={cn(
                              "block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-red-600",
                              pathname === subItem.href
                                ? "bg-muted text-red-600"
                                : "text-foreground"
                            )}
                            onClick={closeMenu}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-red-600",
                    pathname === item.href ? "text-red-600" : "text-foreground"
                  )}
                  onClick={closeMenu}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                {mounted && theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
          <nav className="container grid gap-2 p-4">
            {navItems.map((item) => (
              <div key={item.title} className="py-1">
                {item.subItems ? (
                  <div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-lg font-medium">{item.title}</span>
                    </div>
                    <div className="ml-4 border-l pl-4">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className={cn(
                            "block py-2 text-sm transition-colors hover:text-red-600",
                            pathname === subItem.href
                              ? "text-red-600"
                              : "text-foreground"
                          )}
                          onClick={closeMenu}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 text-lg font-medium transition-colors hover:text-red-600",
                      pathname === item.href
                        ? "text-red-600"
                        : "text-foreground"
                    )}
                    onClick={closeMenu}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
