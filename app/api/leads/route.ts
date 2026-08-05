import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { validateLead } from "@/lib/lead-validation";

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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      console.error("Lead submission is unavailable: Supabase is not configured.");
      return NextResponse.json({ success: false, error: "Lead submission is temporarily unavailable." }, { status: 503 });
    }

    const {
      formSource, firstName, lastName, fullName, name, email, phone, message, details,
      company, city, county, serviceNeeded, projectType, location, projectLocation,
      budget, timeline, industry, ...rest
    } = validation.cleaned;
    const resolvedFullName = fullName || name || [firstName, lastName].filter(Boolean).join(" ") || null;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from("leads").insert({
      form_source: formSource,
      full_name: resolvedFullName,
      first_name: firstName || null,
      last_name: lastName || null,
      email: email || null,
      phone: phone || null,
      company: company || null,
      city: city || null,
      county: county || null,
      service_needed: serviceNeeded || null,
      project_type: projectType || null,
      location: location || projectLocation || null,
      budget: budget || null,
      timeline: timeline || null,
      industry: industry || null,
      message: message || details || null,
      metadata: Object.keys(rest).length ? rest : {},
    });

    if (error) {
      console.error("Lead insert failed:", { code: error.code, message: error.message, details: error.details, hint: error.hint });
      return NextResponse.json({ success: false, error: "We could not save your inquiry right now. Please call 813-395-0000." }, { status: 503 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ success: false, error: "We could not process your inquiry right now. Please try again or call 813-395-0000." }, { status: 500 });
  }
}
