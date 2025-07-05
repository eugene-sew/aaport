"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';

export default function EditAwardPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchAward = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('awards')
      .select('title, category, year')
      .eq('id', id)
      .single();

    if (error || !data) {
      setError('Failed to fetch award data. It might have been deleted.');
      console.error('Error fetching award:', error);
    } else {
      setTitle(data.title);
      setCategory(data.category);
      setYear(data.year);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchAward();
  }, [fetchAward]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

        if (!title || !category) {
      setError('All fields are required.');
      return;
    }

    

    setFormLoading(true);

        const { error: updateError } = await supabase
      .from('awards')
      .update({ title, category, year: year || null })
      .eq('id', id);

    setFormLoading(false);

    if (updateError) {
      setError('Failed to update award. Please try again.');
      console.error('Error updating award:', updateError);
    } else {
      setSuccess('Award updated successfully! Redirecting...');
      setTimeout(() => {
        router.push('/admin/awards');
        router.refresh();
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/awards">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Awards
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Award</CardTitle>
          <CardDescription>
            Update the details for this award or recognition.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="default" className="bg-green-50 dark:bg-green-900/20">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="title">Award Title</Label>
              <Input
                id="title"
                placeholder="e.g., Best Research Paper"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={formLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setCategory} value={category} disabled={formLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Academic Award">Academic Award</SelectItem>
                  <SelectItem value="Leadership & Community Recognition">
                    Leadership & Community Recognition
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                placeholder="e.g., 2023"
                value={year}
                onChange={(e) => setYear(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                disabled={formLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={formLoading}>
              {formLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {formLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
