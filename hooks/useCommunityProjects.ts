import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CommunityProject } from "@/types/community-service";
import { useToast } from "@/components/ui/use-toast";
// import { uploadAsset } from '@/hooks/useUploadAsset';
import { useContent } from "./useContent";

export function useCommunityProjects() {
  const supabase = createClientComponentClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { uploadAsset } = useContent();

  // Fetch all community projects
  const useProjects = () => {
    return useQuery({
      queryKey: ["community_projects"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("community_projects")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw new Error(error.message);
        return data as CommunityProject[];
      },
    });
  };

  // Fetch a single project by ID
  const useProject = (id: string) => {
    return useQuery({
      queryKey: ["community_projects", id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("community_projects")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw new Error(error.message);
        return data as CommunityProject;
      },
      enabled: !!id,
    });
  };

  // Add a new project (with image upload)
  const useAddProject = () => {
    return useMutation({
      mutationFn: async (
        input: Omit<CommunityProject, "id" | "created_at" | "updated_at"> & {
          imageFile?: File;
        }
      ) => {
        // Destructure the fields we need, excluding imageFile
        const { imageFile, ...projectData } = input;
        
        // Handle image upload if a file was provided
        let image_url = projectData.image_url || "";
        if (imageFile) {
          const filePath = `community-projects/${Date.now()}_${imageFile.name}`;
          image_url = await uploadAsset(imageFile, filePath);
        }
        
        // Only include database fields in the insert
        const { data, error } = await supabase
          .from("community_projects")
          .insert([{ 
            ...projectData, 
            image_url,
            organization: projectData.organization || null
          }])
          .select()
          .single();
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["community_projects"] });
        toast({ title: "Success", description: "Community project added." });
      },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  // Update a project (with image upload)
  const useUpdateProject = () => {
    return useMutation({
      mutationFn: async (
        input: Partial<CommunityProject> & { id: string; imageFile?: File }
      ) => {
        // organization is included in input
        let image_url = input.image_url || "";
        if (input.imageFile) {
          const filePath = `community-projects/${Date.now()}_${input.imageFile.name}`;
          image_url = await uploadAsset(input.imageFile, filePath);
        }
        const { data, error } = await supabase
          .from("community_projects")
          .update({ ...input, image_url }) // organization is included
          .eq("id", input.id)
          .select()
          .single();
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["community_projects"] });
        queryClient.invalidateQueries({
          queryKey: ["community_projects", variables.id],
        });
        toast({ title: "Success", description: "Community project updated." });
      },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  // Delete a project
  const useDeleteProject = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from("community_projects")
          .delete()
          .eq("id", id);
        if (error) throw new Error(error.message);
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["community_projects"] });
        toast({ title: "Success", description: "Community project deleted." });
      },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return {
    useProjects,
    useProject,
    useAddProject,
    useUpdateProject,
    useDeleteProject,
  };
}
