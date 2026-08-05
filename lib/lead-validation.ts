export type LeadFieldErrors = Record<string, string>;

export type LeadValidationResult = {
  valid: boolean;
  fields: LeadFieldErrors;
  cleaned: Record<string, unknown>;
};

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export function validateLead(input: Record<string, unknown>): LeadValidationResult {
  const fields: LeadFieldErrors = {};
  const cleaned = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]),
  );
  const fullName = text(input.fullName || input.name) || [text(input.firstName), text(input.lastName)].filter(Boolean).join(" ");
  const email = text(input.email);
  const phone = text(input.phone);
  const projectType = text(input.projectType);

  if (!text(input.formSource)) fields.formSource = "Form source is required.";
  if (!fullName) fields.fullName = "Full name is required.";
  if (!email) fields.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) fields.email = "Enter a valid email address.";
  if (!phone) fields.phone = "Phone number is required.";
  else if (phone.replace(/\D/g, "").length < 10 || phone.replace(/\D/g, "").length > 15) fields.phone = "Enter a valid phone number.";
  if (!projectType) fields.projectType = "Project type is required.";

  return { valid: Object.keys(fields).length === 0, fields, cleaned };
}
