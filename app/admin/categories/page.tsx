'use client';

import { useState, useEffect } from 'react';
import { useContent, Category, ContentType } from '@/hooks/useContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertCircle, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Plus,
  FileText, 
  BookOpen, 
  GraduationCap, 
  Users 
} from 'lucide-react';
import { slugify } from '@/lib/utils';

export default function CategoriesPage() {
  const { 
    getCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory, 
    loading, 
    error: contentError 
  } = useContent();

  const [activeTab, setActiveTab] = useState<ContentType>('blog');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories(activeTab);
      setCategories(data);
    };

    fetchCategories();
  }, [getCategories, activeTab]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
    if (!isEditing || !currentCategory?.slug) {
      setCategorySlug(slugify(e.target.value));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorySlug(e.target.value);
  };

  const resetForm = () => {
    setCategoryName('');
    setCategorySlug('');
    setCurrentCategory(null);
    setIsEditing(false);
    setError(null);
  };

  const handleOpenDialog = (category?: Category) => {
    resetForm();
    
    if (category) {
      setCurrentCategory(category);
      setCategoryName(category.name);
      setCategorySlug(category.slug);
      setIsEditing(true);
    }
    
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryName) {
      setError('Category name is required');
      return;
    }

    if (!categorySlug) {
      setError('Category slug is required');
      return;
    }

    try {
      if (isEditing && currentCategory) {
        // Update existing category
        const updated = await updateCategory(currentCategory.id, {
          name: categoryName,
          slug: categorySlug,
        });

        if (updated) {
          setCategories(categories.map(cat => 
            cat.id === currentCategory.id ? updated : cat
          ));
        }
      } else {
        // Create new category
        const newCategory = await createCategory({
          name: categoryName,
          slug: categorySlug,
          content_type: activeTab,
        });

        if (newCategory) {
          setCategories([...categories, newCategory]);
        }
      }
      
      handleCloseDialog();
    } catch (err) {
      console.error('Error saving category:', err);
      setError('Failed to save category. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category? This will affect all content using this category.')) {
      const success = await deleteCategory(id);
      if (success) {
        setCategories(categories.filter(cat => cat.id !== id));
      }
    }
  };

  const contentTypeIcons = {
    blog: <FileText className="h-4 w-4" />,
    research: <BookOpen className="h-4 w-4" />,
    teaching: <GraduationCap className="h-4 w-4" />,
    leadership: <Users className="h-4 w-4" />,
  };

  const contentTypeLabels = {
    blog: 'Blog',
    research: 'Research',
    teaching: 'Teaching',
    leadership: 'Leadership',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage categories for your content
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Category
        </Button>
      </div>

      <Tabs
        defaultValue="blog"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ContentType)}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blog
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Research
          </TabsTrigger>
          <TabsTrigger value="teaching" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Teaching
          </TabsTrigger>
          <TabsTrigger value="leadership" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Leadership
          </TabsTrigger>
        </TabsList>

        {['blog', 'research', 'teaching', 'leadership'].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
              </div>
            ) : categories.length > 0 ? (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Content Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.slug}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          {contentTypeIcons[category.content_type]}
                          {contentTypeLabels[category.content_type]}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => handleOpenDialog(category)}
                                className="cursor-pointer"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDelete(category.id)}
                                className="cursor-pointer text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                  {contentTypeIcons[type as ContentType]}
                </div>
                <h3 className="text-lg font-medium">No categories found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get started by creating your first category
                </p>
                <Button onClick={() => handleOpenDialog()}>
                  Create New Category
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Category' : 'Create New Category'}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update the details for this category.' 
                : `Add a new category for ${contentTypeLabels[activeTab]} content.`}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(error || contentError) && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error || contentError?.message}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input 
                id="name" 
                value={categoryName} 
                onChange={handleNameChange} 
                placeholder="Enter category name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input 
                id="slug" 
                value={categorySlug} 
                onChange={handleSlugChange} 
                placeholder="category-slug"
              />
              <p className="text-xs text-muted-foreground">
                Used in URLs, auto-generated from name
              </p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {isEditing ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
