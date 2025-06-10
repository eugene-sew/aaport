"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBlogQueries } from "@/hooks/useBlogQuery";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const { useBlogBySlug, useBlogCategories } = useBlogQueries();
  
  // Fetch blog post by slug
  const { 
    data: post, 
    isLoading: postLoading,
    error: postError 
  } = useBlogBySlug(slug);
  
  // Fetch blog categories
  const { 
    data: categories = [],
    isLoading: categoriesLoading 
  } = useBlogCategories();
  
  // Get category name by id
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "";
  };
  
  // Handle 404 - redirect to blog listing if post not found
  useEffect(() => {
    if (!postLoading && !post && !postError) {
      router.push("/blog");
    }
  }, [post, postLoading, postError, router]);
  
  // Loading state
  if (postLoading || categoriesLoading) {
    return (
      <div className="container py-12 md:py-16">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (postError) {
    return (
      <div className="container py-12 md:py-16">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Error Loading Blog Post</h1>
          <p className="text-muted-foreground mb-6">
            There was an error loading this blog post. Please try again later.
          </p>
          <Button onClick={() => router.push("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </div>
      </div>
    );
  }
  
  // Post not found state
  if (!post) {
    return (
      <div className="container py-12 md:py-16">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </div>
      </div>
    );
  }
  
  // Format date
  const formattedDate = post.published_at 
    ? format(new Date(post.published_at), "MMMM d, yyyy")
    : format(new Date(post.created_at), "MMMM d, yyyy");
  
  return (
    <div className="container py-12 md:py-16">
      {/* Back button */}
      <div className="mb-8">
        <Button variant="outline" onClick={() => router.push("/blog")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Button>
      </div>
      
      {/* Featured image */}
      {post.featured_image && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Post header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          
          {post.category_id && (
            <div className="flex items-center">
              <Tag className="mr-1 h-4 w-4" />
              <Badge variant="outline">
                {getCategoryName(post.category_id)}
              </Badge>
            </div>
          )}
        </div>
      </div>
      
      {/* Post excerpt */}
      {post.excerpt && (
        <div className="mb-8">
          <p className="text-lg text-muted-foreground italic">{post.excerpt}</p>
        </div>
      )}
      
      {/* Post content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
