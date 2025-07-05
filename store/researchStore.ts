import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ResearchStatus = 'published' | 'in_review' | 'ongoing';
export type ResearchType = 'publication' | 'book_chapter' | 'article' | 'conference_presentation';

export interface ResearchCategory {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface ResearchWork {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  abstract?: string;
  year: number;
  co_authors: string[];
  status: ResearchStatus;
  research_type: ResearchType;
  category_id?: number;
  featured_image?: string;
  presentation_images?: string[];
  author_id: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  meta_description?: string;
  tags?: string[];
  link_url?: string;
  is_recent?: boolean;
  is_featured?: boolean;
}

interface ResearchState {
  researchWorks: ResearchWork[];
  researchCategories: ResearchCategory[];
  setResearchWorks: (researchWorks: ResearchWork[]) => void;
  setResearchCategories: (categories: ResearchCategory[]) => void;
  addResearchWork: (researchWork: ResearchWork) => void;
  updateResearchWork: (id: number, researchWork: Partial<ResearchWork>) => void;
  deleteResearchWork: (id: number) => void;
  addResearchCategory: (category: ResearchCategory) => void;
  updateResearchCategory: (id: number, category: Partial<ResearchCategory>) => void;
  deleteResearchCategory: (id: number) => void;
}

export const useResearchStore = create<ResearchState>()(
  devtools(
    (set) => ({
      researchWorks: [],
      researchCategories: [],
      
      setResearchWorks: (researchWorks) => set({ researchWorks }),
      
      setResearchCategories: (researchCategories) => set({ researchCategories }),
      
      addResearchWork: (researchWork) => 
        set((state) => ({
          researchWorks: [...state.researchWorks, researchWork]
        })),
      
      updateResearchWork: (id, updatedResearchWork) =>
        set((state) => ({
          researchWorks: state.researchWorks.map((work) =>
            work.id === id ? { ...work, ...updatedResearchWork } : work
          )
        })),
      
      deleteResearchWork: (id) =>
        set((state) => ({
          researchWorks: state.researchWorks.filter((work) => work.id !== id)
        })),
      
      addResearchCategory: (category) =>
        set((state) => ({
          researchCategories: [...state.researchCategories, category]
        })),
      
      updateResearchCategory: (id, updatedCategory) =>
        set((state) => ({
          researchCategories: state.researchCategories.map((category) =>
            category.id === id ? { ...category, ...updatedCategory } : category
          )
        })),
      
      deleteResearchCategory: (id) =>
        set((state) => ({
          researchCategories: state.researchCategories.filter((category) => category.id !== id)
        }))
    }),
    { name: 'research-store' }
  )
);
