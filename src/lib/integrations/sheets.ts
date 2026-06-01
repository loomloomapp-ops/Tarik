/**
 * Google Sheets append — STUB.
 *
 * Working placeholder that logs the row and resolves. To go live, install
 * `googleapis`, set GOOGLE_SHEETS_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL /
 * GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, share the sheet with the service account,
 * and replace the body of `appendToSheet` with the reference implementation.
 */

export type SheetRow = {
  tab: "Leads" | "Careers";
  values: Array<string | number>;
};

export async function appendToSheet(row: SheetRow): Promise<void> {
  // --- Reference implementation (uncomment after `npm i googleapis`) ---
  // import { google } from "googleapis";
  // const auth = new google.auth.JWT({
  //   email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  //   key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  //   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  // });
  // const sheets = google.sheets({ version: "v4", auth });
  // await sheets.spreadsheets.values.append({
  //   spreadsheetId: process.env.GOOGLE_SHEETS_ID,
  //   range: `${row.tab}!A1`,
  //   valueInputOption: "USER_ENTERED",
  //   requestBody: { values: [row.values] },
  // });

  // eslint-disable-next-line no-console
  console.info("[sheets:stub] would append", row.tab, row.values);
}
