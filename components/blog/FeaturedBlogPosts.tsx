"use client";

import { useBlogQueries } from "@/hooks/useBlogQuery";
import BlogCard from "./BlogCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark, Loader2 } from "lucide-react";
import Link from "next/link";

export default function FeaturedBlogPosts() {
  const { useFeaturedBlogs, useBlogCategories } = useBlogQueries();

  // Fetch featured blog posts (latest 3 only)
  const {
    data: featuredPosts = [],
    isLoading: postsLoading,
    error: postsError,
  } = useFeaturedBlogs(3); // Limit to 3 posts

  // Fetch blog categories
  const { data: categories = [], isLoading: categoriesLoading } =
    useBlogCategories();

  // Get category name by id
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  };

  // Loading state
  if (postsLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  // Error state
  if (postsError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load blog posts</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  // No posts state
  if (featuredPosts.length === 0) {
    return (
      <div className="mb-14">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-5">
            <Bookmark
              className="text-[#FF2819] dark:text-[#FF2819]/70"
              size={20}
            />
          </div>
          <h3 className="text-xl font-medium mb-3">Blog Coming Soon</h3>
          <p className="text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            I'm currently preparing thoughtful content to share with you. Check
            back soon for articles on Thoughts, reflections and insights on
            life, research and the evolving landscape of academia
          </p>
        </div>
      </div>
    );
  }

  // Display featured posts (only the 3 most recent)
  return (
    <div className="mb-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {featuredPosts.slice(0, 3).map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            categoryName={
              post.category_id ? getCategoryName(post.category_id) : undefined
            }
            className="h-full" // Ensure each card takes full height
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/blog">
          <Button variant="outline" className="group">
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
