"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; // Corrected client import

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  PlusCircle,
  Edit,
  Trash2,
  Loader2,
  Search,
  Eye,
  EyeOff,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Award {
  id: string;
  title: string;
  category: string;
  year: number | null;
  is_visible: boolean;
}

export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [awardToDelete, setAwardToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAwards, setTotalAwards] = useState(0);

  const AWARDS_PER_PAGE = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  const fetchAwards = useCallback(async () => {
    setLoading(true);
    const from = (currentPage - 1) * AWARDS_PER_PAGE;
    const to = from + AWARDS_PER_PAGE - 1;

    let query = supabase
      .from("awards")
      .select("id, title, category, year, is_visible", { count: "exact" });

    if (searchTerm) {
      query = query.ilike("title", `%${searchTerm}%`);
    }

    if (activeTab !== "All") {
      query = query.eq("category", activeTab);
    }

    const { data, error, count } = await query
      .order("year", { ascending: false })
      .range(from, to);

    if (error) {
      setError("Failed to fetch awards. Please try again.");
      console.error("Error fetching awards:", error);
      setAwards([]);
      setTotalAwards(0);
    } else {
      setAwards(data || []);
      setTotalAwards(count || 0);
    }
    setLoading(false);
  }, [supabase, currentPage, searchTerm, activeTab]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAwards();
    }, 300); // Debounce search input

    return () => clearTimeout(delayDebounceFn);
  }, [fetchAwards]);

  const handleDeleteClick = (id: string) => {
    setAwardToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleVisibilityChange = async (
    awardId: string,
    currentVisibility: boolean
  ) => {
    const newVisibility = !currentVisibility;
    // Optimistically update the UI
    setAwards((prevAwards) =>
      prevAwards.map((award) =>
        award.id === awardId ? { ...award, is_visible: newVisibility } : award
      )
    );

    const { error } = await supabase
      .from("awards")
      .update({ is_visible: newVisibility })
      .eq("id", awardId);

    if (error) {
      // Revert the change if the update fails
      setAwards((prevAwards) =>
        prevAwards.map((award) =>
          award.id === awardId
            ? { ...award, is_visible: currentVisibility }
            : award
        )
      );
      setError(`Failed to update visibility: ${error.message}`);
    } else {
      setError(null); // Clear previous errors on success
    }
  };

  const handleConfirmDelete = async () => {
    if (!awardToDelete) return;

    const { error } = await supabase
      .from("awards")
      .delete()
      .eq("id", awardToDelete);

    if (error) {
      setError("Failed to delete award. Please try again.");
      console.error("Error deleting award:", error);
    } else {
      setAwards(awards.filter((award) => award.id !== awardToDelete));
    }

    setShowDeleteAlert(false);
    setAwardToDelete(null);
  };

  const totalPages = Math.ceil(totalAwards / AWARDS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Awards & Recognitions</h1>
          <p className="text-muted-foreground">
            Manage your awards and recognitions.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/awards/add">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Award
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Academic Award">Academic</TabsTrigger>
            <TabsTrigger value="Leadership & Community Recognition">
              Leadership
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Title</TableHead>
                <TableHead className="w-[25%]">Category</TableHead>
                <TableHead className="w-[10%]">Year</TableHead>
                <TableHead className="w-[10%]">Visibility</TableHead>
                <TableHead className="text-right w-[15%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {awards.length > 0 ? (
                awards.map((award) => (
                  <TableRow key={award.id}>
                    <TableCell
                      className="font-medium max-w-md truncate"
                      title={award.title}
                    >
                      {award.title}
                    </TableCell>
                    <TableCell>{award.category}</TableCell>
                    <TableCell>{award.year || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`visibility-switch-${award.id}`}
                          checked={award.is_visible}
                          onCheckedChange={() =>
                            handleVisibilityChange(award.id, award.is_visible)
                          }
                          aria-label="Toggle award visibility"
                        />
                        {award.is_visible ? (
                          <Eye className="h-4 w-4 text-green-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/awards/edit/${award.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(award.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    No awards found. Get started by adding a new one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}

      {!loading && !error && totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : undefined
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-4 py-2 text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              award record from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
