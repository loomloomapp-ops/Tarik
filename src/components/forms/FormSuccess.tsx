"use client";

import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import { ButtonAction } from "@/components/ui/Button";

export function FormSuccess({
  title,
  desc,
  again,
  onReset,
  tone = "light",
}: {
  title: string;
  desc: string;
  again: string;
  onReset: () => void;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-10 text-center"
      role="status"
      aria-live="polite"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-electric-500/15 text-electric-500">
        <CheckCircle weight="fill" className="h-8 w-8" />
      </span>
      <h3
        className={`mt-5 text-xl font-semibold ${dark ? "text-white" : "text-graphite-900"}`}
      >
        {title}
      </h3>
      <p
        className={`mt-2 max-w-md text-sm leading-relaxed ${dark ? "text-mist-200" : "text-graphite-500"}`}
      >
        {desc}
      </p>
      <ButtonAction
        type="button"
        variant={dark ? "light" : "ghost"}
        className="mt-6"
        onClick={onReset}
      >
        {again}
      </ButtonAction>
    </motion.div>
  );
}
