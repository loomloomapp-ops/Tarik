"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonAction } from "@/components/ui/Button";
import { useSubmit } from "@/lib/useSubmit";
import { privacyHref, validators } from "@/lib/privacyHref";
import {
  Consent,
  FileField,
  SelectField,
  TextArea,
  TextField,
} from "./Fields";
import { FormSuccess } from "./FormSuccess";

type Errors = Partial<Record<string, string>>;

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("form");
  const locale = useLocale();
  const { status, submit, reset } = useSubmit("/api/lead");

  const [errors, setErrors] = useState<Errors>({});
  const [consent, setConsent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const serviceOptions = t.raw("serviceOptions") as string[];

  function validate(form: HTMLFormElement): Errors | null {
    const fd = new FormData(form);
    const next: Errors = {};
    const name = String(fd.get("name") || "");
    const phone = String(fd.get("phone") || "");
    const email = String(fd.get("email") || "");

    if (!validators.name(name)) next.name = t("errors.name");
    if (!validators.phone(phone)) next.phone = t("errors.phone");
    if (email && !validators.email(email)) next.email = t("errors.email");
    if (!consent) next.consent = t("errors.consent");
    if (file && file.size > 25 * 1024 * 1024) next.file = t("errors.fileSize");

    return Object.keys(next).length ? next : null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form);
    setErrors(found || {});
    if (found) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    const fd = new FormData(form);
    await submit({
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email") || "",
      city: fd.get("city") || "",
      service: fd.get("service") || "",
      message: fd.get("message") || "",
      fileName: file?.name || "",
      fileSize: file?.size || 0,
      consent: true,
      company: fd.get("company") || "",
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
          setFile(null);
          setErrors({});
        }}
      />
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className={compact ? "space-y-5" : "grid gap-5 sm:grid-cols-2"}>
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
          label={t("email")}
          name="email"
          type="email"
          placeholder={t("emailPh")}
          autoComplete="email"
          optional
          optionalLabel={t("optional")}
          error={errors.email}
        />
        <TextField
          label={t("city")}
          name="city"
          placeholder={t("cityPh")}
          autoComplete="address-level2"
          optional
          optionalLabel={t("optional")}
        />
      </div>

      <SelectField
        label={t("service")}
        name="service"
        placeholder={t("servicePh")}
        options={serviceOptions}
        optional
        optionalLabel={t("optional")}
      />

      <TextArea
        label={t("message")}
        name="message"
        placeholder={t("messagePh")}
        optional
        optionalLabel={t("optional")}
      />

      <FileField
        label={t("file")}
        name="file"
        hint={t("fileHint")}
        chooseLabel={t("fileChoose")}
        noneLabel={t("fileNone")}
        fileName={file?.name}
        error={errors.file}
        optional
        optionalLabel={t("optional")}
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
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
        className="w-full justify-between sm:w-auto sm:justify-center"
      >
        {status === "submitting" ? t("sending") : t("submit")}
      </ButtonAction>
    </form>
  );
}
