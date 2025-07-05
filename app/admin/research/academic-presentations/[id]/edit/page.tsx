"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Loader2, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContentQueries } from "@/hooks/useContentQuery";
import { toast } from "@/components/ui/use-toast";

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

interface PresentationFormData {
  title: string;
  presenters: string;
  year: number | null;
  presentation_type: string;
  venue: string | null;
  location: string | null;
  date: string | null;
  link_to_full_content: string | null; // Changed from link_url to match database schema
  publication_status: string;
  abstract: string | null;
  featured_image: string | null;
  is_recent: boolean;
  is_featured: boolean;
}

export default function EditPresentationPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const presentationId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { useUploadAsset } = useContentQueries();
  const uploadAssetMutation = useUploadAsset();

  const [formData, setFormData] = useState<PresentationFormData>({
    title: "",
    presenters: "",
    year: null,
    presentation_type: "",
    venue: "",
    location: "",
    date: "",
    link_to_full_content: "", // Changed from link_url to match database schema
    publication_status: "",
    abstract: "",
    featured_image: null,
    is_recent: false,
    is_featured: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresentation = async () => {
      if (!presentationId || !supabase) {
        setError("Invalid presentation ID or Supabase client not available.");
        setIsFetching(false);
        return;
      }
      setIsFetching(true);
      try {
        const { data, error: fetchError } = await supabase
          .from("research_presentations")
          .select("*")
          .eq("id", presentationId)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error("Presentation not found.");

        setFormData({
          title: data.title || "",
          presenters: data.presenters || "",
          year: data.year === null ? null : Number(data.year),
          presentation_type: data.presentation_type || "",
          venue: data.venue || "",
          location: data.location || "",
          date: data.date || "",
          link_to_full_content: data.link_to_full_content || "", // Changed from link_url to match database schema
          publication_status: data.publication_status || "",
          abstract: data.abstract || "",
          featured_image: data.featured_image || null,
          is_recent: data.is_recent || false,
          is_featured: data.is_featured || false,
        });

        if (data.featured_image) {
          setPreviewUrl(data.featured_image);
        }
      } catch (err: any) {
        console.error("Error fetching presentation:", err);
        setError(err.message || "Failed to fetch presentation data.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchPresentation();
  }, [presentationId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      year: value === "" ? null : parseInt(value),
    }));
  };

  const handleSelectChange = (
    id: keyof PresentationFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
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
    if (!formData.publication_status || !formData.presentation_type) {
      setError("Presentation status and type are required.");
      return;
    }

    setIsLoading(true);

    let imageUrl = formData.featured_image;
    if (selectedFile) {
      try {
        const uploadedUrl = await uploadAssetMutation.mutateAsync(selectedFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        setError("Failed to upload new image. Please try again.");
        setIsLoading(false);
        return;
      }
    }

    const presentationUpdateData = {
      ...formData,
      year: formData.year === null ? null : Number(formData.year),
      featured_image: imageUrl,
    };

    try {
      const { error: updateError } = await supabase
        .from("research_presentations")
        .update(presentationUpdateData)
        .match({ id: presentationId });

      if (updateError) throw updateError;

      setSuccess("Presentation updated successfully!");
      toast({
        title: "Success",
        description: "Presentation updated successfully.",
      });
      setTimeout(() => {
        router.push("/admin/research/academic-presentations");
      }, 1500);
    } catch (err: any) {
      console.error("Error updating presentation:", err);
      setError(err.message || "An unexpected error occurred.");
      toast({
        title: "Error",
        description: `Update failed: ${err.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading presentation data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Edit Academic Presentation</h1>
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
            <CardDescription>
              Edit the main details of your presentation. Fields marked with{" "}
              <span className="text-red-500">*</span> are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="presenters">
                Presenters (comma-separated){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="presenters"
                value={formData.presenters}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="year">
                Year <span className="text-red-500">*</span>
              </Label>
              <Input
                id="year"
                type="number"
                value={formData.year === null ? "" : formData.year}
                onChange={handleYearChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="presentation_type">
                Presentation Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.presentation_type}
                onValueChange={(value) =>
                  handleSelectChange("presentation_type", value)
                }
                required
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {presentationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Venue & Status</CardTitle>
            <CardDescription>
              Update details about where and when the presentation took/will
              take place.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="venue">Conference/Venue Name</Label>
              <Input
                id="venue"
                value={formData.venue || ""}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date || ""}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="publication_status">
                Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.publication_status}
                onValueChange={(value) => handleSelectChange("publication_status", value)}
                required
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {presentationStatuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content & Media</CardTitle>
            <CardDescription>
              Update abstract, links, and the cover image for your presentation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="abstract">Abstract</Label>
              <Textarea
                id="abstract"
                value={formData.abstract || ""}
                onChange={handleInputChange}
                className="mt-1"
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="link_to_full_content">
                Link URL (to slides, recording, etc.)
              </Label>
              <Input
                id="link_to_full_content"
                type="url"
                value={formData.link_to_full_content || ""}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured_image">Featured Image</Label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>{previewUrl ? "Change Image" : "Upload Image"}</span>
                </Button>
                <Input
                  ref={fileInputRef}
                  id="featured_image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="text-sm text-gray-500">
                  {selectedFile
                    ? selectedFile.name
                    : formData.featured_image
                    ? "Current image is set"
                    : "No file selected"}
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
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2 pt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_recent"
                  checked={formData.is_recent}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="is_recent">Mark as Recent Presentation</Label>
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
          <Button
            type="submit"
            disabled={isLoading || isFetching || uploadAssetMutation.isPending}
          >
            {isLoading || uploadAssetMutation.isPending
              ? "Saving..."
              : "Update Presentation"}
          </Button>
        </div>
      </form>
    </div>
  );
}
