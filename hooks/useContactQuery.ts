import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContact, ContactMessageInput, ContactMessage } from './useContact';

export const useContactQueries = () => {
  const queryClient = useQueryClient();
  const { 
    submitContactMessage, 
    getContactMessages, 
    updateMessageReadStatus, 
    deleteContactMessage 
  } = useContact();

  /**
   * Query hook for fetching contact messages
   */
  const useContactMessages = (options?: {
    read?: boolean;
    limit?: number;
    page?: number;
    sortBy?: 'created_at' | 'updated_at';
    sortOrder?: 'asc' | 'desc';
    search?: string;
    enabled?: boolean;
  }) => {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const offset = (page - 1) * limit;
    
    return useQuery({
      queryKey: ['contactMessages', { 
        read: options?.read, 
        limit, 
        offset, 
        sortBy: options?.sortBy, 
        sortOrder: options?.sortOrder,
        search: options?.search
      }],
      queryFn: () => getContactMessages({
        read: options?.read,
        limit,
        offset,
        sortBy: options?.sortBy,
        sortOrder: options?.sortOrder,
        search: options?.search
      }),
      enabled: options?.enabled !== false
    });
  };

  /**
   * Mutation hook for submitting a new contact message
   */
  const useSubmitContactMessage = () => {
    return useMutation({
      mutationFn: (contactData: ContactMessageInput) => submitContactMessage(contactData),
      onSuccess: () => {
        // Invalidate contact messages queries to refresh the data
        queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
      }
    });
  };

  /**
   * Mutation hook for updating a message's read status
   */
  const useUpdateMessageReadStatus = () => {
    return useMutation({
      mutationFn: ({ id, read }: { id: number; read: boolean }) => updateMessageReadStatus(id, read),
      onSuccess: () => {
        // Invalidate contact messages queries to refresh the data
        queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
      }
    });
  };

  /**
   * Mutation hook for deleting a contact message
   */
  const useDeleteContactMessage = () => {
    return useMutation({
      mutationFn: (id: number) => deleteContactMessage(id),
      onSuccess: () => {
        // Invalidate contact messages queries to refresh the data
        queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
      }
    });
  };

  return {
    useContactMessages,
    useSubmitContactMessage,
    useUpdateMessageReadStatus,
    useDeleteContactMessage
  };
};
