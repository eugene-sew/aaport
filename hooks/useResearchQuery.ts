import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useResearch } from "./useResearch";
import { useResearchStore, ResearchWork, ResearchCategory, ResearchStatus, ResearchType } from "@/store/researchStore";
import { toast } from "./use-toast";

export function useResearchQueries() {
  const { 
    getResearchWorks, 
    getResearchCategories, 
    getResearchWorkBySlug,
    getResearchWorkById,
    createResearchWork,
    updateResearchWork,
    deleteResearchWork,
    createResearchCategory,
    updateResearchCategory,
    deleteResearchCategory,
    uploadResearchImage
  } = useResearch();
  
  const { 
    setResearchWorks, 
    setResearchCategories,
    addResearchWork,
    updateResearchWork: updateStoreResearchWork,
    deleteResearchWork: deleteStoreResearchWork,
    addResearchCategory,
    updateResearchCategory: updateStoreResearchCategory,
    deleteResearchCategory: deleteStoreResearchCategory
  } = useResearchStore();
  
  const queryClient = useQueryClient();

  // Get research works with filters and pagination
  const useResearchWorks = (
    options?: {
      status?: ResearchStatus | 'all';
      categoryId?: number;
      researchType?: ResearchType;
      year?: number;
      limit?: number;
      page?: number;
      searchTerm?: string;
    }
  ) => {
    const limit = options?.limit || 10;
    const offset = options?.page ? (options.page - 1) * limit : 0;
    
    return useQuery({
      queryKey: ['researchWorks', { ...options, offset }],
      queryFn: async () => {
        const result = await getResearchWorks({
          ...options,
          limit,
          offset
        });
        
        // Update store with fetched research works
        setResearchWorks(result.works);
        
        return {
          works: result.works,
          count: result.count,
          totalPages: Math.ceil(result.count / limit),
          currentPage: Math.floor(offset / limit) + 1
        };
      }
    });
  };
  
  // Get published research works for public display
  const usePublishedResearchWorks = (
    options?: {
      categoryId?: number;
      researchType?: ResearchType;
      year?: number;
      limit?: number;
      page?: number;
      searchTerm?: string;
    }
  ) => {
    return useResearchWorks({
      ...options,
      status: 'published'
    });
  };
  
  // Get research categories
  const useResearchCategories = () => {
    return useQuery({
      queryKey: ['researchCategories'],
      queryFn: async () => {
        const categories = await getResearchCategories();
        
        // Update store with fetched categories
        setResearchCategories(categories);
        
        return categories;
      }
    });
  };
  
  // Get a single research work by slug
  const useResearchWorkBySlug = (slug: string) => {
    return useQuery({
      queryKey: ['researchWork', slug],
      queryFn: async () => {
        const work = await getResearchWorkBySlug(slug);
        return work;
      },
      enabled: !!slug
    });
  };
  
  // Get a single research work by ID
  const useResearchWorkById = (id?: number) => {
    return useQuery({
      queryKey: ['researchWork', id],
      queryFn: async () => {
        if (!id) return null;
        const work = await getResearchWorkById(id);
        return work;
      },
      enabled: !!id
    });
  };
  
  // Create a new research work
  const useCreateResearchWork = () => {
    return useMutation({
      mutationFn: async (
        researchWork: Omit<ResearchWork, "id" | "created_at" | "updated_at" | "author_id">
      ) => {
        const newWork = await createResearchWork(researchWork);
        if (!newWork) throw new Error("Failed to create research work");
        return newWork;
      },
      onSuccess: (newWork) => {
        // Update store
        addResearchWork(newWork);
        
        // Invalidate queries
        queryClient.invalidateQueries({ queryKey: ['researchWorks'] });
        
        toast({
          title: "Success",
          description: "Research work created successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to create research work: ${error.message}`,
          variant: "destructive",
        });
      }
    });
  };
  
  // Update an existing research work
  const useUpdateResearchWork = () => {
    return useMutation({
      mutationFn: async ({
        id,
        data
      }: {
        id: number;
        data: Partial<ResearchWork>;
      }) => {
        const updatedWork = await updateResearchWork(id, data);
        if (!updatedWork) throw new Error("Failed to update research work");
        return updatedWork;
      },
      onSuccess: (updatedWork) => {
        // Update store
        updateStoreResearchWork(updatedWork.id, updatedWork);
        
        // Invalidate queries
        queryClient.invalidateQueries({ queryKey: ['researchWorks'] });
        queryClient.invalidateQueries({ queryKey: ['researchWork', updatedWork.id] });
        
        toast({
          title: "Success",
          description: "Research work updated successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to update research work: ${error.message}`,
          variant: "destructive",
        });
      }
    });
  };
  
  // Delete a research work
  const useDeleteResearchWork = () => {
    return useMutation({
      mutationFn: async (id: number) => {
        const success = await deleteResearchWork(id);
        if (!success) throw new Error("Failed to delete research work");
        return id;
      },
      onSuccess: (id) => {
        // Update store
        deleteStoreResearchWork(id);
        
        // Invalidate queries
        queryClient.invalidateQueries({ queryKey: ['researchWorks'] });
        
        toast({
          title: "Success",
          description: "Research work deleted successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to delete research work: ${error.message}`,
          variant: "destructive",
        });
      }
    });
  };
  
  // Create a new research category
  const useCreateResearchCategory = () => {
    return useMutation({
      mutationFn: async (name: string) => {
        const newCategory = await createResearchCategory(name);
        if (!newCategory) throw new Error("Failed to create category");
        return newCategory;
      },
      onSuccess: (newCategory) => {
        // Update store
        addResearchCategory(newCategory);
        
        // Invalidate queries
        queryClient.invalidateQueries({ queryKey: ['researchCategories'] });
        
        toast({
          title: "Success",
          description: "Category created successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to create category: ${error.message}`,
          variant: "destructive",
        });
      }
    });
  };
  
  // Update an existing research category
  const useUpdateResearchCategory = () => {
    return useMutation({
      mutationFn: async ({
        id,
        name
      }: {
        id: number;
        name: string;
      }) => {
        const updatedCategory = await updateResearchCategory(id, name);
        if (!updatedCategory) throw new Error("Failed to update category");
        return updatedCategory;
      },
      onSuccess: (updatedCategory) => {
        // Update store
        updateStoreResearchCategory(updatedCategory.id, updatedCategory);
        
        // Invalidate queries
        queryClient.invalidateQueries({ queryKey: ['researchCategories'] });
        
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to update category: ${error.message}`,
          variant: "destructive",
        });
      }
    });
  };
  
  // Delete a research category
  const useDeleteResearchCategory = () => {
    return useMutation({
      mutationFn: async (id: number) => {
        const success = await deleteResearchCategory(id);
        if (!success) throw new Error("Failed to delete category");
        return id;
      },
      onSuccess: (id) => {
        // Update store
        deleteStoreResearchCategory(id);
        
        // Invalidate queries
        queryClient.invalidateQueries({ queryKey: ['researchCategories'] });
        
        toast({
          title: "Success",
          description: "Category deleted successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to delete category: ${error.message}`,
          variant: "destructive",
        });
      }
    });
  };
  
  // Upload a research image
  const useUploadResearchImage = () => {
    return useMutation({
      mutationFn: async (file: File) => {
        const imageUrl = await uploadResearchImage(file);
        if (!imageUrl) throw new Error("Failed to upload image");
        return imageUrl;
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to upload image: ${error.message}`,
          variant: "destructive",
        });
      }
    });
  };
  
  return {
    useResearchWorks,
    usePublishedResearchWorks,
    useResearchCategories,
    useResearchWorkBySlug,
    useResearchWorkById,
    useCreateResearchWork,
    useUpdateResearchWork,
    useDeleteResearchWork,
    useCreateResearchCategory,
    useUpdateResearchCategory,
    useDeleteResearchCategory,
    useUploadResearchImage
  };
}
