"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

export default function ResearchDashboardPage() {
  const researchModules = [
    {
      title: "Articles",
      description: "Manage journal articles, pre-prints, and other scholarly articles.",
      href: "/admin/research/articles",
      icon: <FileText className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Books & Chapters",
      description: "Manage published books, book chapters, and edited volumes.",
      href: "/admin/research/books",
      icon: <BookOpen className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Academic Presentations",
      description: "Manage conference papers, posters, and invited talks.",
      href: "/admin/research/academic-presentations",
      icon: <GraduationCap className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Research Management</h1>
        <p className="text-muted-foreground">
          Select a category to manage your research works.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {researchModules.map((module) => (
          <Link href={module.href} key={module.title} className="group">
            <Card className="h-full flex flex-col transition-all hover:shadow-lg hover:border-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  {module.title}
                </CardTitle>
                {module.icon}
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{module.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                  <div className="text-sm font-medium text-primary group-hover:underline flex items-center">
                    Go to {module.title}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}