'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContentStore } from '@/store/contentStore';
import { useContent, Content, Category, ContentType } from './useContent';

type ContentQueryParams = {
  type?: ContentType;
  status?: 'all' | 'published' | 'draft';
  limit?: number;
  offset?: number;
  searchTerm?: string;
};

export function useContentQueries() {
  const contentStore = useContentStore();
  const contentHooks = useContent();
  const queryClient = useQueryClient();

  // Get all contents with caching
  const useContents = (params: ContentQueryParams = { type: 'blog' }) => {
    return useQuery<{ contents: Content[]; count: number }>({
      queryKey: ["contents", params],
      queryFn: async (): Promise<{ contents: Content[]; count: number }> => {
        const result = await contentHooks.getContents(params.type as ContentType, params);
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
  const useCategories = (type: ContentType = 'blog') => {
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
      mutationFn: async ({ id, updates }: { id: number; updates: Partial<Content> }) => {
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
      mutationFn: (newContent: Omit<Content, "id" | "created_at" | "updated_at">) => contentHooks.createContent(newContent),
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
      mutationFn: (file: File) => contentHooks.uploadAsset(file, 'default'),
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
