"use client";

import { useState } from "react";
import Link from "next/link";
import { useResearchQueries } from "@/hooks/useResearchQuery";
import { ResearchStatus, ResearchType } from "@/store/researchStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  BookOpen,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function ResearchPage() {
  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<ResearchStatus | "all">("all");
  const [researchType, setResearchType] = useState<ResearchType | "all">("all");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Get research works with filters
  const { useResearchWorks, useResearchCategories, useDeleteResearchWork } =
    useResearchQueries();

  // Fetch research works with filters
  const {
    data: researchData,
    isLoading: isLoadingResearch,
    refetch,
  } = useResearchWorks({
    status: status as ResearchStatus | "all",
    researchType:
      researchType !== "all" ? (researchType as ResearchType) : undefined,
    categoryId,
    year,
    page,
    limit: 10,
    searchTerm: searchTerm || undefined,
  });

  // Fetch research categories
  const { data: categories = [], isLoading: isLoadingCategories } =
    useResearchCategories();

  // Delete mutation
  const { mutate: deleteResearchWork } = useDeleteResearchWork();

  // Handle search
  const handleSearch = () => {
    setPage(1);
    refetch();
  };

  // Handle filter changes
  const handleStatusChange = (value: string) => {
    setStatus(value as ResearchStatus | "all");
    setPage(1);
    refetch();
  };

  const handleTypeChange = (value: string) => {
    setResearchType(value as ResearchType | "all");
    setPage(1);
    refetch();
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value === "all" ? undefined : Number(value));
    setPage(1);
    refetch();
  };

  const handleYearChange = (value: string) => {
    setYear(value === "all" ? undefined : Number(value));
    setPage(1);
    refetch();
  };

  // Handle delete
  const handleDelete = () => {
    if (deleteId) {
      deleteResearchWork(deleteId);
      setDeleteId(null);
    }
  };

  // Get category name by ID
  const getCategoryName = (categoryId?: number) => {
    if (!categoryId) return "Uncategorized";
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  // Format research type for display
  const formatResearchType = (type: ResearchType) => {
    switch (type) {
      case "publication":
        return "Publication";
      case "book_chapter":
        return "Book Chapter";
      case "article":
        return "Article";
      case "conference_presentation":
        return "Conference Presentation";
      default:
        return type;
    }
  };

  // Get status badge variant
  const getStatusBadge = (status: ResearchStatus) => {
    switch (status) {
      case "published":
        return <Badge variant="default">Published</Badge>;
      case "in_review":
        return <Badge variant="destructive">In Review</Badge>;
      case "ongoing":
        return <Badge variant="outline">Ongoing</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Generate unique years for the filter
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 20; i--) {
      years.push(i);
    }
    return years;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Research Works</h1>
          <p className="text-muted-foreground">
            Manage your research publications, articles, and presentations
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/research/add">
            <Plus className="mr-2 h-4 w-4" /> Add Research
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search research works..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <Button variant="outline" size="icon" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Status Filter */}
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select value={researchType} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="publication">Publication</SelectItem>
              <SelectItem value="book_chapter">Book Chapter</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="conference_presentation">
                Conference Presentation
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select
            value={categoryId ? String(categoryId) : "all"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year Filter */}
          <Select
            value={year ? String(year) : "all"}
            onValueChange={handleYearChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {getYears().map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Research Works Table */}
      <div className="bg-card rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingResearch ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <BookOpen className="mr-2 h-4 w-4 animate-pulse" />
                    Loading research works...
                  </div>
                </TableCell>
              </TableRow>
            ) : researchData?.works.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      No research works found
                    </p>
                    <Button asChild className="mt-4">
                      <Link href="/admin/research/add">
                        <Plus className="mr-2 h-4 w-4" /> Add Your First
                        Research
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              researchData?.works.map((work) => (
                <TableRow key={work.id}>
                  <TableCell className="font-medium">{work.title}</TableCell>
                  <TableCell>{work.year}</TableCell>
                  <TableCell>
                    {formatResearchType(work.research_type)}
                  </TableCell>
                  <TableCell>{getCategoryName(work.category_id)}</TableCell>
                  <TableCell>{getStatusBadge(work.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/research/edit/${work.id}`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/research/${work.slug}`} target="_blank">
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => setDeleteId(work.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {researchData && researchData.totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from(
              { length: researchData.totalPages },
              (_, i) => i + 1
            ).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={pageNum === page}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((p) => Math.min(p + 1, researchData.totalPages))
                }
                className={
                  page === researchData.totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              research work and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
