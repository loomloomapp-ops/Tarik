"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonAction } from "@/components/ui/Button";
import { useSubmit } from "@/lib/useSubmit";
import { privacyHref, validators } from "@/lib/privacyHref";
import { Consent, TextField } from "./Fields";
import { FormSuccess } from "./FormSuccess";

type Errors = Partial<Record<string, string>>;

export function PopupLeadForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const { status, submit, reset } = useSubmit("/api/lead");

  const [errors, setErrors] = useState<Errors>({});
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "");
    const phone = String(fd.get("phone") || "");

    const next: Errors = {};
    if (!validators.name(name)) next.name = t("errors.name");
    if (!validators.phone(phone)) next.phone = t("errors.phone");
    if (!consent) next.consent = t("errors.consent");
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    await submit({
      name,
      phone,
      consent: true,
      company: fd.get("company") || "",
      source: "popup",
      locale,
    });
  }

  if (status === "success") {
    return (
      <FormSuccess
        title={t("success.title")}
        desc={t("success.desc")}
        again={t("success.again")}
        onReset={() => {
          reset();
          setConsent(false);
          setErrors({});
        }}
      />
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <TextField
        label={t("name")}
        name="name"
        placeholder={t("namePh")}
        autoComplete="name"
        error={errors.name}
      />
      <TextField
        label={t("phone")}
        name="phone"
        type="tel"
        placeholder={t("phonePh")}
        autoComplete="tel"
        error={errors.phone}
      />
      <Consent
        name="consent"
        label={t("consent")}
        linkLabel={t("consentLink")}
        linkHref={privacyHref(locale)}
        checked={consent}
        onChange={(e) => setConsent(e.target.checked)}
        error={errors.consent}
      />
      {status === "error" && (
        <p role="alert" className="text-sm text-electric-600">
          {t("errors.generic")}
        </p>
      )}
      <ButtonAction
        type="submit"
        size="lg"
       
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? t("sending") : t("submit")}
      </ButtonAction>
    </form>
  );
}
