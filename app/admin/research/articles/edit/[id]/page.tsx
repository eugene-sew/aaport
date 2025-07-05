"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const publicationStatuses = [
  "Published",
  "In Review",
  "In Press",
  "Forthcoming",
  "Working Paper",
  "Submitted",
];

interface ArticleData {
  title: string;
  authors: string;
  year: number | null;
  journal_name: string | null;
  volume: string | null;
  issue: string | null;
  pages: string | null;
  doi: string | null;
  link_to_full_content: string | null;
  publication_status: string;
  abstract_excerpt: string | null;
  keywords: string | null;
  user_id?: string; // user_id is set on insert, not typically updated directly by form
  is_recent: boolean;
  is_featured: boolean;
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const articleId = params.id as string;

  const [formData, setFormData] = useState<ArticleData>({
    title: '',
    authors: '',
    year: null,
    journal_name: '',
    volume: '',
    issue: '',
    pages: '',
    doi: '',
    link_to_full_content: '',
    publication_status: '',
    abstract_excerpt: '',
    keywords: '',
    is_recent: false,
    is_featured: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId || !supabase) {
        setError("Invalid article ID or Supabase client not available.");
        setIsFetching(false);
        return;
      }
      setIsFetching(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('research_articles')
          .select('*')
          .eq('id', articleId)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error('Article not found.');
        
        setFormData({
          title: data.title || '',
          authors: data.authors || '',
          year: data.year === null ? null : Number(data.year),
          journal_name: data.journal_name || '',
          volume: data.volume || '',
          issue: data.issue || '',
          pages: data.pages || '',
          doi: data.doi || '',
          link_to_full_content: data.link_to_full_content || '',
          publication_status: data.publication_status || '',
          abstract_excerpt: data.abstract_excerpt || '',
          keywords: data.keywords || '',
          is_recent: data.is_recent || false,
          is_featured: data.is_featured || false,
        });
      } catch (err: any) {
        console.error('Error fetching article:', err);
        setError(err.message || 'Failed to fetch article data.');
      } finally {
        setIsFetching(false);
      }
    };
    fetchArticle();
  }, [articleId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: checked }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, year: value === '' ? null : parseInt(value) }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, publication_status: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user || !supabase) {
      setError("User not authenticated or Supabase client not available.");
      return;
    }
    if (!formData.publication_status) {
        setError("Publication status is required.");
        return;
    }

    setIsLoading(true);

    const articleUpdateData: ArticleData = {
      ...formData,
      year: formData.year === null ? null : Number(formData.year), // Ensure year is number or null
    };
    // user_id should not be part of the update payload from the form directly
    // RLS policies should handle ownership/permissions

    try {
      const { error: updateError } = await supabase
        .from('research_articles')
        .update(articleUpdateData)
        .match({ id: articleId });

      if (updateError) {
        throw updateError;
      }

      setSuccess('Article updated successfully!');
      setTimeout(() => {
        router.push('/admin/research/articles');
      }, 1500);

    } catch (err: any) {
      console.error('Error updating article:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading article data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Edit Article</h1>
        <Link href="/admin/research/articles">
          <Button variant="outline">&larr; Back to Articles</Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert variant="default" className="bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Primary Information</CardTitle>
            <CardDescription>Edit the main details of the article. All fields here are required.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
              <Input id="title" value={formData.title} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="authors">Authors (comma-separated) <span className="text-red-500">*</span></Label>
              <Input id="authors" value={formData.authors} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="year">Year <span className="text-red-500">*</span></Label>
              <Input id="year" type="number" value={formData.year === null ? '' : formData.year} onChange={handleYearChange} required className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publication Details</CardTitle>
            <CardDescription>Update the journal and publication specifics. All fields here are optional.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="journal_name">Journal Name</Label>
              <Input id="journal_name" value={formData.journal_name || ''} onChange={handleInputChange} className="mt-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="volume">Volume</Label>
                <Input id="volume" value={formData.volume || ''} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="issue">Issue</Label>
                <Input id="issue" value={formData.issue || ''} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="pages">Pages (e.g., 123-145)</Label>
                <Input id="pages" value={formData.pages || ''} onChange={handleInputChange} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="doi">DOI</Label>
              <Input id="doi" value={formData.doi || ''} onChange={handleInputChange} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content and Status</CardTitle>
            <CardDescription>Update the publication status and supplementary content.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="publication_status">Publication Status <span className="text-red-500">*</span></Label>
              <Select value={formData.publication_status} onValueChange={handleStatusChange} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {publicationStatuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="link_to_full_content">Link to Full Content (URL)</Label>
              <Input id="link_to_full_content" type="url" value={formData.link_to_full_content || ''} onChange={handleInputChange} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="abstract_excerpt">Abstract / Excerpt</Label>
              <Textarea id="abstract_excerpt" value={formData.abstract_excerpt || ''} onChange={handleInputChange} className="mt-1" rows={5} />
            </div>
            <div>
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input id="keywords" value={formData.keywords || ''} onChange={handleInputChange} className="mt-1" />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_recent"
                  checked={formData.is_recent}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="is_recent">Mark as Recent Publication</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="is_featured">Feature on Homepage</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading || isFetching}>
            {isLoading ? 'Saving...' : 'Update Article'}
          </Button>
        </div>
      </form>
    </div>
  );
}
