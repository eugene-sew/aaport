import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Hit daily by Vercel Cron (vercel.json) so the free-tier Supabase project
// never sees 7 days of inactivity and gets paused.
export const dynamic = 'force-dynamic';

export async function GET() {
  const { error, count } = await supabase
    .from('categories')
    .select('id', { count: 'exact', head: true });

  if (error) {
    console.error('Supabase keepalive failed:', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, count, at: new Date().toISOString() });
}
