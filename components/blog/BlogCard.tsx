"use client";

import { Content, Category } from "@/hooks/useContent";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface BlogCardProps {
  post: Content;
  categoryName?: string;
  className?: string;
}

export default function BlogCard({ post, categoryName, className = '' }: BlogCardProps) {
  const formattedDate = post.published_at 
    ? format(new Date(post.published_at), "MMMM d, yyyy")
    : format(new Date(post.created_at), "MMMM d, yyyy");

  return (
    <Card className={`overflow-hidden h-full flex flex-col ${className}`}>
      <div className="relative h-48 w-full">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-muted h-full w-full flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>
      <CardContent className="flex-grow p-6">
        <div className="flex items-center gap-2 mb-3">
          {categoryName && (
            <Badge variant="outline" className="text-xs">
              {categoryName}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Link 
          href={`/blog/${post.slug}`}
          className="flex items-center text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
        >
          Read more <ArrowRight size={16} className="ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
