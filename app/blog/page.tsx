"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      setSubscribed(true);
    }, 1500);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Blog</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Insights, reflections, and inspirational content on counseling
          psychology, mental health, and professional development.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
          </TabsList>
        </div>

        {/* Empty state for all tabs */}
        <TabsContent value="all" className="mt-8">
          <EmptyBlogState />
        </TabsContent>

        <TabsContent value="diaries" className="mt-8">
          <EmptyBlogState />
        </TabsContent>

        <TabsContent value="quotes" className="mt-8">
          <EmptyBlogState />
        </TabsContent>
      </Tabs>

      {/* Newsletter subscription section */}
    </div>
  );
}

function EmptyBlogState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6 dark:bg-red-950">
        <BookOpen className="text-red-600 dark:text-red-300" size={24} />
      </div>
      <h2 className="text-xl font-bold mb-3">Blog Coming Soon</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        I'm currently working on thoughtful content to share insights and
        reflections on counseling psychology, mental health, and professional
        development.
      </p>
      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium">
        <span>Check back soon</span>
        <ArrowRight size={16} />
      </div>
    </div>
  );
}
