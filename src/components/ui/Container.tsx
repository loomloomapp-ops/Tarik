import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[2200px] px-6 sm:px-10 lg:px-[90px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
