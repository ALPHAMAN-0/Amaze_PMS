import { MeshBlobs } from "@/components/graphics/MeshBlobs";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      <MeshBlobs />
      <div className="container-site relative text-center">
        <p className="font-display text-[7rem] font-bold leading-none text-primary opacity-[0.08] sm:text-[11rem]">
          404
        </p>
        <h1 className="text-h2 -mt-6 font-semibold sm:-mt-10">
          This floor doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-secondary">
          The page you&apos;re looking for was moved, renamed, or never built.
          Let&apos;s take you back to the lobby.
        </p>
        <div className="mt-9 flex justify-center">
          <MagneticButton href="/">Back to home</MagneticButton>
        </div>
      </div>
    </section>
  );
}
