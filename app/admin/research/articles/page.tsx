"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Edit, Trash2, PlusCircle, CheckCircle2 } from 'lucide-react';

// Define an interface for the article structure based on your Supabase table
interface Article {
  id: string;
  created_at: string;
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
  user_id: string;
}

export default function ArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!supabase) {
        setError("Supabase client is not available.");
        setLoading(false);
        return;
      }
      if (!user) { // Wait for user to be loaded if RLS depends on it, or for user_id filtering
        // setError("User not authenticated."); // Or simply wait
        // setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('research_articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }
        setArticles(data || []);
      } catch (err: any) {
        console.error('Error fetching articles:', err);
        setError(err.message || 'Failed to fetch articles.');
      } finally {
        setLoading(false);
      }
    };

    // Fetch articles when user is available
    if (user) {
        fetchArticles();
    }
    // If user is explicitly null (not just loading), you might want to handle that (e.g. show login message)
    // For now, it just waits until user object is populated.

  }, [user]); // Re-fetch if user changes

  const handleDelete = async (articleId: string) => {
    setError(null);
    setSuccessMessage(null);
    if (confirm('Are you sure you want to delete this article?')) {
      if (!supabase) {
        setError("Supabase client is not available.");
        return;
      }
      try {
        const { error: deleteError } = await supabase
          .from('research_articles')
          .delete()
          .match({ id: articleId });

        if (deleteError) {
          throw deleteError;
        }

        setArticles(articles.filter(article => article.id !== articleId));
        setSuccessMessage('Article deleted successfully!');
        setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds

      } catch (err: any) {
        console.error('Error deleting article:', err);
        setError(err.message || 'Failed to delete article.');
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Manage Articles</h1>
        <Link href="/admin/research/articles/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Article
          </Button>
        </Link>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {successMessage && (
        <Alert variant="default" className="mb-4 bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <p>Loading articles...</p>
      ) : articles.length === 0 && !error ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500 mb-4">No articles found.</p>
          <p className="text-gray-400">Get started by adding a new article.</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Authors</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.authors}</TableCell>
                  <TableCell>{article.year}</TableCell>
                  <TableCell>{article.publication_status}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/research/articles/edit/${article.id}`} passHref>
                      <Button variant="outline" size="sm" className="mr-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
