import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Supervision, SpeakingEngagement } from '@/types/professional-leadership';
import { useToast } from '@/components/ui/use-toast';

export function useProfessionalLeadershipTables() {
  const supabase = createClientComponentClient();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch supervisions
  const useSupervisions = () => {
    return useQuery({
      queryKey: ['supervisions'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('supervisions')
          .select('*')
          .order('start_date', { ascending: false });
          
        if (error) {
          throw new Error(`Error fetching supervisions: ${error.message}`);
        }
        
        return data as Supervision[];
      }
    });
  };

  // Fetch a single supervision by ID
  const useSupervision = (id: string) => {
    return useQuery({
      queryKey: ['supervisions', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('supervisions')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw new Error(`Error fetching supervision: ${error.message}`);
        }
        
        return data as Supervision;
      },
      enabled: !!id
    });
  };

  // Add a new supervision
  const useAddSupervision = () => {
    return useMutation({
      mutationFn: async (supervision: Omit<Supervision, 'id' | 'created_at' | 'updated_at'>) => {
        const { data, error } = await supabase
          .from('supervisions')
          .insert([supervision])
          .select()
          .single();
          
        if (error) {
          throw new Error(`Error adding supervision: ${error.message}`);
        }
        
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['supervisions'] });
        toast({
          title: 'Success',
          description: 'Supervision record added successfully',
        });
      },
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    });
  };

  // Update an existing supervision
  const useUpdateSupervision = () => {
    return useMutation({
      mutationFn: async ({ id, ...supervision }: Partial<Supervision> & { id: string }) => {
        const { data, error } = await supabase
          .from('supervisions')
          .update(supervision)
          .eq('id', id)
          .select()
          .single();
          
        if (error) {
          throw new Error(`Error updating supervision: ${error.message}`);
        }
        
        return data;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['supervisions'] });
        queryClient.invalidateQueries({ queryKey: ['supervisions', variables.id] });
        toast({
          title: 'Success',
          description: 'Supervision record updated successfully',
        });
      },
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    });
  };

  // Delete a supervision
  const useDeleteSupervision = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('supervisions')
          .delete()
          .eq('id', id);
          
        if (error) {
          throw new Error(`Error deleting supervision: ${error.message}`);
        }
        
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['supervisions'] });
        toast({
          title: 'Success',
          description: 'Supervision record deleted successfully',
        });
      },
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    });
  };

  // Fetch speaking engagements
  const useSpeakingEngagements = () => {
    return useQuery({
      queryKey: ['speaking_engagements'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('speaking_engagements')
          .select('*')
          .order('date', { ascending: false });
          
        if (error) {
          throw new Error(`Error fetching speaking engagements: ${error.message}`);
        }
        
        return data as SpeakingEngagement[];
      }
    });
  };

  // Fetch a single speaking engagement by ID
  const useSpeakingEngagement = (id: string) => {
    return useQuery({
      queryKey: ['speaking_engagements', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('speaking_engagements')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw new Error(`Error fetching speaking engagement: ${error.message}`);
        }
        
        return data as SpeakingEngagement;
      },
      enabled: !!id
    });
  };

  // Add a new speaking engagement
  const useAddSpeakingEngagement = () => {
    return useMutation({
      mutationFn: async (engagement: Omit<SpeakingEngagement, 'id' | 'created_at' | 'updated_at'>) => {
        const { data, error } = await supabase
          .from('speaking_engagements')
          .insert([engagement])
          .select()
          .single();
          
        if (error) {
          throw new Error(`Error adding speaking engagement: ${error.message}`);
        }
        
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['speaking_engagements'] });
        toast({
          title: 'Success',
          description: 'Speaking engagement added successfully',
        });
      },
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    });
  };

  // Update an existing speaking engagement
  const useUpdateSpeakingEngagement = () => {
    return useMutation({
      mutationFn: async ({ id, ...engagement }: Partial<SpeakingEngagement> & { id: string }) => {
        const { data, error } = await supabase
          .from('speaking_engagements')
          .update(engagement)
          .eq('id', id)
          .select()
          .single();
          
        if (error) {
          throw new Error(`Error updating speaking engagement: ${error.message}`);
        }
        
        return data;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['speaking_engagements'] });
        queryClient.invalidateQueries({ queryKey: ['speaking_engagements', variables.id] });
        toast({
          title: 'Success',
          description: 'Speaking engagement updated successfully',
        });
      },
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    });
  };

  // Delete a speaking engagement
  const useDeleteSpeakingEngagement = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('speaking_engagements')
          .delete()
          .eq('id', id);
          
        if (error) {
          throw new Error(`Error deleting speaking engagement: ${error.message}`);
        }
        
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['speaking_engagements'] });
        toast({
          title: 'Success',
          description: 'Speaking engagement deleted successfully',
        });
      },
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    });
  };

  // Fetch featured supervisions
  const useFeaturedSupervisions = () => {
    return useQuery({
      queryKey: ['supervisions', 'featured'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('supervisions')
          .select('*')
          .eq('is_featured', true)
          .order('start_date', { ascending: false });
          
        if (error) {
          throw new Error(`Error fetching featured supervisions: ${error.message}`);
        }
        
        return data as Supervision[];
      }
    });
  };

  // Fetch featured speaking engagements
  const useFeaturedSpeakingEngagements = () => {
    return useQuery({
      queryKey: ['speaking_engagements', 'featured'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('speaking_engagements')
          .select('*')
          .eq('is_featured', true)
          .order('date', { ascending: false });
          
        if (error) {
          throw new Error(`Error fetching featured speaking engagements: ${error.message}`);
        }
        
        return data as SpeakingEngagement[];
      }
    });
  };

  return {
    useSupervisions,
    useSupervision,
    useAddSupervision,
    useUpdateSupervision,
    useDeleteSupervision,
    useSpeakingEngagements,
    useSpeakingEngagement,
    useAddSpeakingEngagement,
    useUpdateSpeakingEngagement,
    useDeleteSpeakingEngagement,
    useFeaturedSupervisions,
    useFeaturedSpeakingEngagements
  };
}
