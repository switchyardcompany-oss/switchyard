import { NextRequest, NextResponse } from "next/server";
import { validateLead } from "@/lib/lead-validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
    }
    if (Object.keys(body).length === 0) {
      return NextResponse.json({ success: false, error: "Request body cannot be empty." }, { status: 400 });
    }

    const validation = validateLead(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: "Please correct the highlighted fields.", fields: validation.fields },
        { status: 422 },
      );
    }

    let supabase;
    try {
      supabase = createSupabaseServerClient();
    } catch {
      console.error("Lead submission is unavailable: Supabase is not configured.");
      return NextResponse.json({ success: false, error: "Lead submission is temporarily unavailable." }, { status: 503 });
    }

    const cleaned = validation.cleaned;
    const fullName = cleaned.fullName || cleaned.name || [cleaned.firstName, cleaned.lastName].filter(Boolean).join(" ") || null;
    const { error } = await supabase.from("leads").insert({
      name: fullName,
      email: cleaned.email || null,
      phone: cleaned.phone || null,
      project_type: cleaned.projectType || null,
      company: cleaned.company || null,
      location: cleaned.location || cleaned.projectLocation || null,
      budget: cleaned.budget || null,
      timeline: cleaned.timeline || null,
      message: cleaned.message || cleaned.details || null,
      form_source: cleaned.formSource || null,
    });

    if (error) {
      console.error("Lead insert failed:", { code: error.code, message: error.message });
      return NextResponse.json({ success: false, error: "We could not save your inquiry right now. Please call 813-395-0000." }, { status: 503 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ success: false, error: "We could not process your inquiry right now. Please try again or call 813-395-0000." }, { status: 500 });
  }
}
