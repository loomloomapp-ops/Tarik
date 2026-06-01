import { z } from "zod";

// Phone: allow +, spaces, dashes, parentheses; require at least 9 digits.
const phoneRegex = /^[+]?[\d\s()\-/]{9,}$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(phoneRegex),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  // File is sent as lightweight metadata in this stub (real upload needs storage).
  fileName: z.string().trim().max(260).optional().or(z.literal("")),
  fileSize: z.number().nonnegative().max(25 * 1024 * 1024).optional(),
  consent: z.literal(true),
  // Honeypot — accepted by the schema; the route silently succeeds if filled.
  company: z.string().max(200).optional(),
});

export const popupLeadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(phoneRegex),
  consent: z.literal(true),
  company: z.string().max(200).optional(),
});

export const careerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(phoneRegex),
  specialization: z.string().trim().max(120).optional().or(z.literal("")),
  experience: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  documents: z.string().trim().max(120).optional().or(z.literal("")),
  note: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true),
  company: z.string().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type PopupLeadInput = z.infer<typeof popupLeadSchema>;
export type CareerInput = z.infer<typeof careerSchema>;
