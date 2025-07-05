'use client';

import { useState, useEffect, useRef } from 'react';
import { useContent } from '@/hooks/useContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertCircle, 
  Upload, 
  Trash2, 
  MoreHorizontal, 
  Copy, 
  Image as ImageIcon,
  FileText,
  File,
  Video,
  Download
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type AssetType = 'images' | 'documents' | 'videos' | 'other';

interface Asset {
  name: string;
  url: string;
  type: AssetType;
  size?: number;
  created_at?: string;
}

export default function MediaPage() {
  const { uploadAsset, deleteAsset, loading, error: contentError } = useContent();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeFolder, setActiveFolder] = useState<string>('blog');
  const [activeType, setActiveType] = useState<AssetType>('images');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const folders = [
    { id: 'blog', name: 'Blog' },
    { id: 'research', name: 'Research' },
    { id: 'teaching', name: 'Teaching' },
    { id: 'leadership', name: 'Leadership' },
    { id: 'general', name: 'General' },
  ];

  const assetTypes = [
    { id: 'images', name: 'Images', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'documents', name: 'Documents', icon: <FileText className="h-4 w-4" /> },
    { id: 'videos', name: 'Videos', icon: <Video className="h-4 w-4" /> },
    { id: 'other', name: 'Other', icon: <File className="h-4 w-4" /> },
  ];

  const fetchAssets = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('assets')
        .list(`${activeFolder}/${activeType}`);

      if (error) {
        console.error('Error fetching assets:', error);
        setError(error.message);
        return;
      }

      if (!data) {
        setAssets([]);
        return;
      }

      // Get URLs and transform data
      const assetsWithUrls = await Promise.all(
        data.map(async (item) => {
          const { data: urlData } = supabase.storage
            .from('assets')
            .getPublicUrl(`${activeFolder}/${activeType}/${item.name}`);

          return {
            name: item.name,
            url: urlData.publicUrl,
            type: activeType,
            size: item.metadata?.size,
            created_at: item.created_at,
          };
        })
      );

      setAssets(assetsWithUrls);
    } catch (err) {
      console.error('Error processing assets:', err);
      setError('Failed to load assets');
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [activeFolder, activeType]);

  const getFileType = (file: File): AssetType => {
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    const documentTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/csv'
    ];
    const videoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    if (imageTypes.includes(file.type)) return 'images';
    if (documentTypes.includes(file.type)) return 'documents';
    if (videoTypes.includes(file.type)) return 'videos';
    return 'other';
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = getFileType(file);
        
        // Upload to the correct folder based on file type
        const filePath = `${activeFolder}/${fileType}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        
        const { error: uploadError } = await supabase.storage
          .from('assets')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });
        
        if (uploadError) {
          throw uploadError;
        }
        
        // Update progress
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }
      
      // Refresh the asset list
      await fetchAssets();
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error('Error uploading files:', err);
      setError(err.message || 'Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAsset = async (asset: Asset) => {
    if (window.confirm(`Are you sure you want to delete ${asset.name}?`)) {
      try {
        // Extract the path from the URL
        const urlParts = asset.url.split('/');
        const path = `${activeFolder}/${activeType}/${asset.name}`;
        
        const { error: deleteError } = await supabase.storage
          .from('assets')
          .remove([path]);
        
        if (deleteError) {
          throw deleteError;
        }
        
        // Remove from the UI
        setAssets(assets.filter(a => a.name !== asset.name));
      } catch (err: any) {
        console.error('Error deleting asset:', err);
        setError(err.message || 'Failed to delete asset');
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy URL:', err);
      });
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'Unknown size';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
  };

  const getAssetIcon = (asset: Asset) => {
    switch (asset.type) {
      case 'images':
        return <ImageIcon className="h-5 w-5" />;
      case 'documents':
        return <FileText className="h-5 w-5" />;
      case 'videos':
        return <Video className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const viewAssetDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">
            Manage your media assets
          </p>
        </div>
        <div>
          <Input
            type="file"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Files
          </Button>
        </div>
      </div>

      {isUploading && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <p className="text-sm text-center mt-1">Uploading: {uploadProgress}%</p>
        </div>
      )}

      {(error || contentError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || contentError?.message}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-64 space-y-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Folders</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="space-y-1">
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant={activeFolder === folder.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveFolder(folder.id)}
                  >
                    {folder.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-4">
          <Tabs
            value={activeType}
            onValueChange={(value) => setActiveType(value as AssetType)}
          >
            <TabsList className="mb-4">
              {assetTypes.map((type) => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className="flex items-center gap-2"
                >
                  {type.icon}
                  {type.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {assetTypes.map((type) => (
              <TabsContent key={type.id} value={type.id}>
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
                  </div>
                ) : assets.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {assets.map((asset) => (
                      <Card key={asset.name} className="overflow-hidden">
                        <div 
                          className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
                          onClick={() => viewAssetDetails(asset)}
                        >
                          {asset.type === 'images' ? (
                            <img 
                              src={asset.url} 
                              alt={asset.name} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="text-center p-4">
                              {getAssetIcon(asset)}
                              <p className="mt-2 text-sm truncate max-w-full">
                                {asset.name}
                              </p>
                            </div>
                          )}
                        </div>
                        <CardFooter className="p-2 flex justify-between items-center">
                          <div className="truncate max-w-[70%]" title={asset.name}>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(asset.size)}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => viewAssetDetails(asset)}
                                className="cursor-pointer"
                              >
                                <ImageIcon className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => copyToClipboard(asset.url)}
                                className="cursor-pointer"
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy URL
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => window.open(asset.url, '_blank')}
                                className="cursor-pointer"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteAsset(asset)}
                                className="cursor-pointer text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                      {type.icon}
                    </div>
                    <h3 className="text-lg font-medium">No {type.name.toLowerCase()} found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload {type.name.toLowerCase()} to see them here
                    </p>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      Upload {type.name}
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedAsset && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Asset Details</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center p-4">
                {selectedAsset.type === 'images' ? (
                  <img 
                    src={selectedAsset.url} 
                    alt={selectedAsset.name} 
                    className="max-h-[300px] max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    {getAssetIcon(selectedAsset)}
                    <p className="mt-4">{selectedAsset.name}</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">File Name</h3>
                  <p className="text-sm break-all">{selectedAsset.name}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">URL</h3>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={selectedAsset.url} 
                      readOnly 
                      className="text-sm"
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(selectedAsset.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium">Type</h3>
                  <p className="text-sm">{selectedAsset.type}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Size</h3>
                  <p className="text-sm">{formatFileSize(selectedAsset.size)}</p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="default"
                    onClick={() => window.open(selectedAsset.url, '_blank')}
                    className="mr-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      handleDeleteAsset(selectedAsset);
                      setIsDialogOpen(false);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
