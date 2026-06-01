import { NextResponse } from "next/server";
import { leadSchema, popupLeadSchema } from "@/lib/validation";
import { forwardToEmail } from "@/lib/integrations/email";
import { appendToSheet } from "@/lib/integrations/sheets";
import { clientKey, rateLimit } from "@/lib/integrations/rateLimit";

export async function POST(req: Request) {
  const { ok, retryAfter } = rateLimit(`lead:${clientKey(req)}`);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Popup form sends a lighter payload (source: "popup").
  const isPopup =
    typeof body === "object" && body !== null && "source" in body;
  const schema = isPopup ? popupLeadSchema : leadSchema;
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data as Record<string, unknown>;

  // Honeypot caught a bot — pretend success, do nothing.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const fields: Record<string, string | number | boolean | undefined> = {
    name: String(data.name ?? ""),
    phone: String(data.phone ?? ""),
    email: String((data as { email?: string }).email ?? ""),
    city: String((data as { city?: string }).city ?? ""),
    service: String((data as { service?: string }).service ?? ""),
    message: String((data as { message?: string }).message ?? ""),
    fileName: String((data as { fileName?: string }).fileName ?? ""),
    source: isPopup ? "popup" : "lead-form",
  };

  try {
    await Promise.all([
      forwardToEmail({
        subject: `Nová poptávka — ${fields.name}`,
        kind: "lead",
        fields,
      }),
      appendToSheet({
        tab: "Leads",
        values: [
          new Date().toISOString(),
          fields.name as string,
          fields.phone as string,
          fields.email as string,
          fields.city as string,
          fields.service as string,
          fields.message as string,
          fields.fileName as string,
          fields.source as string,
        ],
      }),
    ]);
  } catch {
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
