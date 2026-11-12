import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Service role: newsletter_subscribers has no public insert policy, so the
// only way in is through this route (which validates the email first).
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const clean = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!EMAIL_RE.test(clean) || clean.length > 254) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert({ email: clean });

    // 23505 = unique violation: already subscribed, treat as success.
    if (error && error.code !== '23505') {
      console.error('Newsletter signup failed:', error);
      return NextResponse.json(
        { success: false, message: 'Could not subscribe right now. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "You're subscribed!" });
  } catch (error) {
    console.error('Error in newsletter API route:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
