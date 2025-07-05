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
import { useAuth } from '@/hooks/useAuth'; // To get user session
import { supabase } from '@/lib/supabase'; // Import Supabase client directly
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
  "In Review",
  "In Press",
  "Forthcoming",
  "Working Paper",
  "Submitted",
];

export default function AddArticlePage() {
  const router = useRouter();
  const { user } = useAuth(); // Get user from auth hook

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [journalName, setJournalName] = useState('');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [pages, setPages] = useState('');
  const [doi, setDoi] = useState('');
  const [linkToFullContent, setLinkToFullContent] = useState('');
  const [publicationStatus, setPublicationStatus] = useState('');
  const [abstractExcerpt, setAbstractExcerpt] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isRecent, setIsRecent] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setAuthors('');
    setYear('');
    setJournalName('');
    setVolume('');
    setIssue('');
    setPages('');
    setDoi('');
    setLinkToFullContent('');
    setPublicationStatus('');
    setAbstractExcerpt('');
    setKeywords('');
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
    if (!publicationStatus) {
        setError("Publication status is required.");
        return;
    }

    setIsLoading(true);

    const articleData = {
      title,
      authors,
      year: year === '' ? null : Number(year),
      journal_name: journalName || null,
      volume: volume || null,
      issue: issue || null,
      pages: pages || null,
      doi: doi || null,
      link_to_full_content: linkToFullContent || null,
      publication_status: publicationStatus,
      abstract_excerpt: abstractExcerpt || null,
      keywords: keywords || null,
      user_id: user.id,
      is_recent: isRecent,
      is_featured: isFeatured,
    };

    try {
      const { error: insertError } = await supabase
        .from('research_articles')
        .insert([articleData]);

      if (insertError) {
        throw insertError;
      }

      setSuccess('Article added successfully!');
      resetForm();
      // Optionally redirect after a short delay
      setTimeout(() => {
        router.push('/admin/research/articles');
      }, 1500);

    } catch (err: any) {
      console.error('Error inserting article:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Add New Article</h1>
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
            <CardDescription>Enter the main details of the article. All fields here are required.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="authors">Authors (comma-separated) <span className="text-red-500">*</span></Label>
              <Input id="authors" value={authors} onChange={(e) => setAuthors(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="year">Year <span className="text-red-500">*</span></Label>
              <Input id="year" type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value) || '')} required className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publication Details</CardTitle>
            <CardDescription>Provide the journal and publication specifics. All fields here are optional.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="journalName">Journal Name</Label>
              <Input id="journalName" value={journalName} onChange={(e) => setJournalName(e.target.value)} className="mt-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="volume">Volume</Label>
                <Input id="volume" value={volume} onChange={(e) => setVolume(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="issue">Issue</Label>
                <Input id="issue" value={issue} onChange={(e) => setIssue(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="pages">Pages (e.g., 123-145)</Label>
                <Input id="pages" value={pages} onChange={(e) => setPages(e.target.value)} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="doi">DOI</Label>
              <Input id="doi" value={doi} onChange={(e) => setDoi(e.target.value)} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content and Status</CardTitle>
            <CardDescription>Set the publication status and add supplementary content.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            {isLoading ? 'Saving...' : 'Save Article'}
          </Button>
        </div>
      </form>
    </div>
  );
}
