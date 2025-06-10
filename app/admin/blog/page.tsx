"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Content, Category } from "@/hooks/useContent";
import { useContentQueries } from "@/hooks/useContentQuery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  Plus,
  Search,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

export default function BlogPage() {
  const router = useRouter();
  const { useContents, useCategories, useDeleteContent } = useContentQueries();
  
  // State for filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const postsPerPage = 10;
  
  // Use TanStack Query for data fetching with automatic caching
  const { 
    data: contentData = { contents: [], count: 0 }, 
    isLoading: contentsLoading, 
    error: contentsError 
  } = useContents();
  
  const { contents } = contentData;
  
  const { 
    data: categories = [], 
    isLoading: categoriesLoading 
  } = useCategories();
  
  // Delete mutation
  const { mutate: deleteContentMutation, isPending: isDeleting } = useDeleteContent();
  const [isDataFetching, setIsDataFetching] = useState(false);

  // Create a categoriesMap for easy lookup
  const categoriesMap = categories.reduce((acc: Record<number, string>, category: any) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  // Filter posts by search term and status
  const filteredPosts = contents?.filter((post: Content) => {
    // Filter by search term
    const matchesSearch = searchTerm === "" || 
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = 
      statusFilter === "all" || 
      post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost) || [];
  const totalPages = Math.ceil((filteredPosts?.length || 0) / postsPerPage);

  // Loading state
  if (contentsLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Error state
  if (contentsError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error loading content: {(contentsError as Error).message}</div>
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        // Use the mutation from TanStack Query
        deleteContentMutation(id);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Button onClick={() => router.push('/admin/blog/add')}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "published" ? "default" : "outline"}
            onClick={() => setStatusFilter("published")}
          >
            Published
          </Button>
          <Button
            variant={statusFilter === "draft" ? "default" : "outline"}
            onClick={() => setStatusFilter("draft")}
          >
            Drafts
          </Button>
        </div>
      </div>

      {/* Debug info */}
      <div className="text-xs text-muted-foreground mb-2">
        Debug:{" "}
        {contentsLoading
          ? "Loading..."
          : `Found ${filteredPosts.length} posts (showing ${currentPosts.length})`}
      </div>

      {currentPosts.length > 0 ? (
        <>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.map((content: Content) => (
                  <TableRow key={content.id}>
                    <TableCell className="font-medium">
                      {content.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          content.status === "published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {content.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="ml-2">
                        {categoriesMap[content.category_id as number] || "Uncategorized"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {content.published_at
                        ? format(new Date(content.published_at), "MMM d, yyyy")
                        : format(new Date(content.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/admin/blog/edit/${content.id}`)
                            }
                            className="cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/blog/${content.slug}`)}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(content.id)}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {/* Show at most 5 page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Calculate which pages to show
                  let pageNum;
                  if (totalPages <= 5) {
                    // Show all pages if 5 or fewer
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    // At the beginning
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    // At the end
                    pageNum = totalPages - 4 + i;
                  } else {
                    // In the middle
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={pageNum === currentPage}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <FileText className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No blog posts found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchTerm
              ? `No results found for "${searchTerm}"`
              : "Get started by creating your first blog post"}
          </p>
          <Button onClick={() => router.push("/admin/blog/new")}>
            Create New Post
          </Button>
        </div>
      )}
    </div>
  );
}
