import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
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
