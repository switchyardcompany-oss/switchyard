import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Lead submission is unavailable: Supabase is not configured.');
      return NextResponse.json(
        { success: false, error: 'Lead submission is temporarily unavailable.' },
        { status: 503 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const body = await request.json();
    const { formSource, firstName, lastName, email, phone, message, ...rest } = body;

    if (!formSource) {
      return NextResponse.json({ success: false, error: 'Missing formSource' }, { status: 400 });
    }

    const { error } = await supabase.from('leads').insert({
      form_source: formSource,
      first_name: firstName || null,
      last_name: lastName || null,
      email: email || null,
      phone: phone || null,
      message: message || null,
      metadata: Object.keys(rest).length ? rest : null,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Lead submission error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
