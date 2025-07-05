"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { AlertCircle, CheckCircle2 } from 'lucide-react';
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

export default function AddBookPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [authorsEditors, setAuthorsEditors] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [type, setType] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isbn, setIsbn] = useState('');
  const [linkToFullContent, setLinkToFullContent] = useState('');
  const [publicationStatus, setPublicationStatus] = useState('');
  const [abstractExcerpt, setAbstractExcerpt] = useState('');
  const [keywords, setKeywords] = useState('');
  // Fields for Book Chapter
  const [parentBookTitle, setParentBookTitle] = useState('');
  const [parentBookAuthorsEditors, setParentBookAuthorsEditors] = useState('');
  const [pages, setPages] = useState('');
  const [isRecent, setIsRecent] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setAuthorsEditors('');
    setYear('');
    setType('');
    setPublisher('');
    setIsbn('');
    setLinkToFullContent('');
    setPublicationStatus('');
    setAbstractExcerpt('');
    setKeywords('');
    setParentBookTitle('');
    setParentBookAuthorsEditors('');
    setPages('');
    setIsRecent(false);
    setIsFeatured(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user || !supabase) {
      setError("User not authenticated or Supabase client not available.");
      return;
    }
    if (!type) {
        setError("Book type is required.");
        return;
    }
    if (!publicationStatus) {
        setError("Publication status is required.");
        return;
    }
    if (type === 'Book Chapter' && (!parentBookTitle || !parentBookAuthorsEditors)) {
        setError("Parent book title and authors/editors are required for book chapters.");
        return;
    }

    setIsLoading(true);

    const bookData: any = {
      title,
      authors_editors: authorsEditors,
      year: year === '' ? null : Number(year),
      type,
      publisher: publisher || null,
      isbn: isbn || null,
      link_to_full_content: linkToFullContent || null,
      publication_status: publicationStatus,
      abstract_excerpt: abstractExcerpt || null,
      keywords: keywords || null,
      user_id: user.id,
      is_recent: isRecent,
      is_featured: isFeatured,
    };

    if (type === 'Book Chapter') {
      bookData.parent_book_title = parentBookTitle || null;
      bookData.parent_book_authors_editors = parentBookAuthorsEditors || null;
      bookData.pages = pages || null;
    }

    try {
      const { error: insertError } = await supabase
        .from('research_books')
        .insert([bookData]);

      if (insertError) {
        throw insertError;
      }

      setSuccess('Book/Chapter added successfully!');
      resetForm();
      setTimeout(() => {
        router.push('/admin/research/books');
      }, 1500);

    } catch (err: any) {
      console.error('Error inserting book/chapter:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Add New Book / Chapter</h1>
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
            <CardDescription>Select the type and enter the primary information. Fields marked with <span className="text-red-500">*</span> are required.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="type">Type <span className="text-red-500">*</span></Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Book">Book</SelectItem>
                  <SelectItem value="Book Chapter">Book Chapter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">{type === 'Book Chapter' ? 'Chapter Title' : 'Book Title'} <span className="text-red-500">*</span></Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="authors_editors">{type === 'Book Chapter' ? 'Chapter Authors' : 'Book Authors / Editors'} <span className="text-red-500">*</span></Label>
              <Input id="authors_editors" value={authorsEditors} onChange={(e) => setAuthorsEditors(e.target.value)} required className="mt-1" placeholder="Comma-separated" />
            </div>
            <div>
              <Label htmlFor="year">Year <span className="text-red-500">*</span></Label>
              <Input id="year" type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value) || '')} required className="mt-1" />
            </div>
          </CardContent>
        </Card>

        {type === 'Book Chapter' && (
          <Card>
            <CardHeader>
              <CardTitle>Chapter Details</CardTitle>
              <CardDescription>Provide details about the book this chapter belongs to.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="parent_book_title">Parent Book Title</Label>
                <Input id="parent_book_title" value={parentBookTitle} onChange={(e) => setParentBookTitle(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="parent_book_authors_editors">Parent Book Authors / Editors</Label>
                <Input id="parent_book_authors_editors" value={parentBookAuthorsEditors} onChange={(e) => setParentBookAuthorsEditors(e.target.value)} className="mt-1" placeholder="Comma-separated" />
              </div>
              <div>
                <Label htmlFor="pages">Pages (e.g., 123-145)</Label>
                <Input id="pages" value={pages} onChange={(e) => setPages(e.target.value)} className="mt-1" />
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Publication Information</CardTitle>
            <CardDescription>Provide publication details. All fields are optional except status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="publisher">Publisher</Label>
              <Input id="publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="publicationStatus">Publication Status <span className="text-red-500">*</span></Label>
              <Select value={publicationStatus} onValueChange={setPublicationStatus} required>
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
              <Label htmlFor="linkToFullContent">Link to Full Content (URL)</Label>
              <Input id="linkToFullContent" type="url" value={linkToFullContent} onChange={(e) => setLinkToFullContent(e.target.value)} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supplementary Content</CardTitle>
            <CardDescription>Add an abstract or keywords for better discovery.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="abstractExcerpt">Abstract / Excerpt</Label>
              <Textarea id="abstractExcerpt" value={abstractExcerpt} onChange={(e) => setAbstractExcerpt(e.target.value)} className="mt-1" rows={5} />
            </div>
            <div>
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="mt-1" />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isRecent"
                  checked={isRecent}
                  onChange={(e) => setIsRecent(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="isRecent">Mark as Recent Publication</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="isFeatured">Feature on Homepage</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Entry'}
          </Button>
        </div>
      </form>
    </div>
  );
}
