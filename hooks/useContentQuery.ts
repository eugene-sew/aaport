"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContentStore } from "@/store/contentStore";
import { useContent, Content, Category, ContentType } from "./useContent";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";

type ContentQueryParams = {
  type?: ContentType;
  status?: "all" | "published" | "draft";
  limit?: number;
  offset?: number;
  searchTerm?: string;
};

export function useContentQueries() {
  const contentStore = useContentStore();
  const contentHooks = useContent();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Get all contents with caching
  const useContents = (params: ContentQueryParams = { type: "blog" }) => {
    return useQuery<{ contents: Content[]; count: number }>({
      queryKey: ["contents", params],
      queryFn: async (): Promise<{ contents: Content[]; count: number }> => {
        const result = await contentHooks.getContents(
          params.type as ContentType,
          params
        );
        contentStore.setContents(result.contents);
        return result;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  // Get content by ID with caching
  const useContentById = (id: number) => {
    return useQuery<Content | null>({
      queryKey: ["content", id],
      queryFn: async (): Promise<Content | null> => {
        const data = await contentHooks.getContentById(id);
        contentStore.setContent(data);
        return data;
      },
      enabled: !!id, // Only run if id is provided
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  // Get categories with caching
  const useCategories = (type: ContentType = "blog") => {
    return useQuery<Category[]>({
      queryKey: ["categories", type],
      queryFn: async (): Promise<Category[]> => {
        const data = await contentHooks.getCategories(type);
        contentStore.setCategories(data);
        return data;
      },
      staleTime: 1000 * 60 * 10, // 10 minutes
    });
  };

  // Update content with cache invalidation
  const useUpdateContent = () => {
    return useMutation({
      mutationFn: async ({
        id,
        updates,
      }: {
        id: number;
        updates: Partial<Content>;
      }) => {
        return await contentHooks.updateContent(id, updates);
      },
      onSuccess: (data, variables) => {
        // Invalidate detail and list queries
        queryClient.invalidateQueries({ queryKey: ["content", variables.id] });
        queryClient.invalidateQueries({ queryKey: ["contents"] });
      },
    });
  };

  // Create content with cache invalidation
  const useCreateContent = () => {
    return useMutation({
      mutationFn: (
        newContent: Omit<Content, "id" | "created_at" | "updated_at">
      ) => contentHooks.createContent(newContent),
      onSuccess: () => {
        // Invalidate list queries
        queryClient.invalidateQueries({ queryKey: ["contents"] });
      },
    });
  };

  // Delete content with cache invalidation
  const useDeleteContent = () => {
    return useMutation({
      mutationFn: (id: number) => contentHooks.deleteContent(id),
      onSuccess: () => {
        // Invalidate list queries
        queryClient.invalidateQueries({ queryKey: ["contents"] });
      },
    });
  };
  // Upload asset mutation
  const useUploadAsset = () => {
    return useMutation({
      mutationFn: async (file: File) => {
        if (!supabase) throw new Error("Supabase client is not available.");
        if (!user) throw new Error("User is not authenticated.");

        const filePath = `public/${user.id}/${Date.now()}_${file.name}`;

        console.log("Starting file upload to assets bucket:", {
          path: filePath,
        });

        const { data: buckets, error: bucketError } =
          await supabase.storage.listBuckets();
        console.log("Available buckets:", buckets);

        if (bucketError) {
          console.error("Error listing buckets:", bucketError);
          throw new Error(
            `Failed to list storage buckets: ${bucketError.message}`
          );
        }

        const bucketExists = buckets.some((b) => b.id === "assets");
        const bucketName = bucketExists ? "assets" : "media";

        console.log(`Uploading to bucket: ${bucketName}`);

        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          throw new Error(`File upload failed: ${uploadError.message}`);
        }

        const { data } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);
        console.log("File uploaded successfully:", {
          publicURL: data.publicUrl,
        });

        return data.publicUrl;
      },
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Asset uploaded successfully.",
        });
      },
      onError: (error: Error) => {
        toast({
          title: "Upload Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return {
    useContents,
    useContent: useContentById, // Rename for clarity and to avoid conflicts
    useCategories,
    useUpdateContent,
    useCreateContent,
    useDeleteContent,
    useUploadAsset,
  };
}
