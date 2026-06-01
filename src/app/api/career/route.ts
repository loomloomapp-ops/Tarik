import { NextResponse } from "next/server";
import { careerSchema } from "@/lib/validation";
import { forwardToEmail } from "@/lib/integrations/email";
import { appendToSheet } from "@/lib/integrations/sheets";
import { clientKey, rateLimit } from "@/lib/integrations/rateLimit";

export async function POST(req: Request) {
  const { ok, retryAfter } = rateLimit(`career:${clientKey(req)}`);
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

  const parsed = careerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const fields = {
    name: data.name,
    phone: data.phone,
    specialization: data.specialization ?? "",
    experience: data.experience ?? "",
    city: data.city ?? "",
    documents: data.documents ?? "",
    note: data.note ?? "",
  };

  try {
    await Promise.all([
      forwardToEmail({
        subject: `Nová přihláška do týmu — ${fields.name}`,
        kind: "career",
        fields,
      }),
      appendToSheet({
        tab: "Careers",
        values: [
          new Date().toISOString(),
          fields.name,
          fields.phone,
          fields.specialization,
          fields.experience,
          fields.city,
          fields.documents,
          fields.note,
        ],
      }),
    ]);
  } catch {
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
