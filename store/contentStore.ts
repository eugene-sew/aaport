import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

// Define types for our content and categories
interface Content {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  category_id?: number;
  tags?: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ContentState {
  contents: Content[];
  categories: Category[];
  currentContent: Content | null;
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  fetchContents: () => Promise<Content[]>;
  fetchCategories: () => Promise<Category[]>;
  fetchContentById: (id: number) => Promise<Content | null>;
  clearError: () => void;
  
  // Setters for TanStack Query integration
  setContents: (contents: Content[]) => void;
  setCategories: (categories: Category[]) => void;
  setContent: (content: Content | null) => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  categories: [],
  currentContent: null,
  isLoading: false,
  error: null,
  
  fetchContents: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      set({ contents: data || [], isLoading: false });
      return data || [];
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      return [];
    }
  },
  
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      set({ categories: data || [], isLoading: false });
      return data || [];
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      return [];
    }
  },
  
  fetchContentById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      return null;
    }
  },
  
  clearError: () => {
    set({ error: null });
  },
  
  // Setter implementations for TanStack Query integration
  setContents: (contents: Content[]) => {
    set({ contents });
  },
  
  setCategories: (categories: Category[]) => {
    set({ categories });
  },
  
  setContent: (content: Content | null) => {
    set({ currentContent: content });
  }
}));
