// Static site content, metadata routes and the GitHub Pages base-path logic.
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { navLinks, services, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

describe("site content", () => {
  it("uses an https origin without a trailing slash as the canonical URL", () => {
    const url = new URL(siteConfig.url);
    assert.equal(url.protocol, "https:");
    assert.equal(siteConfig.url, url.origin);
  });

  it("keeps the dialable phone link in sync with the displayed number", () => {
    assert.equal(siteConfig.contact.phoneHref, `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`);
    assert.match(siteConfig.contact.email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
  });

  it("lists services with unique slugs, sequential numerals and three chips each", () => {
    assert.equal(new Set(services.map((service) => service.slug)).size, services.length);
    services.forEach((service, position) => {
      assert.equal(service.index, String(position + 1).padStart(2, "0"));
      assert.match(service.slug, /^[a-z0-9-]+$/);
      assert.equal(service.chips.length, 3);
      assert.ok(service.features.length > 0);
    });
  });

  it("only links to internal routes from the navigation", () => {
    for (const link of navLinks) assert.match(link.href, /^\/[a-z-]*$/);
  });
});

describe("metadata routes", () => {
  it("emits one absolute sitemap entry per navigable page", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    assert.deepEqual(
      urls.slice().sort(),
      navLinks.map((link) => `${siteConfig.url}${link.href === "/" ? "" : link.href}`).sort()
    );
    assert.equal(new Set(urls).size, urls.length);
    assert.equal(entries.find((entry) => entry.url === siteConfig.url).priority, 1);
  });

  it("allows crawling and points robots at the sitemap", () => {
    const rules = robots();
    assert.deepEqual(rules.rules, { userAgent: "*", allow: "/" });
    assert.equal(rules.sitemap, `${siteConfig.url}/sitemap.xml`);
  });
});

describe("cn()", () => {
  it("drops falsy values and lets the last conflicting Tailwind class win", () => {
    assert.equal(cn("px-2", false, null, undefined, "px-4"), "px-4");
    assert.equal(cn("text-sm", ["font-mono", { hidden: false, block: true }]), "text-sm font-mono block");
  });
});

describe("next.config base path", () => {
  const saved = { actions: process.env.GITHUB_ACTIONS, repository: process.env.GITHUB_REPOSITORY };
  const restore = (name, value) => (value === undefined ? delete process.env[name] : (process.env[name] = value));
  let run = 0;
  const loadConfig = async (env) => {
    for (const name of ["GITHUB_ACTIONS", "GITHUB_REPOSITORY"]) restore(name, env[name]);
    return (await import(`../next.config.ts?case=${++run}`)).default;
  };

  afterEach(() => {
    restore("GITHUB_ACTIONS", saved.actions);
    restore("GITHUB_REPOSITORY", saved.repository);
  });

  it("serves from the domain root outside GitHub Actions", async () => {
    const config = await loadConfig({ GITHUB_REPOSITORY: "someone/Some_Repo" });
    assert.equal(config.output, "export");
    assert.equal(config.basePath, "");
    assert.equal(config.assetPrefix, undefined);
  });

  it("prefixes routes and assets with the repository name on GitHub Pages", async () => {
    const config = await loadConfig({ GITHUB_ACTIONS: "true", GITHUB_REPOSITORY: "someone/Some_Repo" });
    assert.equal(config.basePath, "/Some_Repo");
    assert.equal(config.assetPrefix, "/Some_Repo/");
    assert.equal(config.trailingSlash, true);
  });
});
