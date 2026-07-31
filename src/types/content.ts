export type IconName =
  | "shield"
  | "sparkle"
  | "wrench"
  | "leaf"
  | "bug"
  | "headset"
  | "car"
  | "users"
  | "clipboard"
  | "layers"
  | "heart"
  | "phone"
  | "mail"
  | "pin"
  | "building"
  | "arrow-right"
  | "check";

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  index: string; // "01"–"07", used as the ghosted card numeral
  title: string;
  tagline: string;
  description: string;
  detail: string; // second paragraph for /services
  features: string[];
  chips: [string, string, string];
  icon: IconName;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  gold?: boolean; // heritage marker — the single sanctioned use of --gold
}

export interface WhyUsPoint {
  title: string;
  description: string;
  icon: IconName;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  foundedYear: number;
  contact: {
    phone: string;
    phoneHref: string;
    email: string;
    address: string;
  };
}
