"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useResearchQueries } from "@/hooks/useResearchQuery";
import { ResearchStatus, ResearchType } from "@/store/researchStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import FroalaEditorWrapper from "@/components/editor/FroalaEditorWrapper";

// Form schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  abstract: z.string().min(1, "Abstract is required"),
  year: z.coerce
    .number()
    .int()
    .min(1900, "Year must be 1900 or later")
    .max(new Date().getFullYear() + 5, "Year cannot be too far in the future"),
  co_authors: z.string().optional(),
  status: z.enum(["published", "in_review", "ongoing"]),
  research_type: z.enum([
    "publication",
    "book_chapter",
    "article",
    "conference_presentation",
  ]),
  category_id: z.coerce.number().optional(),
  featured_image: z.string().optional(),
  meta_description: z.string().optional(),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddResearchPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [presentationImages, setPresentationImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { useResearchCategories, useCreateResearchWork, useUploadResearchImage } =
    useResearchQueries();

  // Fetch research categories
  const { data: categories = [], isLoading: isLoadingCategories } =
    useResearchCategories();

  // Create research mutation
  const { mutate: createResearchWork, isPending: isCreating } =
    useCreateResearchWork();

  // Upload image mutation
  const { mutate: uploadImage, isPending: isImageUploading } =
    useUploadResearchImage();

  // Form definition
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      abstract: "",
      year: new Date().getFullYear(),
      co_authors: "",
      status: "ongoing" as ResearchStatus,
      research_type: "publication" as ResearchType,
      category_id: undefined,
      featured_image: "",
      meta_description: "",
      tags: "",
    },
  });

  // Handle featured image upload
  const handleFeaturedImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    uploadImage(file, {
      onSuccess: (url) => {
        form.setValue("featured_image", url);
        setIsUploading(false);
        toast({
          title: "Image uploaded",
          description: "Featured image has been uploaded successfully",
        });
      },
      onError: () => {
        setIsUploading(false);
      },
    });
  };

  // Handle presentation image upload
  const handlePresentationImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    uploadImage(file, {
      onSuccess: (url) => {
        setPresentationImages((prev) => [...prev, url]);
        setIsUploading(false);
        toast({
          title: "Image uploaded",
          description: "Presentation image has been uploaded successfully",
        });
      },
      onError: () => {
        setIsUploading(false);
      },
    });
  };

  // Remove presentation image
  const removePresentationImage = (index: number) => {
    setPresentationImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Form submission
  const onSubmit = (values: FormValues) => {
    // Process tags and co-authors
    const tags = values.tags
      ? values.tags.split(",").map((tag) => tag.trim())
      : [];
    
    const co_authors = values.co_authors
      ? values.co_authors.split(",").map((author) => author.trim())
      : [];

    // Create research work
    createResearchWork(
      {
        title: values.title,
        slug: values.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        excerpt: values.excerpt,
        abstract: values.abstract,
        year: values.year,
        co_authors,
        status: values.status,
        research_type: values.research_type,
        category_id: values.category_id,
        featured_image: values.featured_image,
        presentation_images: presentationImages,
        meta_description: values.meta_description,
        tags,
      },
      {
        onSuccess: () => {
          router.push("/admin/research");
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          className="mr-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Research Work</h1>
          <p className="text-muted-foreground">
            Create a new research publication, article, or presentation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-card rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter research title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Excerpt *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief summary of the research"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A short summary that will appear in listings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Publication year"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="co_authors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Co-Authors</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Co-authors (comma separated)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Separate multiple authors with commas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="in_review">In Review</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="research_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="publication">Publication</SelectItem>
                            <SelectItem value="book_chapter">Book Chapter</SelectItem>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="conference_presentation">
                              Conference Presentation
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingCategories ? (
                            <SelectItem value="loading" disabled>
                              Loading categories...
                            </SelectItem>
                          ) : categories.length === 0 ? (
                            <SelectItem value="none" disabled>
                              No categories available
                            </SelectItem>
                          ) : (
                            categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                              >
                                {category.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-card rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Abstract</h2>
                <FormField
                  control={form.control}
                  name="abstract"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Abstract *</FormLabel>
                      <FormControl>
                        <FroalaEditorWrapper
                          model={field.value}
                          onModelChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-card rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Media</h2>
                
                {/* Featured Image */}
                <div className="mb-6">
                  <FormLabel>Featured Image</FormLabel>
                  <div className="mt-2">
                    {form.watch("featured_image") ? (
                      <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-border">
                        <Image
                          src={form.watch("featured_image") || ""}
                          alt="Featured image"
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => form.setValue("featured_image", "")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleFeaturedImageUpload}
                        disabled={isUploading}
                        className="w-full max-w-md h-32 border-dashed flex flex-col items-center justify-center"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="h-6 w-6 animate-spin mb-2" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-6 w-6 mb-2" />
                            <span>Upload Featured Image</span>
                          </>
                        )}
                      </Button>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Presentation Images (only shown for conference presentations) */}
                {form.watch("research_type") === "conference_presentation" && (
                  <div>
                    <FormLabel>Presentation Images</FormLabel>
                    <FormDescription className="mb-2">
                      Upload images from your conference presentation
                    </FormDescription>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {presentationImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-video overflow-hidden rounded-lg border border-border"
                        >
                          <Image
                            src={image || ""}
                            alt={`Presentation image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removePresentationImage(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = (e) => {
                            if (e.target instanceof HTMLInputElement && e.target.files) {
                              const file = e.target.files[0];
                              if (file) {
                                setIsUploading(true);
                                uploadImage(file, {
                                  onSuccess: (url) => {
                                    setPresentationImages((prev) => [...prev, url]);
                                    setIsUploading(false);
                                    toast({
                                      title: "Image uploaded",
                                      description: "Presentation image has been uploaded successfully",
                                    });
                                  },
                                  onError: () => {
                                    setIsUploading(false);
                                  },
                                });
                              }
                            }
                          };
                          input.click();
                        }}
                        disabled={isUploading}
                        className="h-full min-h-[120px] border-dashed flex flex-col items-center justify-center"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="h-6 w-6 animate-spin mb-2" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-6 w-6 mb-2" />
                            <span>Add Image</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-card rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">SEO & Metadata</h2>
                
                <FormField
                  control={form.control}
                  name="meta_description"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="SEO description for search engines"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Recommended length: 150-160 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter tags separated by commas"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Example: academic, psychology, counseling
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || isUploading || isImageUploading}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Research Work"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tips</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <strong>Title:</strong> Use a clear, descriptive title that accurately represents your research.
                </li>
                <li>
                  <strong>Excerpt:</strong> Write a concise summary (2-3 sentences) that highlights the key findings.
                </li>
                <li>
                  <strong>Abstract:</strong> Include your research question, methodology, findings, and implications.
                </li>
                <li>
                  <strong>Co-Authors:</strong> List all contributors in the order they should appear.
                </li>
                <li>
                  <strong>Status:</strong> Choose "Published" for completed works, "In Review" for works under review, and "Ongoing" for active research.
                </li>
                <li>
                  <strong>Type:</strong> Select the appropriate format of your research work.
                </li>
                <li>
                  <strong>Featured Image:</strong> Use a high-quality, relevant image that represents your research.
                </li>
                <li>
                  <strong>Tags:</strong> Add relevant keywords to improve searchability.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
