"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

function Label({
  htmlFor,
  children,
  optional,
  optionalLabel,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
  optionalLabel?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-2 text-sm font-medium text-graphite-900"
    >
      {children}
      {optional && (
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-graphite-500">
          {optionalLabel}
        </span>
      )}
    </label>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-electric-600">
      {message}
    </p>
  );
}

const fieldBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-graphite-900 placeholder:text-graphite-500/70 transition-colors focus:border-electric-500 focus:outline-none focus-visible:outline-none";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  optionalLabel?: string;
};

export function TextField({
  label,
  name,
  error,
  optional,
  optionalLabel,
  type = "text",
  ...rest
}: BaseProps &
  React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div>
      <Label htmlFor={id} optional={optional} optionalLabel={optionalLabel}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={cn(fieldBase, error ? "border-electric-500" : "border-mist-300")}
        {...rest}
      />
      <ErrorText id={errId} message={error} />
    </div>
  );
}

export function TextArea({
  label,
  name,
  error,
  optional,
  optionalLabel,
  ...rest
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div>
      <Label htmlFor={id} optional={optional} optionalLabel={optionalLabel}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={cn(
          fieldBase,
          "resize-y",
          error ? "border-electric-500" : "border-mist-300",
        )}
        {...rest}
      />
      <ErrorText id={errId} message={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  optional,
  optionalLabel,
  placeholder,
  options,
  ...rest
}: BaseProps & {
  placeholder: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div>
      <Label htmlFor={id} optional={optional} optionalLabel={optionalLabel}>
        {label}
      </Label>
      <select
        id={id}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        defaultValue=""
        className={cn(
          fieldBase,
          "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10",
          error ? "border-electric-500" : "border-mist-300",
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%235d6b7e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
        }}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ErrorText id={errId} message={error} />
    </div>
  );
}

export function FileField({
  label,
  name,
  hint,
  chooseLabel,
  noneLabel,
  fileName,
  error,
  optional,
  optionalLabel,
  onChange,
}: BaseProps & {
  hint: string;
  chooseLabel: string;
  noneLabel: string;
  fileName?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div>
      <Label htmlFor={id} optional={optional} optionalLabel={optionalLabel}>
        {label}
      </Label>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-mist-300 bg-mist-50 px-4 py-3 text-sm text-graphite-700 transition-colors hover:border-electric-500"
      >
        <span className="rounded-lg bg-navy-900 px-3 py-1.5 text-xs font-medium text-white">
          {chooseLabel}
        </span>
        <span className="truncate text-graphite-500">
          {fileName || noneLabel}
        </span>
        <input
          id={id}
          name={name}
          type="file"
          accept="image/*,.pdf,.dwg,.doc,.docx"
          className="sr-only"
          onChange={onChange}
        />
      </label>
      <p className="mt-1.5 text-xs text-graphite-500">{hint}</p>
      <ErrorText id={errId} message={error} />
    </div>
  );
}

export function Consent({
  name,
  label,
  linkLabel,
  linkHref,
  error,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  linkLabel: string;
  linkHref: string;
  error?: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-mist-300 accent-electric-500"
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-graphite-700">
          {label}{" "}
          <a
            href={linkHref}
            className="text-electric-600 underline underline-offset-2 hover:text-electric-500"
          >
            {linkLabel}
          </a>
        </label>
      </div>
      <ErrorText id={errId} message={error} />
    </div>
  );
}
