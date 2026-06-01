import { Lightning } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

// Template eyebrow (rt-sub-text-wrap-v1): star icon + semibold label, +1px
// tracking, no pill — matches the Averint signature.
export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";
  return (
    <span className="inline-flex items-center gap-2.5 sm:gap-3">
      <Lightning
        weight="fill"
        className="h-4 w-4 text-electric-500 sm:h-[1.15rem] sm:w-[1.15rem]"
      />
      <span
        className={cn(
          "text-[0.78rem] font-semibold tracking-[0.04em] sm:text-base",
          isLight ? "text-mist-200" : "text-graphite-700",
        )}
      >
        {children}
      </span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-6 text-[clamp(2rem,4.2vw,3.4rem)] font-medium leading-[1.07] tracking-[-0.035em]",
            isLight ? "text-white" : "text-graphite-900",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 max-w-[50rem] text-base leading-relaxed sm:text-lg",
              align === "center" && "mx-auto",
              isLight ? "text-mist-200" : "text-graphite-500",
            )}
          >
            {lead.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </Reveal>
      )}
    </div>
  );
}
