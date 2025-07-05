import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with the service role key for admin access
// This bypasses RLS policies
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }
    
    // Insert the message using the admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          subject,
          message,
          read: false,
          // Let the database handle timestamps with defaults
        }
      ])
      .select();
    
    if (error) {
      console.error('Error submitting contact message:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to submit message. Please try again later.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. I will get back to you soon!',
      data
    });
    
  } catch (error) {
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
