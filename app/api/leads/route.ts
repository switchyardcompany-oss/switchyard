import { NextRequest, NextResponse } from "next/server";
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

    // TODO: Connect this validated payload to the new database/backend setup.
    // The validation and form UI remain active while the replacement integration is configured.
    return NextResponse.json(
      { success: false, error: "Lead submission is temporarily unavailable. Please call 813-395-0000." },
      { status: 503 },
    );
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ success: false, error: "We could not process your inquiry right now. Please try again or call 813-395-0000." }, { status: 500 });
  }
}
