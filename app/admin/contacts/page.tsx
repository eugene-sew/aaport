'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContactQueries } from '@/hooks/useContactQuery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { 
  MoreHorizontal, 
  Eye, 
  Trash2, 
  Search,
  Mail,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

export default function ContactsPage() {
  // State for pagination, filters, and search
  const [currentPage, setCurrentPage] = useState(1);
  const [readFilter, setReadFilter] = useState<boolean | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const itemsPerPage = 10;
  const router = useRouter();
  
  // Get contact message queries
  const { 
    useContactMessages, 
    useUpdateMessageReadStatus, 
    useDeleteContactMessage 
  } = useContactQueries();
  
  // Set up mutations
  const { mutate: updateReadStatus } = useUpdateMessageReadStatus();
  const { mutate: deleteMessage } = useDeleteContactMessage();
  
  // Set up mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Fetch messages with the current filters and search
  const { 
    data: messagesData, 
    isLoading, 
    refetch 
  } = useContactMessages({
    read: readFilter,
    limit: itemsPerPage,
    page: currentPage,
    sortBy: 'created_at',
    sortOrder: 'desc',
    search: searchTerm,
  });
  
  // Fetch all unread messages count
  const { data: unreadData } = useContactMessages({
    read: false,
    limit: 1, // We only need the count, not the actual messages
    enabled: isMounted, // Only fetch when component is mounted
  });
  
  // Update unread count when data changes
  useEffect(() => {
    if (unreadData?.count !== undefined) {
      setUnreadCount(unreadData.count);
    }
  }, [unreadData?.count]);
  
  // Handle pagination change
  const handlePageChange = (page: number) => {
    if (page < 1) return;
    if (messagesData && page > Math.ceil(messagesData.count / itemsPerPage)) return;
    setCurrentPage(page);
  };
  
  // Handle filter change
  const handleFilterChange = (filter: 'all' | 'read' | 'unread') => {
    const newFilter = filter === 'all' ? undefined : filter === 'read';
    setReadFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    refetch();
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    refetch();
  };
  
  // Handle marking a message as read/unread
  const handleToggleReadStatus = (id: number, currentStatus: boolean) => {
    updateReadStatus({ id, read: !currentStatus }, {
      onSuccess: () => {
        toast({
          title: `Message marked as ${!currentStatus ? 'read' : 'unread'}`,
          description: 'Message status updated successfully.',
        });
        
        // Update unread count after status change
        if (currentStatus) {
          // If marking as unread, increment count
          setUnreadCount(prev => prev + 1);
        } else {
          // If marking as read, decrement count
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to update message status.',
          variant: 'destructive',
        });
      }
    });
  };
  
  // Handle deleting a message
  const handleDeleteMessage = (id: number) => {
    if (confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      deleteMessage(id, {
        onSuccess: () => {
          toast({
            title: 'Message deleted',
            description: 'The message has been deleted successfully.',
          });
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Failed to delete message.',
            variant: 'destructive',
          });
        }
      });
    }
  };
  
  // Handle viewing a message in detail
  const handleViewMessage = (id: number) => {
    router.push(`/admin/contacts/${id}`);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
            <p className="text-muted-foreground">
              Manage and respond to contact form submissions.
            </p>
          </div>
          {unreadCount > 0 && (
            <div className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center">
              <span className="font-semibold mr-2">{unreadCount}</span>
              <span>Unread {unreadCount === 1 ? 'Message' : 'Messages'}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={readFilter === undefined ? "default" : "outline"}
            onClick={() => handleFilterChange('all')}
          >
            All
          </Button>
          <Button
            variant={readFilter === false ? "default" : "outline"}
            onClick={() => handleFilterChange('unread')}
          >
            Unread
          </Button>
          <Button
            variant={readFilter === true ? "default" : "outline"}
            onClick={() => handleFilterChange('read')}
          >
            Read
          </Button>
        </div>
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            {searchTerm && (
              <button 
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Loading messages...
                </TableCell>
              </TableRow>
            ) : messagesData?.messages && messagesData.messages.length > 0 ? (
              messagesData.messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    {message.read ? (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="ml-2 text-xs text-muted-foreground">Read</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Badge className="h-2 w-2 rounded-full p-0 bg-red-600" />
                        <span className="ml-2 text-xs font-medium text-red-600">Unread</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>
                    {message.subject || <span className="text-muted-foreground italic">No subject</span>}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(message.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewMessage(message.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleReadStatus(message.id, message.read)}>
                          {message.read ? (
                            <>
                              <XCircle className="mr-2 h-4 w-4" />
                              Mark as unread
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as read
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteMessage(message.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No messages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {messagesData && messagesData.count > 0 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, Math.ceil(messagesData.count / itemsPerPage)) }).map((_, i) => {
                const pageNumber = i + 1;
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage >= Math.ceil(messagesData.count / itemsPerPage)
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
