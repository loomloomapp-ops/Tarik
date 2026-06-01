/**
 * Email delivery — STUB.
 *
 * This is a working placeholder: it logs the payload server-side and resolves
 * successfully so the whole front-end flow (validation, loading, success state)
 * works end to end today. To go live, install `resend`, set RESEND_API_KEY /
 * LEAD_NOTIFICATION_TO / LEAD_NOTIFICATION_FROM in .env.local, and replace the
 * body of `forwardToEmail` with the commented reference implementation.
 */

export type LeadEmailPayload = {
  subject: string;
  kind: "lead" | "career";
  fields: Record<string, string | number | boolean | undefined>;
};

export async function forwardToEmail(payload: LeadEmailPayload): Promise<void> {
  // --- Reference implementation (uncomment after `npm i resend`) ---
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: process.env.LEAD_NOTIFICATION_FROM!,
  //   to: process.env.LEAD_NOTIFICATION_TO!, // tarikinvest009@gmail.com
  //   subject: payload.subject,
  //   text: Object.entries(payload.fields)
  //     .map(([k, v]) => `${k}: ${v ?? "-"}`)
  //     .join("\n"),
  // });

  // eslint-disable-next-line no-console
  console.info("[email:stub] would send", payload.subject, payload.fields);
}
