"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useContent, Category, Content } from "@/hooks/useContent";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Save, Eye, Upload } from "lucide-react";
import { slugify } from "@/lib/utils";

// Import our custom Froala Editor client component
import FroalaEditor from "@/components/FroalaEditor";

// This component doesn't use params directly to avoid Next.js warnings
export default function EditBlogPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const {
    getContentById,
    updateContent,
    getCategories,
    uploadAsset,
    loading,
    error: contentError,
  } = useContent();

  // Extract ID from pathname instead of using params directly
  const [postId, setPostId] = useState<string>("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [originalPost, setOriginalPost] = useState<Content | null>(null);

  // Froala editor options
  const editorConfig: any = {
    placeholderText: "Start writing your blog post...",
    charCounterCount: true,
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "fontFamily",
          "fontSize",
          "textColor",
          "backgroundColor",
          "clearFormatting",
        ],
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",
          "paragraphFormat",
          "lineHeight",
          "outdent",
          "indent",
          "quote",
        ],
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",
          "insertTable",
          "insertHR",
          "emoticons",
          "specialCharacters",
          "insertVideo",
          "embedly",
        ],
      },
      moreMisc: {
        buttons: ["undo", "redo", "fullscreen", "selectAll", "html", "help"],
        align: "right",
        buttonsVisible: 2,
      },
    },
    events: {
      "image.beforeUpload": function (images: any) {
        // Return false to stop default upload
        return false;
      },
      "image.inserted": function (image: any) {
        // Handle image insertion
      },
    },
  };

  // Handle image upload for Froala
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const imageUrl = await uploadAsset(file, "blog");
      return imageUrl || "";
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  // Merge additional Froala editor configuration
  // We're extending the base config with these additional options
  Object.assign(editorConfig, {
    placeholderText: "Start writing your blog post...",
    charCounterCount: true,
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "fontFamily",
          "fontSize",
          "textColor",
          "backgroundColor",
          "clearFormatting",
        ],
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",
          "paragraphFormat",
          "lineHeight",
          "outdent",
          "indent",
          "quote",
        ],
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",
          "insertTable",
          "emoticons",
          "specialCharacters",
          "insertHR",
        ],
      },
      moreMisc: {
        buttons: ["undo", "redo", "fullscreen", "html"],
        align: "right",
        buttonsVisible: 2,
      },
    },
    events: {
      "image.beforeUpload": function (images: File[]) {
        return false; // Stop default upload
      },
      "image.uploaded": function (response: any) {
        return response;
      },
      "image.inserted": function (img: HTMLImageElement) {
        // Do something after image is inserted
      },
      "image.error": function (error: any) {
        console.error("Froala image error:", error);
      },
    },
    imageUploadParam: "file",
    imageUploadURL: false,
    imageUploadMethod: "POST",
    imageUploadParams: {},
    imageUploadToS3: false,
    imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "webp"],
  });

  // Get the post ID from the URL when the component mounts
  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("/");
      const id = parts[parts.length - 1];
      setPostId(id);
    }
  }, [pathname]);

  // Fetch data once we have the post ID
  useEffect(() => {
    if (!postId) return;

    const fetchData = async () => {
      try {
        // Fetch post data
        const post = await getContentById(parseInt(postId));
        if (post) {
          setOriginalPost(post);
          setTitle(post.title);
          setSlug(post.slug);
          setContent(post.content);
          setExcerpt(post.excerpt || "");
          setMetaDescription(post.meta_description || "");
          setCategoryId(post.category_id);
          setStatus(post.status);
          setTags(post.tags || []);
          setFeaturedImageUrl(post.featured_image || "");
          console.log("Featured Image:", post.featured_image);
        } else {
          setError("Post not found");
        }

        // Fetch categories
        const categoryData = await getCategories("blog");
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load blog post data");
      }
    };

    fetchData();
  }, [postId]); // Removed getContentById and getCategories from dependencies

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const handleFeaturedImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImageUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim();

      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!title) {
      setError("Title is required");
      return;
    }

    if (!content) {
      setError("Content is required");
      return;
    }

    if (!categoryId) {
      setError("Please select a category");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      // Upload featured image if exists
      let imageUrl = featuredImageUrl;
      if (featuredImage) {
        const uploadedUrl = await uploadAsset(featuredImage, "blog/featured");
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      if (!originalPost) {
        throw new Error("Original post data not found");
      }

      // Update content
      const updatedContent = await updateContent(originalPost.id, {
        title,
        slug,
        content,
        excerpt: excerpt || title.substring(0, 150) + "...",
        featured_image: imageUrl,
        category_id: categoryId,
        status,
        meta_description: metaDescription || excerpt,
        tags,
      });

      if (updatedContent) {
        router.push("/admin/blog");
      }
    } catch (err) {
      console.error("Error updating blog post:", err);
      setError("Failed to update blog post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && !originalPost) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
          <p className="text-muted-foreground">
            Make changes to your blog post
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleSave("draft")}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
          <Button onClick={() => handleSave("published")} disabled={isSaving}>
            <Eye className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      {(error || contentError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || contentError?.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter post title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={handleSlugChange}
                  placeholder="post-url-slug"
                />
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-2">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="editor" className="border rounded-md p-4">
                    <FroalaEditor
                      content={content || ""}
                      onContentChange={handleContentChange}
                    />
                  </TabsContent>
                  <TabsContent
                    value="preview"
                    className="border rounded-md p-4"
                  >
                    <div
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of the post"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={categoryId?.toString() || ""}
                  onValueChange={(value) => setCategoryId(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured-image">Featured Image</Label>
                <div className="border rounded-md p-4 text-center">
                  {featuredImageUrl ? (
                    <div className="space-y-2">
                      <img
                        src={featuredImageUrl}
                        alt="Featured"
                        className="mx-auto max-h-48 object-contain"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFeaturedImage(null);
                          setFeaturedImageUrl("");
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <Input
                        id="featured-image"
                        type="file"
                        accept="image/*"
                        onChange={handleFeaturedImageChange}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() =>
                          document.getElementById("featured-image")?.click()
                        }
                      >
                        Select Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add tags (press Enter)"
                />
                <p className="text-xs text-muted-foreground">
                  Press Enter or comma to add a tag
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="SEO description (optional)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
