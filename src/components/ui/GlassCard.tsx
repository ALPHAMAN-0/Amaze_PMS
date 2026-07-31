import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass rounded-2xl",
        interactive &&
          "transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-(--border-strong) hover:bg-(--bg-card-hover) hover:glow-shadow",
        className
      )}
    >
      {children}
    </div>
  );
}
