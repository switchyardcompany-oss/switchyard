import { validateLead, type LeadFieldErrors } from "./lead-validation";

export async function submitLead(payload: Record<string, unknown>) {
  const clientValidation = validateLead(payload);
  if (!clientValidation.valid) {
    return { ok: false, fields: clientValidation.fields, error: "Please correct the highlighted fields." };
  }

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clientValidation.cleaned),
  });
  const data = await response.json().catch(() => ({}));
  return {
    ok: response.ok && data.success === true,
    fields: (data.fields || {}) as LeadFieldErrors,
    error: data.error || "We could not send your inquiry right now.",
  };
}
