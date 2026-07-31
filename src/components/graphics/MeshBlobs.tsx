import { cn } from "@/lib/utils";

/** Two drifting radial-gradient glows. Cap: exactly two per viewport. */
export function MeshBlobs({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="mesh-blob -top-[12%] left-[6%] h-[480px] w-[480px] bg-[radial-gradient(circle,rgba(52,211,153,0.13),transparent_65%)]"
        style={
          {
            "--drift-x": "52px",
            "--drift-y": "34px",
            "--drift-dur": "22s",
          } as React.CSSProperties
        }
      />
      <div
        className="mesh-blob -bottom-[16%] right-[4%] h-[560px] w-[560px] bg-[radial-gradient(circle,rgba(34,211,238,0.09),transparent_65%)]"
        style={
          {
            "--drift-x": "-44px",
            "--drift-y": "-38px",
            "--drift-dur": "28s",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
