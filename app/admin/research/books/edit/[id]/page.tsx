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
  "In Press",
  "Forthcoming",
  "Submitted",
];

const bookTypes = ["Book", "Book Chapter"];

interface BookFormData {
  title: string;
  authors_editors: string;
  year: number | null;
  type: string;
  publisher: string | null;
  isbn: string | null;
  link_to_full_content: string | null;
  publication_status: string;
  abstract_excerpt: string | null;
  keywords: string | null;
  parent_book_title: string | null;
  parent_book_authors_editors: string | null;
  pages: string | null;
  user_id?: string; // Not directly updated by form
  is_recent: boolean;
  is_featured: boolean;
}

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const bookId = params.id as string;

  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    authors_editors: '',
    year: null,
    type: '',
    publisher: '',
    isbn: '',
    link_to_full_content: '',
    publication_status: '',
    abstract_excerpt: '',
    keywords: '',
    parent_book_title: '',
    parent_book_authors_editors: '',
    pages: '',
    is_recent: false,
    is_featured: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId || !supabase) {
        setError("Invalid book ID or Supabase client not available.");
        setIsFetching(false);
        return;
      }
      setIsFetching(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('research_books')
          .select('*')
          .eq('id', bookId)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error('Book/Chapter not found.');
        
        setFormData({
          title: data.title || '',
          authors_editors: data.authors_editors || '',
          year: data.year === null ? null : Number(data.year),
          type: data.type || '',
          publisher: data.publisher || '',
          isbn: data.isbn || '',
          link_to_full_content: data.link_to_full_content || '',
          publication_status: data.publication_status || '',
          abstract_excerpt: data.abstract_excerpt || '',
          keywords: data.keywords || '',
          parent_book_title: data.parent_book_title || '',
          parent_book_authors_editors: data.parent_book_authors_editors || '',
          pages: data.pages || '',
          is_recent: data.is_recent || false,
          is_featured: data.is_featured || false,
        });
      } catch (err: any) {
        console.error('Error fetching book/chapter:', err);
        setError(err.message || 'Failed to fetch book/chapter data.');
      } finally {
        setIsFetching(false);
      }
    };
    if (bookId) {
        fetchBook();
    }
  }, [bookId]);

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

  const handleSelectChange = (id: keyof BookFormData, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user || !supabase) {
      setError("User not authenticated or Supabase client not available.");
      return;
    }
    if (!formData.type) {
        setError("Book type is required.");
        return;
    }
    if (!formData.publication_status) {
        setError("Publication status is required.");
        return;
    }
    if (formData.type === 'Book Chapter' && (!formData.parent_book_title || !formData.parent_book_authors_editors)) {
        setError("Parent book title and authors/editors are required for book chapters.");
        return;
    }

    setIsLoading(true);

    const bookUpdateData: Partial<BookFormData> = {
      title: formData.title,
      authors_editors: formData.authors_editors,
      year: formData.year === null ? null : Number(formData.year),
      type: formData.type,
      publisher: formData.publisher || null,
      isbn: formData.isbn || null,
      link_to_full_content: formData.link_to_full_content || null,
      publication_status: formData.publication_status,
      abstract_excerpt: formData.abstract_excerpt || null,
      keywords: formData.keywords || null,
      is_recent: formData.is_recent,
      is_featured: formData.is_featured,
    };

    if (formData.type === 'Book Chapter') {
      bookUpdateData.parent_book_title = formData.parent_book_title || null;
      bookUpdateData.parent_book_authors_editors = formData.parent_book_authors_editors || null;
      bookUpdateData.pages = formData.pages || null;
    } else {
      // Ensure chapter-specific fields are nulled if type is changed from Book Chapter to Book
      bookUpdateData.parent_book_title = null;
      bookUpdateData.parent_book_authors_editors = null;
      bookUpdateData.pages = null;
    }

    try {
      const { error: updateError } = await supabase
        .from('research_books')
        .update(bookUpdateData)
        .match({ id: bookId });

      if (updateError) {
        throw updateError;
      }

      setSuccess('Book/Chapter updated successfully!');
      setTimeout(() => {
        router.push('/admin/research/books');
      }, 1500);

    } catch (err: any) {
      console.error('Error updating book/chapter:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading book/chapter data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Edit Book / Chapter</h1>
        <Link href="/admin/research/books">
          <Button variant="outline">&larr; Back to Books</Button>
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
            <CardTitle>Core Details</CardTitle>
            <CardDescription>Select the type and edit the primary information. Fields marked with <span className="text-red-500">*</span> are required.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="type">Type <span className="text-red-500">*</span></Label>
              <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {bookTypes.map((bookType) => (
                    <SelectItem key={bookType} value={bookType}>{bookType}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">{formData.type === 'Book Chapter' ? 'Chapter Title' : 'Book Title'} <span className="text-red-500">*</span></Label>
              <Input id="title" value={formData.title} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="authors_editors">{formData.type === 'Book Chapter' ? 'Chapter Authors' : 'Book Authors / Editors'} <span className="text-red-500">*</span></Label>
              <Input id="authors_editors" value={formData.authors_editors} onChange={handleInputChange} required className="mt-1" placeholder="Comma-separated" />
            </div>
            <div>
              <Label htmlFor="year">Year <span className="text-red-500">*</span></Label>
              <Input id="year" type="number" value={formData.year === null ? '' : formData.year} onChange={handleYearChange} required className="mt-1" />
            </div>
          </CardContent>
        </Card>

        {formData.type === 'Book Chapter' && (
          <Card>
            <CardHeader>
              <CardTitle>Chapter Details</CardTitle>
              <CardDescription>Edit details about the book this chapter belongs to.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="parent_book_title">Parent Book Title</Label>
                <Input id="parent_book_title" value={formData.parent_book_title || ''} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="parent_book_authors_editors">Parent Book Authors / Editors</Label>
                <Input id="parent_book_authors_editors" value={formData.parent_book_authors_editors || ''} onChange={handleInputChange} className="mt-1" placeholder="Comma-separated" />
              </div>
              <div>
                <Label htmlFor="pages">Pages (e.g., 123-145)</Label>
                <Input id="pages" value={formData.pages || ''} onChange={handleInputChange} className="mt-1" />
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Publication Information</CardTitle>
            <CardDescription>Update publication details. All fields are optional except status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="publisher">Publisher</Label>
              <Input id="publisher" value={formData.publisher || ''} onChange={handleInputChange} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input id="isbn" value={formData.isbn || ''} onChange={handleInputChange} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="publication_status">Publication Status <span className="text-red-500">*</span></Label>
              <Select value={formData.publication_status} onValueChange={(value) => handleSelectChange('publication_status', value)} required>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supplementary Content</CardTitle>
            <CardDescription>Edit the abstract or keywords for better discovery.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            {isLoading ? 'Saving...' : 'Update Entry'}
          </Button>
        </div>
      </form>
    </div>
  );
}
