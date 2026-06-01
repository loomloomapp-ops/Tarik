import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center gap-3 rounded-full font-medium tracking-tight transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "py-1.5 pl-5 pr-1.5 text-sm",
  lg: "py-2 pl-7 pr-2 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-electric-500 text-white hover:bg-electric-600",
  secondary: "bg-navy-900 text-white hover:bg-navy-800 ring-1 ring-white/10",
  ghost: "bg-transparent text-graphite-900 ring-1 ring-mist-300 hover:ring-graphite-700",
  light: "bg-white text-navy-900 hover:bg-white",
};

const chip: Record<Variant, string> = {
  primary: "bg-white/20 text-white",
  secondary: "bg-white/15 text-white",
  ghost: "bg-graphite-900 text-white",
  light: "bg-navy-900 text-white",
};

const chipSize: Record<Size, string> = {
  md: "h-8 w-8",
  lg: "h-10 w-10",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

function Inner({
  children,
  variant,
  size,
}: {
  children: React.ReactNode;
  variant: Variant;
  size: Size;
}) {
  return (
    <>
      {/* Averint-style hover text swap */}
      <span className="relative grid overflow-hidden leading-none">
        <span className="col-start-1 row-start-1 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[140%]">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 translate-y-[140%] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span
        className={cn(
          "flex items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45",
          chip[variant],
          chipSize[size],
        )}
      >
        <ArrowUpRight weight="bold" className="h-4 w-4" />
      </span>
    </>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...rest
}: CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a href={href} className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      <Inner variant={variant} size={size}>
        {children}
      </Inner>
    </a>
  );
}

export function ButtonAction({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      <Inner variant={variant} size={size}>
        {children}
      </Inner>
    </button>
  );
}
