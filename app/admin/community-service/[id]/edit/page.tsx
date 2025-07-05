"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCommunityProjects } from "@/hooks/useCommunityProjects";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  role_played_as: z.string().min(1, "Role is required"),
  organization: z.string().optional(),
  description: z.string().optional(),
  imageFile: z.any().optional(), // File
});

type FormValues = z.infer<typeof formSchema>;

export default function EditCommunityProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";
  const { user } = useAuth();
  const { useProject, useUpdateProject } = useCommunityProjects();
  const { data: project, isLoading, error } = useProject(id);
  const updateProjectMutation = useUpdateProject();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      role_played_as: "",
      organization: "",
      description: "",
      imageFile: undefined,
    },
  });

  // Populate form when project is loaded
  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title || "",
        role_played_as: project.role_played_as || "",
        organization: project.organization || "",
        description: project.description || "",
        imageFile: undefined,
      });
      setPreviewUrl(project.image_url || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const onSubmit = async (values: FormValues) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to update a project.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await updateProjectMutation.mutateAsync({
        ...values,
        id,
        user_id: user.id,
      });
      toast({
        title: "Success",
        description: "Community project has been updated successfully.",
      });
      router.push("/admin/community-service");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update project.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview selected image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldOnChange: any) => {
    const file = e.target.files?.[0];
    fieldOnChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else if (project?.image_url) {
      setPreviewUrl(project.image_url);
    } else {
      setPreviewUrl(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin mb-2" />
        <span className="text-muted-foreground">Loading project...</span>
      </div>
    );
  }
  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <p className="text-destructive text-lg font-semibold mb-2">Project not found or failed to load.</p>
        <Button variant="outline" onClick={() => router.push("/admin/community-service")}>Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/community-service" className="text-blue-500 hover:underline inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Community Projects
        </Link>
        <h1 className="text-2xl font-bold mt-2">Edit Community Project</h1>
        <p className="text-muted-foreground">Update your community project record.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Project Details</CardTitle>
          <CardDescription>Update the details of your community project.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" id="project-form">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Neighborhood Clean-Up" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role_played_as"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Played As*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Organizer, Volunteer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Local NGO, School" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the project, your contributions, and outcomes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, field.onChange)}
                      />
                    </FormControl>
                    {previewUrl && (
                      <div className="mt-2">
                        <img src={previewUrl} alt="Preview" className="max-h-40 rounded-md border" />
                      </div>
                    )}
                    <FormDescription>
                      Upload a new image to replace the current one (optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/admin/community-service")}>Cancel</Button>
          <Button type="submit" form="project-form" disabled={isSubmitting}>
            {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>) : ("Save Changes")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
