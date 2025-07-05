"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Pencil, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";

interface Presentation {
  id: string;
  title: string;
  presenters: string;
  year: number;
  presentation_type: string;
  venue: string | null;
  location: string | null;
  date: string | null;
  publication_status: string;
  is_featured: boolean;
  is_recent: boolean;
  created_at: string;
}

export default function AcademicPresentationsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [presentationToDelete, setPresentationToDelete] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchPresentations = async () => {
      if (!user || !supabase) {
        setError("User not authenticated or Supabase client not available.");
        setIsLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from("research_presentations")
          .select("*")
          .order("year", { ascending: false });

        if (fetchError) throw fetchError;

        setPresentations(data || []);
      } catch (err: any) {
        console.error("Error fetching presentations:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPresentations();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!user || !supabase) {
      toast({
        title: "Error",
        description: "User not authenticated or Supabase client not available.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from("research_presentations")
        .delete()
        .match({ id });

      if (deleteError) throw deleteError;

      setPresentations((prev) =>
        prev.filter((presentation) => presentation.id !== id)
      );
      toast({
        title: "Success",
        description: "Presentation deleted successfully.",
      });
    } catch (err: any) {
      console.error("Error deleting presentation:", err);
      toast({
        title: "Error",
        description: `Failed to delete presentation: ${err.message}`,
        variant: "destructive",
      });
    } finally {
      setPresentationToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p>Loading presentations...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Manage Academic Presentations
        </h1>
        <Link href="/admin/research/academic-presentations/add">
          <Button>Add New Presentation</Button>
        </Link>
      </div>

      {presentations.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No presentations found. Add your first presentation to get
              started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {presentations.map((presentation) => (
            <Card key={presentation.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">
                      {presentation.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Presenters: {presentation.presenters}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{presentation.year}</Badge>
                    <Badge variant="secondary">
                      {presentation.presentation_type}
                    </Badge>
                    <Badge variant="outline">
                      {presentation.publication_status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {presentation.venue && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Venue:</span>{" "}
                    {presentation.venue}
                  </p>
                )}
                {presentation.location && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Location:</span>{" "}
                    {presentation.location}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {presentation.is_featured && (
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
                      Featured
                    </Badge>
                  )}
                  {presentation.is_recent && (
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                      Recent
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(
                      `/admin/research/academic-presentations/${presentation.id}/edit`
                    )
                  }
                >
                  <Pencil className="h-4 w-4 mr-1" /> Edit
                </Button>
                <AlertDialog
                  open={presentationToDelete === presentation.id}
                  onOpenChange={(open) =>
                    !open && setPresentationToDelete(null)
                  }
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setPresentationToDelete(presentation.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the presentation "
                        {presentation.title}". This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(presentation.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
