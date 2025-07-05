import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

/**
 * Hook to get contact message statistics
 */
export const useContactStats = () => {
  // Query to get the count of unread messages
  const useUnreadMessageCount = () => {
    return useQuery({
      queryKey: ['contactStats', 'unreadCount'],
      queryFn: async () => {
        const { count, error } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true })
          .eq('read', false);
        
        if (error) {
          console.error('Error fetching unread message count:', error);
          throw error;
        }
        
        return count || 0;
      },
      // Refresh every minute and whenever the window regains focus
      refetchInterval: 60 * 1000,
      refetchOnWindowFocus: true,
    });
  };

  return { useUnreadMessageCount };
};
