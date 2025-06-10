import { useQuery } from "@tanstack/react-query";
import { useContent, Content, Category } from "./useContent";
import { useContentStore } from "@/store/contentStore";

export const useBlogQueries = () => {
  const { getContents, getCategories, getContentById } = useContent();
  const { setContents, setCategories, setContent } = useContentStore();

  // Get published blog posts
  const usePublishedBlogs = (options?: {
    categoryId?: number;
    limit?: number;
    offset?: number;
    searchTerm?: string;
  }) => {
    return useQuery({
      queryKey: [
        "publishedBlogs", 
        options?.categoryId, 
        options?.limit, 
        options?.offset, 
        options?.searchTerm
      ],
      queryFn: async () => {
        const result = await getContents("blog", {
          status: "published",
          categoryId: options?.categoryId,
          limit: options?.limit || 6,
          offset: options?.offset || 0,
          searchTerm: options?.searchTerm,
        });
        
        // Update the Zustand store
        setContents(result.contents);
        
        return result;
      },
    });
  };

  // Get blog categories
  const useBlogCategories = () => {
    return useQuery({
      queryKey: ["blogCategories"],
      queryFn: async () => {
        const categories = await getCategories("blog");
        
        // Update the Zustand store
        setCategories(categories);
        
        return categories;
      },
    });
  };

  // Get a single blog post by slug
  const useBlogBySlug = (slug: string) => {
    return useQuery({
      queryKey: ["blog", slug],
      queryFn: async () => {
        // This is a simplified approach - in a real app, you'd have a getContentBySlug method
        // For now, we'll fetch all published blogs and find the one with matching slug
        const result = await getContents("blog", { status: "published" });
        const blog = result.contents.find(blog => blog.slug === slug);
        
        if (blog) {
          setContent(blog);
        }
        
        return blog;
      },
      enabled: !!slug,
    });
  };

  // Get featured blogs (most recent published blogs)
  const useFeaturedBlogs = (limit: number = 3) => {
    return useQuery({
      queryKey: ["featuredBlogs", limit],
      queryFn: async () => {
        const result = await getContents("blog", {
          status: "published",
          limit,
        });
        
        return result.contents;
      },
    });
  };

  return {
    usePublishedBlogs,
    useBlogCategories,
    useBlogBySlug,
    useFeaturedBlogs,
  };
};
