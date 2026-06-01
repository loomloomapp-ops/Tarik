"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

// Shared client-side submit handler: posts JSON, tracks status, returns ok flag.
export function useSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(payload: Record<string, unknown>): Promise<boolean> {
    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }

  function reset() {
    setStatus("idle");
  }

  return { status, submit, reset };
}
