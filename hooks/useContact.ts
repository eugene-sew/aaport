import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

// Define the ContactMessage type
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

// Define the input type for creating a new contact message
export type ContactMessageInput = Omit<ContactMessage, 'id' | 'read' | 'created_at' | 'updated_at'>;

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | Error | null>(null);

  /**
   * Submit a new contact message
   * This function is designed to work for both authenticated and anonymous users
   */
  const submitContactMessage = async (contactData: ContactMessageInput): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!contactData.name || !contactData.email || !contactData.message) {
        throw new Error('Name, email, and message are required fields');
      }

      // Insert the message with default values for read status and timestamps
      // Note: The RLS policy allows anonymous users to insert records
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          ...contactData,
          read: false,
          // Let the database handle timestamps with defaults
        }])
        .select();
      
      if (error) {
        setError(error);
        return { 
          success: false, 
          message: 'Failed to submit message. Please try again later.' 
        };
      }
      
      return { 
        success: true, 
        message: 'Thank you for your message. I\'ll get back to you soon!' 
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(err instanceof Error ? err : new Error(errorMessage));
      return { 
        success: false, 
        message: 'An unexpected error occurred. Please try again later.' 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get all contact messages with optional filters and search
   */
  const getContactMessages = async (options?: { 
    read?: boolean;
    limit?: number;
    offset?: number;
    sortBy?: 'created_at' | 'updated_at';
    sortOrder?: 'asc' | 'desc';
    search?: string;
  }): Promise<{ messages: ContactMessage[]; count: number }> => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('contact_messages')
        .select('*', { count: 'exact' });
      
      // Apply read status filter if provided
      if (options?.read !== undefined) {
        query = query.eq('read', options.read);
      }
      
      // Apply search filter if provided
      if (options?.search) {
        const searchTerm = `%${options.search}%`;
        query = query.or(
          `name.ilike.${searchTerm},email.ilike.${searchTerm},subject.ilike.${searchTerm},message.ilike.${searchTerm}`
        );
      }
      
      // Apply pagination if provided
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      if (options?.offset) {
        query = query.range(
          options.offset, 
          options.offset + (options.limit || 10) - 1
        );
      }
      
      // Apply sorting
      const sortBy = options?.sortBy || 'created_at';
      const sortOrder = options?.sortOrder || 'desc';
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });
      
      const { data, error, count } = await query;
      
      if (error) {
        setError(error);
        return { messages: [], count: 0 };
      }
      
      return { 
        messages: data as ContactMessage[] || [], 
        count: count || 0 
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(err instanceof Error ? err : new Error(errorMessage));
      return { messages: [], count: 0 };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Mark a contact message as read/unread
   */
  const updateMessageReadStatus = async (id: number, read: boolean): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          read, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id);
      
      if (error) {
        setError(error);
        return false;
      }
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(err instanceof Error ? err : new Error(errorMessage));
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a contact message
   */
  const deleteContactMessage = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
      
      if (error) {
        setError(error);
        return false;
      }
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(err instanceof Error ? err : new Error(errorMessage));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitContactMessage,
    getContactMessages,
    updateMessageReadStatus,
    deleteContactMessage
  };
};
