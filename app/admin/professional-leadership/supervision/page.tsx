"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProfessionalLeadershipTables } from '@/hooks/useProfessionalLeadershipTables';
import { useAuth } from '@/hooks/useAuth';
import { Supervision } from '@/types/professional-leadership';

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { toast } from '@/components/ui/use-toast';

// Icons
import { Plus, Edit, Trash2, Calendar, MapPin, User, Award } from 'lucide-react';

export default function SupervisionPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { useSupervisions, useDeleteSupervision } = useProfessionalLeadershipTables();
  const { data: supervisions, isLoading, error } = useSupervisions();
  const deleteSupervisionMutation = useDeleteSupervision();
  
  const [supervisionToDelete, setSupervisionToDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteSupervisionMutation.mutateAsync(id);
      setSupervisionToDelete(null);
    } catch (err: any) {
      console.error('Error deleting supervision:', err);
      toast({
        title: "Error",
        description: err.message || "An error occurred while deleting the supervision record.",
        variant: "destructive",
      });
    }
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format date range for display
  const formatDateRange = (startDate?: string, endDate?: string, isOngoing?: boolean) => {
    const start = startDate ? formatDate(startDate) : 'N/A';
    if (isOngoing) return `${start} - Present`;
    return endDate ? `${start} - ${formatDate(endDate)}` : start;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/professional-leadership" className="text-blue-500 hover:underline">
            &larr; Back to Professional Leadership
          </Link>
          <h1 className="text-2xl font-bold mt-2">Supervision Records</h1>
          <p className="text-muted-foreground">Manage your supervision records and mentoring activities.</p>
        </div>
        <Button onClick={() => router.push('/admin/professional-leadership/supervision/add')}>
          <Plus className="mr-2 h-4 w-4" /> Add New Supervision
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i} className="bg-muted/30">
              <CardHeader>
                <div className="h-6 w-2/3 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="bg-destructive/10">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load supervision records: {error instanceof Error ? error.message : 'Unknown error'}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.refresh()}>Try Again</Button>
          </CardFooter>
        </Card>
      ) : supervisions && supervisions.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {supervisions.map((supervision) => (
            <Card key={supervision.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{supervision.title}</CardTitle>
                    <CardDescription className="mt-1">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" /> {supervision.supervisee_name}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{supervision.supervision_type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {supervision.organization && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Organization:</span> {supervision.organization}
                  </p>
                )}
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDateRange(supervision.start_date, supervision.end_date, supervision.is_ongoing)}
                </p>
                {supervision.location && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {supervision.location}
                  </p>
                )}
                {supervision.hours && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Hours:</span> {supervision.hours}
                  </p>
                )}
                {supervision.is_featured && (
                  <div className="mt-2">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center w-fit gap-1">
                      <Award className="h-3 w-3" /> Featured
                    </Badge>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/admin/professional-leadership/supervision/${supervision.id}/edit`)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setSupervisionToDelete(supervision.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Supervision Records</CardTitle>
            <CardDescription>
              You haven't added any supervision records yet. Click the button below to add your first record.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push('/admin/professional-leadership/supervision/add')}>
              <Plus className="mr-2 h-4 w-4" /> Add New Supervision
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!supervisionToDelete} onOpenChange={(open) => !open && setSupervisionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the supervision record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => supervisionToDelete && handleDelete(supervisionToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
