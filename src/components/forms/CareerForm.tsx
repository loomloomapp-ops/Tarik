"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonAction } from "@/components/ui/Button";
import { useSubmit } from "@/lib/useSubmit";
import { privacyHref, validators } from "@/lib/privacyHref";
import { Consent, TextArea, TextField } from "./Fields";
import { FormSuccess } from "./FormSuccess";

type Errors = Partial<Record<string, string>>;

export function CareerForm() {
  const t = useTranslations("form");
  const tc = useTranslations("careers");
  const locale = useLocale();
  const { status, submit, reset } = useSubmit("/api/career");

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
      specialization: fd.get("specialization") || "",
      experience: fd.get("experience") || "",
      city: fd.get("city") || "",
      documents: fd.get("documents") || "",
      note: fd.get("note") || "",
      consent: true,
      company: fd.get("company") || "",
      locale,
    });
  }

  if (status === "success") {
    return (
      <FormSuccess
        tone="light"
        title={tc("success.title")}
        desc={tc("success.desc")}
        again={tc("success.again")}
        onReset={() => {
          reset();
          setConsent(false);
          setErrors({});
        }}
      />
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-5 sm:grid-cols-2">
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
        <TextField
          label={t("specialization")}
          name="specialization"
          placeholder={t("specializationPh")}
          optional
          optionalLabel={t("optional")}
        />
        <TextField
          label={t("experience")}
          name="experience"
          placeholder={t("experiencePh")}
          optional
          optionalLabel={t("optional")}
        />
        <TextField
          label={t("city")}
          name="city"
          placeholder={t("cityPh")}
          optional
          optionalLabel={t("optional")}
        />
        <TextField
          label={t("documents")}
          name="documents"
          placeholder={t("documentsPh")}
          optional
          optionalLabel={t("optional")}
        />
      </div>

      <TextArea
        label={t("note")}
        name="note"
        placeholder={t("notePh")}
        optional
        optionalLabel={t("optional")}
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
        className="w-full justify-between"
      >
        {status === "submitting" ? t("sending") : tc("cta")}
      </ButtonAction>
    </form>
  );
}
