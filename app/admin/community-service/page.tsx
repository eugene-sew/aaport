"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCommunityProjects } from '@/hooks/useCommunityProjects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

export default function CommunityServicePage() {
  const router = useRouter();
  const { useProjects, useDeleteProject } = useCommunityProjects();
  const { data: projects, isLoading, error } = useProjects();
  const deleteProjectMutation = useDeleteProject();
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteProjectMutation.mutateAsync(id);
      setProjectToDelete(null);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'An error occurred while deleting the project.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Community Projects</h1>
          <p className="text-muted-foreground">Manage your community project records.</p>
        </div>
        <Button onClick={() => router.push('/admin/community-service/add')}>
          <Plus className="mr-2 h-4 w-4" /> Add New Project
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
            <p>Failed to load community projects: {error instanceof Error ? error.message : 'Unknown error'}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.refresh()}>Try Again</Button>
          </CardFooter>
        </Card>
      ) : projects && projects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden transition-all hover:shadow-md">
              {project.image_url && (
                <div className="relative w-full h-40 overflow-hidden">
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="mt-1">
                      <span className="flex items-center gap-1">
                        <ImageIcon className="h-3.5 w-3.5" /> {project.role_played_as}
                      </span>
                      {project.organization && (
                        <div className="text-xs text-muted-foreground mt-1">
                          <span className="font-medium">Organization:</span> {project.organization}
                        </div>
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {project.description && (
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/admin/community-service/${project.id}/edit`)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setProjectToDelete(project.id)}
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
            <CardTitle>No Community Projects</CardTitle>
            <CardDescription>
              You haven't added any community projects yet. Click the button below to add your first project.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push('/admin/community-service/add')}>
              <Plus className="mr-2 h-4 w-4" /> Add New Project
            </Button>
          </CardFooter>
        </Card>
      )}
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the community project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => projectToDelete && handleDelete(projectToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
