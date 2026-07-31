import Link from "next/link";
import { Logo } from "@/components/graphics/LogoMark";
import { SkylineMid } from "@/components/graphics/Skyline";
import { BackToTop } from "@/components/ui/BackToTop";
import { navLinks, services, siteConfig } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-(--border-subtle)">
      {/* skyline reprise — bookends the hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-[0.35]">
        <SkylineMid className="h-full w-full" />
      </div>

      <div className="container-site relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo gradientId="logo-grad-footer" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-secondary">
              Fully in-house facility management for India&apos;s landmark
              spaces — since {siteConfig.foundedYear}.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-(--border-subtle) px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-muted">
              <span className="size-1.5 rounded-full bg-(--accent-solid)" />
              AN ACTION GROUP COMPANY
            </p>
          </div>

          <nav aria-label="Services">
            <h3 className="eyebrow">Services</h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-sm text-secondary transition-[color,padding] duration-200 hover:pl-1 hover:text-primary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="eyebrow">Company</h3>
            <ul className="mt-5 space-y-2.5">
              {navLinks
                .filter((l) => l.href !== "/")
                .map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-secondary transition-[color,padding] duration-200 hover:pl-1 hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}?subject=Careers at Amaze PMS`}
                  className="text-sm text-secondary transition-[color,padding] duration-200 hover:pl-1 hover:text-primary"
                >
                  Careers
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow">Contact</h3>
            <address className="mt-5 space-y-2.5 font-mono text-[13px] not-italic leading-relaxed text-secondary">
              <p>{siteConfig.contact.address}</p>
              <p>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-(--border-subtle) py-6">
          <p className="font-mono text-xs text-muted">
            © {year} {siteConfig.legalName}
          </p>
          <p className="hidden font-mono text-xs tracking-[0.14em] text-(--gold) sm:block">
            EST. {siteConfig.foundedYear}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
