// This is a temporary script to add a test presentation to the database
// Run with: node scripts/add-test-presentation.js

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function addTestPresentation() {
  console.log('Adding test presentation to database...');
  
  try {
    // First get a user ID
    const { data: users, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (userError) {
      throw userError;
    }
    
    if (!users || users.length === 0) {
      throw new Error('No users found in the database');
    }
    
    const userId = users[0].id;
    
    // Insert test presentation
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
          status: 'Published',
          abstract: 'This presentation explores the integration of technology in counselor education programs and its impact on student learning outcomes.',
          is_recent: true,
          is_featured: true,
          user_id: userId
        }
      ])
      .select();
    
    if (error) {
      throw error;
    }
    
    console.log('Test presentation added successfully:', data);
  } catch (error) {
    console.error('Error adding test presentation:', error);
  }
}

addTestPresentation();
