import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

// Define interfaces for each research type
export interface ResearchArticle {
  id: string;
  created_at: string;
  title: string;
  authors: string;
  year: number;
  journal_name?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  link_url?: string;
  link_to_full_content?: string; // Database field name
  publication_status: string;
  abstract_excerpt?: string;
  keywords?: string;
  is_recent?: boolean;
  is_featured?: boolean;
  featured_image?: string;
}

export interface ResearchBook {
  id: string;
  created_at: string;
  title: string;
  authors_editors: string;
  year: number;
  type: 'Book' | 'Book Chapter';
  publisher?: string;
  isbn?: string;
  link_url?: string;
  link_to_full_content?: string; // Database field name
  publication_status: string;
  abstract_excerpt?: string;
  keywords?: string;
  parent_book_title?: string;
  parent_book_authors_editors?: string;
  pages?: string;
  is_recent?: boolean;
  is_featured?: boolean;
  featured_image?: string;
}

export interface ResearchPresentation {
  id: string;
  created_at: string;
  title: string;
  presenters: string;
  year: number;
  presentation_type: string;
  venue?: string;
  location?: string;
  date?: string;
  link_url?: string;
  link_to_full_content?: string; // Database field name
  publication_status: string;
  abstract?: string;
  is_recent?: boolean;
  is_featured?: boolean;
  featured_image?: string;
}

export function useResearchTables() {
  // Fetch articles
  const useArticles = () => {
    return useQuery({
      queryKey: ['research_articles'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('research_articles')
          .select('*')
          .order('year', { ascending: false });
          
        if (error) {
          throw new Error(`Error fetching articles: ${error.message}`);
        }
        
        // Map the database field names to the interface field names
        const mappedData = data?.map(item => {
          return {
            ...item,
            // Map link_to_full_content to link_url if it exists
            link_url: item.link_to_full_content,
          };
        }) || [];
        
        return mappedData as ResearchArticle[];
      }
    });
  };
  
  // Fetch books
  const useBooks = () => {
    return useQuery({
      queryKey: ['research_books'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('research_books')
          .select('*')
          .order('year', { ascending: false });
          
        if (error) {
          throw new Error(`Error fetching books: ${error.message}`);
        }
        
        // Map the database field names to the interface field names
        const mappedData = data?.map(item => {
          return {
            ...item,
            // Map link_to_full_content to link_url if it exists
            link_url: item.link_to_full_content,
          };
        }) || [];
        
        return mappedData as ResearchBook[];
      }
    });
  };
  
  // Fetch presentations
  const usePresentations = () => {
    return useQuery({
      queryKey: ['research_presentations'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('research_presentations')
          .select('*')
          .order('year', { ascending: false });
          
        if (error) {
          throw new Error(`Error fetching presentations: ${error.message}`);
        }
        
        // Map the database field names to the interface field names
        const mappedData = data?.map(item => {
          return {
            ...item,
            // Map link_to_full_content to link_url if it exists
            link_url: item.link_to_full_content,
          };
        }) || [];
        
        return mappedData as ResearchPresentation[];
      }
    });
  };
  
  // Fetch featured research items from all tables
  const useFeaturedResearch = () => {
    const { data: articles } = useArticles();
    const { data: books } = useBooks();
    const { data: presentations } = usePresentations();
    
    return {
      featuredArticles: articles?.filter(article => article.is_featured) || [],
      featuredBooks: books?.filter(book => book.is_featured) || [],
      featuredPresentations: presentations?.filter(presentation => presentation.is_featured) || []
    };
  };
  
  // Fetch recent research items from all tables
  const useRecentResearch = () => {
    const { data: articles } = useArticles();
    const { data: books } = useBooks();
    const { data: presentations } = usePresentations();
    
    return {
      recentArticles: articles?.filter(article => article.is_recent) || [],
      recentBooks: books?.filter(book => book.is_recent) || [],
      recentPresentations: presentations?.filter(presentation => presentation.is_recent) || []
    };
  };
  
  return {
    useArticles,
    useBooks,
    usePresentations,
    useFeaturedResearch,
    useRecentResearch
  };
}
