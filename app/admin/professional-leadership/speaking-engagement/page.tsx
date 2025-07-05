"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProfessionalLeadershipTables } from '@/hooks/useProfessionalLeadershipTables';
import { useAuth } from '@/hooks/useAuth';

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
import { Plus, Edit, Trash2, Calendar, MapPin, Users, Award, ExternalLink } from 'lucide-react';

export default function SpeakingEngagementPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { useSpeakingEngagements, useDeleteSpeakingEngagement } = useProfessionalLeadershipTables();
  const { data: engagements, isLoading, error } = useSpeakingEngagements();
  const deleteSpeakingEngagementMutation = useDeleteSpeakingEngagement();
  
  const [engagementToDelete, setEngagementToDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteSpeakingEngagementMutation.mutateAsync(id);
      setEngagementToDelete(null);
    } catch (err: any) {
      console.error('Error deleting speaking engagement:', err);
      toast({
        title: "Error",
        description: err.message || "An error occurred while deleting the speaking engagement.",
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/professional-leadership" className="text-blue-500 hover:underline">
            &larr; Back to Professional Leadership
          </Link>
          <h1 className="text-2xl font-bold mt-2">Speaking Engagements</h1>
          <p className="text-muted-foreground">Manage your speaking engagements and presentations.</p>
        </div>
        <Button onClick={() => router.push('/admin/professional-leadership/speaking-engagement/add')}>
          <Plus className="mr-2 h-4 w-4" /> Add New Engagement
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
            <p>Failed to load speaking engagements: {error instanceof Error ? error.message : 'Unknown error'}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.refresh()}>Try Again</Button>
          </CardFooter>
        </Card>
      ) : engagements && engagements.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {engagements.map((engagement) => (
            <Card key={engagement.id} className="overflow-hidden transition-all hover:shadow-md">
              {engagement.featured_image && (
                <div className="relative w-full h-40 overflow-hidden">
                  <img 
                    src={engagement.featured_image} 
                    alt={engagement.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{engagement.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {engagement.event_name}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{engagement.engagement_type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Organization:</span> {engagement.organization}
                </p>
                {engagement.date && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {formatDate(engagement.date)}
                  </p>
                )}
                {engagement.location && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {engagement.location}
                  </p>
                )}
                {engagement.audience_type && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {engagement.audience_type} {engagement.audience_size && `(${engagement.audience_size})`}
                  </p>
                )}
                {engagement.is_featured && (
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
                  onClick={() => router.push(`/admin/professional-leadership/speaking-engagement/${engagement.id}/edit`)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setEngagementToDelete(engagement.id)}
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
            <CardTitle>No Speaking Engagements</CardTitle>
            <CardDescription>
              You haven't added any speaking engagements yet. Click the button below to add your first engagement.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push('/admin/professional-leadership/speaking-engagement/add')}>
              <Plus className="mr-2 h-4 w-4" /> Add New Engagement
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!engagementToDelete} onOpenChange={(open) => !open && setEngagementToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the speaking engagement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => engagementToDelete && handleDelete(engagementToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
