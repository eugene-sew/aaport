"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import { AlertCircle, CheckCircle2, Upload } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useContentQueries } from '@/hooks/useContentQuery';
import { toast } from '@/components/ui/use-toast';

const presentationTypes = [
  "Conference Presentation",
  "Workshop",
  "Invited Talk",
  "Panel Discussion",
  "Poster Presentation",
  "Symposium",
];

const presentationStatuses = [
  "Presented",
  "Accepted",
  "Submitted",
  "Invited",
  "Upcoming",
];

export default function AddPresentationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { useUploadAsset } = useContentQueries();
  const uploadAssetMutation = useUploadAsset();

  // Form state
  const [title, setTitle] = useState('');
  const [presenters, setPresenters] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [presentationType, setPresentationType] = useState('');
  const [venue, setVenue] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [status, setStatus] = useState('');
  const [abstract, setAbstract] = useState('');
  const [isRecent, setIsRecent] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  
  // Image upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  // Form state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setPresenters('');
    setYear('');
    setPresentationType('');
    setVenue('');
    setLocation('');
    setDate('');
    setLinkUrl('');
    setStatus('');
    setAbstract('');
    setIsRecent(false);
    setIsFeatured(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setFeaturedImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return null;
    
    try {
      const result = await uploadAssetMutation.mutateAsync(selectedFile);
      if (result) {
        setFeaturedImage(result);
        return result;
      }
      return null;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user || !supabase) {
      setError("User not authenticated or Supabase client not available.");
      return;
    }
    if (!status) {
      setError("Presentation status is required.");
      return;
    }
    if (!presentationType) {
      setError("Presentation type is required.");
      return;
    }

    setIsLoading(true);

    // Upload image if selected
    let imageUrl = featuredImage;
    if (selectedFile) {
      imageUrl = await handleFileUpload();
    }

    const presentationData = {
      title,
      presenters,
      year: year === '' ? null : Number(year),
      presentation_type: presentationType,
      venue: venue || null,
      location: location || null,
      date: date || null,
      link_to_full_content: linkUrl || null, // Changed from link_url to match database schema
      publication_status: status,
      abstract: abstract || null,
      featured_image: imageUrl,
      is_recent: isRecent,
      is_featured: isFeatured,
      user_id: user.id,
    };

    try {
      const { error: insertError } = await supabase
        .from('research_presentations')
        .insert([presentationData]);

      if (insertError) {
        throw insertError;
      }

      setSuccess('Presentation added successfully!');
      resetForm();
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin/research/academic-presentations');
      }, 1500);

    } catch (err: any) {
      console.error('Error inserting presentation:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Add New Academic Presentation</h1>
        <Link href="/admin/research/academic-presentations">
          <Button variant="outline">&larr; Back to Presentations</Button>
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
            <CardTitle>Presentation Details</CardTitle>
            <CardDescription>Enter the main details of your presentation. Fields marked with <span className="text-red-500">*</span> are required.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="presenters">Presenters (comma-separated) <span className="text-red-500">*</span></Label>
              <Input id="presenters" value={presenters} onChange={(e) => setPresenters(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="year">Year <span className="text-red-500">*</span></Label>
              <Input id="year" type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value) || '')} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="presentationType">Presentation Type <span className="text-red-500">*</span></Label>
              <Select value={presentationType} onValueChange={setPresentationType} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {presentationTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Venue & Status</CardTitle>
            <CardDescription>Provide details about where and when the presentation took/will take place.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="venue">Conference/Venue Name</Label>
              <Input id="venue" value={venue} onChange={(e) => setVenue(e.target.value)} className="mt-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {presentationStatuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content & Media</CardTitle>
            <CardDescription>Add abstract, links, and upload a cover image for your presentation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="abstract">Abstract</Label>
              <Textarea id="abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)} className="mt-1" rows={5} />
            </div>
            <div>
              <Label htmlFor="linkUrl">Link URL (to slides, recording, etc.)</Label>
              <Input id="linkUrl" type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="mt-1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <div className="flex items-center space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                </Button>
                <Input 
                  ref={fileInputRef}
                  id="featuredImage" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
                <span className="text-sm text-gray-500">
                  {selectedFile ? selectedFile.name : 'No file selected'}
                </span>
              </div>
              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <div className="relative w-48 h-32 border rounded overflow-hidden">
                    <Image 
                      src={previewUrl} 
                      alt="Preview" 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2 pt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isRecent"
                  checked={isRecent}
                  onChange={(e) => setIsRecent(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="isRecent">Mark as Recent Presentation</Label>
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
          <Button type="submit" disabled={isLoading || uploadAssetMutation.isPending}>
            {isLoading || uploadAssetMutation.isPending ? 'Saving...' : 'Save Presentation'}
          </Button>
        </div>
      </form>
    </div>
  );
}
