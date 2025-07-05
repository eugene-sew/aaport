import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Insert test presentation with a hardcoded UUID for user_id
    // This is just for testing purposes
    const { data, error } = await supabase
      .from('research_presentations')
      .insert([
        {
          title: 'Counselor Education in the Digital Age',
          presenters: 'Asmau Ayub, John Smith',
          year: 2023,
          presentation_type: 'Conference',
          venue: 'American Counseling Association Annual Conference',
          location: 'Orlando, FL',
          date: '2023-04-15',
          link_url: 'https://example.com/presentation',
          publication_status: 'Published',
          abstract: 'This presentation explores the integration of technology in counselor education programs and its impact on student learning outcomes.',
          is_recent: true,
          is_featured: true,
          user_id: '00000000-0000-0000-0000-000000000000' // Placeholder UUID
        }
      ])
      .select();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
