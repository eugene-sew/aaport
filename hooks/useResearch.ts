import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { 
  ResearchCategory, 
  ResearchWork, 
  ResearchStatus, 
  ResearchType 
} from "@/store/researchStore";

export function useResearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | Error | null>(null);

  // Category Management
  const getResearchCategories = async (): Promise<ResearchCategory[]> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("research_categories")
        .select("*")
        .order("name");

      if (error) {
        setError(error);
        return [];
      }

      return data || [];
    } catch (error) {
      setError(error as Error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createResearchCategory = async (
    name: string
  ): Promise<ResearchCategory | null> => {
    setLoading(true);
    try {
      // Generate slug from name
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const { data, error } = await supabase
        .from("research_categories")
        .insert([{ name, slug }])
        .select()
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } catch (error) {
      setError(error as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateResearchCategory = async (
    id: number,
    name: string
  ): Promise<ResearchCategory | null> => {
    setLoading(true);
    try {
      // Generate slug from name
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const { data, error } = await supabase
        .from("research_categories")
        .update({ name, slug })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } catch (error) {
      setError(error as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteResearchCategory = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("research_categories")
        .delete()
        .eq("id", id);

      if (error) {
        setError(error);
        return false;
      }

      return true;
    } catch (error) {
      setError(error as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Research Works Management
  const getResearchWorks = async (options?: {
    status?: ResearchStatus | 'all';
    categoryId?: number;
    researchType?: ResearchType;
    year?: number;
    limit?: number;
    offset?: number;
    searchTerm?: string;
  }): Promise<{ works: ResearchWork[]; count: number }> => {
    setLoading(true);
    try {
      let query = supabase.from("research_works").select("*", { count: "exact" });

      // Apply filters
      if (options?.status && options.status !== 'all') {
        query = query.eq("status", options.status);
      }

      if (options?.categoryId) {
        query = query.eq("category_id", options.categoryId);
      }

      if (options?.researchType) {
        query = query.eq("research_type", options.researchType);
      }

      if (options?.year) {
        query = query.eq("year", options.year);
      }

      if (options?.searchTerm) {
        query = query.or(`title.ilike.%${options.searchTerm}%,abstract.ilike.%${options.searchTerm}%`);
      }

      // Apply pagination
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.offset) {
        query = query.range(
          options.offset,
          options.offset + (options.limit || 10) - 1
        );
      }

      // Order by year (newest first) and then by creation date
      query = query.order("year", { ascending: false }).order("created_at", { ascending: false });

      const { data, error, count } = await query;

      if (error) {
        setError(error);
        return { works: [], count: 0 };
      }

      return { works: data || [], count: count || 0 };
    } catch (error) {
      setError(error as Error);
      return { works: [], count: 0 };
    } finally {
      setLoading(false);
    }
  };

  const getResearchWorkBySlug = async (
    slug: string
  ): Promise<ResearchWork | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("research_works")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } catch (error) {
      setError(error as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getResearchWorkById = async (
    id: number
  ): Promise<ResearchWork | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("research_works")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } catch (error) {
      setError(error as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createResearchWork = async (
    researchWork: Omit<ResearchWork, "id" | "created_at" | "updated_at" | "author_id">
  ): Promise<ResearchWork | null> => {
    setLoading(true);
    try {
      // Get the current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not authenticated");
      }

      // Generate slug from title if not provided
      const slug = researchWork.slug || researchWork.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const { data, error } = await supabase
        .from("research_works")
        .insert([
          {
            ...researchWork,
            slug,
            author_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } catch (error) {
      setError(error as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateResearchWork = async (
    id: number,
    researchWork: Partial<ResearchWork>
  ): Promise<ResearchWork | null> => {
    setLoading(true);
    try {
      // If title is updated, update slug as well
      let updateData = { ...researchWork };
      if (researchWork.title) {
        updateData.slug = researchWork.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }

      const { data, error } = await supabase
        .from("research_works")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } catch (error) {
      setError(error as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteResearchWork = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("research_works")
        .delete()
        .eq("id", id);

      if (error) {
        setError(error);
        return false;
      }

      return true;
    } catch (error) {
      setError(error as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Asset Management for research presentation images
  const uploadResearchImage = async (
    file: File
  ): Promise<string | null> => {
    setLoading(true);
    try {
      // Generate file name and path
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `research/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("assets")
        .upload(filePath, file);

      if (uploadError) {
        setError(uploadError);
        return null;
      }

      // Get public URL
      const { data } = supabase.storage
        .from("assets")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      setError(error as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    // Category operations
    getResearchCategories,
    createResearchCategory,
    updateResearchCategory,
    deleteResearchCategory,
    // Research work operations
    getResearchWorks,
    getResearchWorkBySlug,
    getResearchWorkById,
    createResearchWork,
    updateResearchWork,
    deleteResearchWork,
    // Asset operations
    uploadResearchImage,
  };
}
