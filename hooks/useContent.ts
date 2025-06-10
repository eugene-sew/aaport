import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";

export type ContentType =
  | "blog"
  | "research"
  | "teaching"
  | "leadership"
  | "counseling";

export interface Category {
  id: number;
  name: string;
  slug: string;
  content_type: ContentType;
  created_at: string;
}

export interface Content {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  category_id: number;
  author_id: string;
  status: "draft" | "published";
  published_at?: string;
  created_at: string;
  updated_at: string;
  content_type: ContentType;
  meta_description?: string;
  tags?: string[];
}

export function useContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | Error | null>(null);

  // Category Management
  const getCategories = async (
    contentType: ContentType
  ): Promise<Category[]> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("content_type", contentType)
        .order("name");

      if (error) {
        setError(error);
        return [];
      }

      return data || [];
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (
    category: Omit<Category, "id" | "created_at">
  ): Promise<Category | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([category])
        .select()
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (
    id: number,
    updates: Partial<Omit<Category, "id" | "created_at">>
  ): Promise<Category | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("categories")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);

      if (error) {
        setError(error);
        return false;
      }

      return true;
    } finally {
      setLoading(false);
    }
  };

  // Content Management
  const getContents = async (
    contentType: ContentType,
    options?: {
      status?: "draft" | "published" | "all";
      categoryId?: number;
      limit?: number;
      offset?: number;
      searchTerm?: string;
    }
  ): Promise<{ contents: Content[]; count: number }> => {
    setLoading(true);
    console.log("getContents called with:", { contentType, options });

    try {
      let query = supabase
        .from("contents")
        .select("*", { count: "exact" })
        .eq("content_type", contentType);

      if (options?.status && options.status !== "all") {
        query = query.eq("status", options.status);
      }

      if (options?.categoryId) {
        query = query.eq("category_id", options.categoryId);
      }

      if (options?.searchTerm) {
        query = query.ilike("title", `%${options.searchTerm}%`);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.offset) {
        query = query.range(
          options.offset,
          options.offset + (options.limit || 10) - 1
        );
      }

      query = query.order("created_at", { ascending: false });

      console.log("Executing Supabase query for contents...");
      const { data, error, count } = await query;

      if (error) {
        console.error("Supabase error in getContents:", error);
        setError(error);
        return { contents: [], count: 0 };
      }

      console.log("Supabase query results:", {
        dataLength: data?.length || 0,
        count,
      });
      return { contents: data || [], count: count || 0 };
    } catch (err) {
      console.error("Unexpected error in getContents:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return { contents: [], count: 0 };
    } finally {
      setLoading(false);
    }
  };

  const getContentById = async (id: number): Promise<Content | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contents")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const getContentBySlug = async (
    slug: string,
    contentType: ContentType
  ): Promise<Content | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contents")
        .select("*")
        .eq("slug", slug)
        .eq("content_type", contentType)
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const createContent = async (
    content: Omit<Content, "id" | "created_at" | "updated_at">
  ): Promise<Content | null> => {
    setLoading(true);
    console.log("Creating content with data:", content);

    try {
      // Ensure we have all required fields
      const contentToInsert = {
        ...content,
        // Add timestamps if not provided
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // Make sure published_at is set if status is published
        published_at:
          content.status === "published"
            ? content.published_at || new Date().toISOString()
            : null,
      };

      console.log("Inserting content into Supabase:", contentToInsert);

      const { data, error } = await supabase
        .from("contents")
        .insert([contentToInsert])
        .select()
        .single();

      if (error) {
        console.error("Error creating content:", error);
        setError(error);
        return null;
      }

      console.log("Content created successfully:", data);
      return data;
    } catch (err) {
      console.error("Unexpected error in createContent:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (
    id: number,
    updates: Partial<Omit<Content, "id" | "created_at" | "updated_at">>
  ): Promise<Content | null> => {
    setLoading(true);
    try {
      console.log("Updating content with ID:", id, "Updates:", updates);

      // Add updated_at timestamp
      const updatedContent = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      // Make sure tags is properly formatted as a JSON array if it exists
      if (updates.tags) {
        console.log("Tags before update:", updates.tags);
        // Ensure tags is stored as a proper array
        if (Array.isArray(updates.tags)) {
          // Keep it as is, it's already an array
          console.log(
            "Tags is already an array with length:",
            updates.tags.length
          );
        } else if (typeof updates.tags === "string") {
          // Convert string to array if needed
          try {
            updatedContent.tags = JSON.parse(updates.tags as string);
          } catch (e) {
            // If it's not valid JSON, treat it as a comma-separated string
            updatedContent.tags = (updates.tags as string)
              .split(",")
              .map((t) => t.trim());
          }
        }
        console.log("Tags after processing:", updatedContent.tags);
      }

      const { data, error } = await supabase
        .from("contents")
        .update(updatedContent)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating content:", error);
        setError(error);
        return null;
      }

      console.log("Content updated successfully:", data);
      return data;
    } catch (err) {
      console.error("Unexpected error in updateContent:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase.from("contents").delete().eq("id", id);

      if (error) {
        setError(error);
        return false;
      }

      return true;
    } finally {
      setLoading(false);
    }
  };

  const publishContent = async (id: number): Promise<Content | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contents")
        .update({
          status: "published",
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const unpublishContent = async (id: number): Promise<Content | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contents")
        .update({
          status: "draft",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        setError(error);
        return null;
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  // Asset Management
  const uploadAsset = async (
    file: File,
    path: string
  ): Promise<string | null> => {
    setLoading(true);
    try {
      console.log("Starting file upload to assets bucket:", { path });

      // Check if the bucket exists
      try {
        const { data: buckets, error: bucketsError } =
          await supabase.storage.listBuckets();

        if (bucketsError) {
          console.error("Error listing buckets:", bucketsError);
          setError(bucketsError);
          return null;
        }

        console.log(
          "Available buckets:",
          buckets.map((b) => b.name)
        );

        if (!buckets.some((b) => b.name === "assets")) {
          const customError = new Error(
            "Assets bucket not found. Please create it in Supabase."
          );
          console.error(customError);
          setError(customError);
          return null;
        }
      } catch (bucketsCheckError) {
        console.error("Error checking buckets:", bucketsCheckError);
      }

      // Generate file name and path
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      console.log("Uploading file:", {
        filePath,
        fileType: file.type,
        fileSize: file.size,
      });

      // Try to upload to the media bucket as fallback if assets fails
      let uploadResult;
      let bucketName = "assets";

      try {
        uploadResult = await supabase.storage
          .from(bucketName)
          .upload(filePath, file);

        if (uploadResult.error) {
          console.error(
            `Error uploading to ${bucketName} bucket:`,
            uploadResult.error
          );

          // Try media bucket as fallback
          bucketName = "media";
          console.log("Trying media bucket as fallback");

          uploadResult = await supabase.storage
            .from(bucketName)
            .upload(filePath, file);
        }
      } catch (uploadException) {
        console.error("Exception during upload:", uploadException);
        setError(uploadException as Error);
        return null;
      }

      // Check final upload result
      if (uploadResult?.error) {
        console.error(
          `Error uploading to ${bucketName} bucket:`,
          uploadResult.error
        );
        setError(uploadResult.error);
        return null;
      }

      console.log(`File uploaded successfully to ${bucketName} bucket`);

      // Get public URL
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      console.log("Generated public URL:", data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error("Unexpected error in uploadAsset:", error);
      setError(error as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteAsset = async (path: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase.storage.from("assets").remove([path]);

      if (error) {
        setError(error);
        return false;
      }

      return true;
    } finally {
      setLoading(false);
    }
  };

  const listAssets = async (
    folder: string
  ): Promise<{ name: string; url: string }[]> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from("assets")
        .list(folder);

      if (error) {
        setError(error);
        return [];
      }

      return data.map((item) => ({
        name: item.name,
        url: supabase.storage
          .from("assets")
          .getPublicUrl(`${folder}/${item.name}`).data.publicUrl,
      }));
    } finally {
      setLoading(false);
    }
  };

  // Analytics
  const getContentMetrics = async (
    contentType: ContentType
  ): Promise<{
    total: number;
    published: number;
    draft: number;
    byCategory: { category: string; count: number }[];
  }> => {
    setLoading(true);
    try {
      // Use a single query to get all content with their categories
      const { data, error } = await supabase
        .from("contents")
        .select(
          `
          id, 
          status,
          categories:category_id (id, name)
        `
        )
        .eq("content_type", contentType);

      if (error) {
        setError(error);
        return { total: 0, published: 0, draft: 0, byCategory: [] };
      }

      // Calculate metrics from the single result set
      const total = data?.length || 0;
      const published =
        data?.filter((item) => item.status === "published").length || 0;
      const draft = total - published;

      // Process category data
      const categoryCounts: Record<string, number> = {};
      data?.forEach((item: any) => {
        if (item.categories?.name) {
          const categoryName = item.categories.name;
          categoryCounts[categoryName] =
            (categoryCounts[categoryName] || 0) + 1;
        }
      });

      const byCategory = Object.entries(categoryCounts)
        .map(([category, count]) => ({ category, count: count as number }))
        .sort((a, b) => b.count - a.count); // Sort by count in descending order

      return {
        total,
        published,
        draft,
        byCategory,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    // Categories
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    // Content
    getContents,
    getContentById,
    getContentBySlug,
    createContent,
    updateContent,
    deleteContent,
    publishContent,
    unpublishContent,
    // Assets
    uploadAsset,
    deleteAsset,
    listAssets,
    // Analytics
    getContentMetrics,
  };
}
