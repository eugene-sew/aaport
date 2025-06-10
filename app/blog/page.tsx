"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Mail, Search } from "lucide-react";
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
import { useBlogQueries } from "@/hooks/useBlogQuery";
import BlogCard from "@/components/blog/BlogCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const postsPerPage = 6;

  const { usePublishedBlogs, useBlogCategories } = useBlogQueries();
  
  // Fetch published blog posts
  const { 
    data: blogData = { contents: [], count: 0 },
    isLoading: blogsLoading,
    error: blogsError 
  } = usePublishedBlogs({
    categoryId: selectedCategory,
    limit: postsPerPage,
    offset: (currentPage - 1) * postsPerPage,
    searchTerm: searchTerm
  });

  // Fetch blog categories
  const { 
    data: categories = [],
    isLoading: categoriesLoading 
  } = useBlogCategories();
  
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
  };

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
  
  // Get category name by id
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "";
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

      {/* Search and filter section */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(undefined)}
          >
            All
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog posts grid */}
      {blogsLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : blogData.contents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogData.contents.map((post) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              categoryName={post.category_id ? getCategoryName(post.category_id) : undefined}
            />
          ))}
        </div>
      ) : (
        <EmptyBlogState />
      )}
      
      {/* Pagination */}
      {blogData.count > postsPerPage && (
        <Pagination className="my-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.ceil(blogData.count / postsPerPage) }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < Math.ceil(blogData.count / postsPerPage)) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                className={currentPage >= Math.ceil(blogData.count / postsPerPage) ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

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
      <h2 className="text-xl font-bold mb-3">No Blog Posts Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        There are currently no published blog posts matching your criteria. Please check back later for new content on counseling psychology, mental health, and professional development.
      </p>
      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium">
        <span>Check back soon</span>
        <ArrowRight size={16} />
      </div>
    </div>
  );
}
