import type {
  Milestone,
  NavLink,
  Service,
  SiteConfig,
  Stat,
  Testimonial,
  WhyUsPoint,
} from "@/types/content";

export const siteConfig = {
  name: "Amaze PMS",
  legalName: "Amaze Property Management Solutions Pvt. Ltd.",
  tagline: "India's landmark spaces run flawlessly.",
  description:
    "Amaze delivers fully in-house facility management — security, engineering, and care — across 20 million sq ft, with 15,000+ trained professionals who treat your property like their own.",
  url: "https://amaze-pms.vercel.app",
  foundedYear: 2001,
  contact: {
    phone: "+91 91006 94137",
    phoneHref: "tel:+919100694137",
    email: "info@amazepms.com",
    address: "Cyberabad, Hyderabad, Telangana, India",
  },
} satisfies SiteConfig;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] satisfies NavLink[];

export const services = [
  {
    slug: "security",
    index: "01",
    title: "Security Services",
    tagline: "Trained, vetted, always-on protection.",
    description:
      "Physical security is where Amaze began. Every guard on your site is our employee — recruited, verified, and trained on our own yearly calendar, never a subcontractor's.",
    detail:
      "From gate operations and CCTV vigilance to emergency drills and fire safety, each site runs on a written SOP with supervision layers and audit trails you can actually inspect.",
    features: [
      "Trained & background-verified guards",
      "CCTV surveillance and control-room monitoring",
      "Access control and visitor management",
      "Fire safety and emergency response drills",
      "Site-specific SOPs with supervision layers",
    ],
    chips: ["Trained Guards", "CCTV Vigilance", "Access Control"],
    icon: "shield",
  },
  {
    slug: "housekeeping",
    index: "02",
    title: "Housekeeping",
    tagline: "Spotless spaces, five-star standards.",
    description:
      "Cleanliness is the first thing every visitor judges. Our housekeeping crews work to hospitality-grade checklists — mechanized where it matters, meticulous everywhere.",
    detail:
      "Daily schedules, deep-cleaning cycles, and consumable management are tracked per site, so standards hold on day 400 exactly as they did on day one.",
    features: [
      "Daily, deep, and specialized cleaning programs",
      "Façade, glass, and floor care with mechanized equipment",
      "Washroom hygiene and consumables management",
      "Waste segregation and disposal compliance",
      "Carpet, upholstery, and high-touch sanitization",
    ],
    chips: ["Deep Cleaning", "Façade Care", "Washroom Hygiene"],
    icon: "sparkle",
  },
  {
    slug: "technical",
    index: "03",
    title: "Technical Services",
    tagline: "Engineering that never sleeps.",
    description:
      "MEP is the heartbeat of a building. Our in-house engineers run HVAC, electrical, plumbing, and water systems on preventive schedules — not breakdown calls.",
    detail:
      "AMC tracking, equipment risk assessment, and 24×7 shift coverage mean the systems your tenants never think about stay that way.",
    features: [
      "HVAC operations and AMC tracking",
      "Electrical, DG, and UPS maintenance",
      "STP & WTP operations and water treatment",
      "Plumbing, fire hydrant, and sprinkler systems",
      "Swimming pool and water-body maintenance",
    ],
    chips: ["HVAC", "Electrical", "STP & WTP"],
    icon: "wrench",
  },
  {
    slug: "landscaping",
    index: "04",
    title: "Landscaping",
    tagline: "Living green, expertly kept.",
    description:
      "Landscapes are the one asset that grows in value only with daily care. Our horticulture teams design, plant, and maintain green spaces that soften concrete campuses.",
    detail:
      "Seasonal planting calendars, irrigation management, and indoor plantscaping keep every green corner deliberate — never an afterthought.",
    features: [
      "Horticulture and lawn care programs",
      "Irrigation planning and water discipline",
      "Seasonal planting and flowerbed rotation",
      "Indoor plantscaping for lobbies and atriums",
      "Tree care, pruning, and vertical gardens",
    ],
    chips: ["Horticulture", "Irrigation", "Seasonal Planting"],
    icon: "leaf",
  },
  {
    slug: "pest-control",
    index: "05",
    title: "Pest Control",
    tagline: "Protection you never notice.",
    description:
      "The best pest control is invisible. We run integrated pest management — inspection first, chemicals last — on scheduled cycles designed around your occupants.",
    detail:
      "Government-approved, odour-safe treatments cover rodents, termites, mosquitoes, and crawling insects, with documented audits after every cycle.",
    features: [
      "Integrated pest management (IPM) approach",
      "Approved, occupant-safe chemical treatments",
      "Rodent, termite, and mosquito control",
      "Scheduled cycles with documented audits",
      "Kitchen, warehouse, and clean-room protocols",
    ],
    chips: ["Integrated IPM", "Safe Chemicals", "Scheduled Audits"],
    icon: "bug",
  },
  {
    slug: "help-desk",
    index: "06",
    title: "Help Desk Management",
    tagline: "Every request, resolved and recorded.",
    description:
      "A facility is judged by how it responds. Our help desks log every complaint and request into a ticketed workflow with SLAs, escalation paths, and closure reports.",
    detail:
      "Residents and tenants get a single point of contact; management gets dashboards that show exactly where every request stands.",
    features: [
      "Ticketed complaint and request workflows",
      "SLA tracking with escalation matrix",
      "Resident and tenant communication desk",
      "Move-in / move-out coordination",
      "Monthly MIS and closure reporting",
    ],
    chips: ["Ticketing", "SLA Tracking", "Resident Support"],
    icon: "headset",
  },
  {
    slug: "parking",
    index: "07",
    title: "Parking Management",
    tagline: "Order for every arrival.",
    description:
      "First impressions begin at the gate. Our parking teams design traffic flow, man the lanes, and run access systems so arrival never feels like congestion.",
    detail:
      "From valet operations to marshal deployment and boom-barrier systems, we keep vehicles — and tempers — moving smoothly.",
    features: [
      "Traffic flow design and lane planning",
      "Valet operations and marshal deployment",
      "Boom barriers and access systems",
      "Visitor and vendor vehicle management",
      "Peak-hour and event surge handling",
    ],
    chips: ["Traffic Flow", "Valet Ops", "Access Systems"],
    icon: "car",
  },
] satisfies Service[];

export const stats = [
  { value: 20, suffix: "M+", label: "Sq. ft. under management" },
  { value: 15000, suffix: "+", label: "Trained professionals" },
  { value: 200, suffix: "+", label: "Client properties" },
  { value: 24, suffix: "+", label: "Years of service", gold: true },
] satisfies Stat[];

export const whyUs = [
  {
    title: "100% in-house teams",
    description:
      "No subcontractors. Every guard, engineer, and gardener is an Amaze employee — trained on our yearly calendar, accountable to one standard.",
    icon: "users",
  },
  {
    title: "Audit-grade rigor",
    description:
      "Site-specific SOPs, equipment risk assessments, and internal EHS, security, and compliance audits — with improvement reports you actually receive.",
    icon: "clipboard",
  },
  {
    title: "Backup, built in",
    description:
      "Reserve staff on standby for every site. An absence on our roster never becomes a gap on your property.",
    icon: "layers",
  },
  {
    title: "People who stay",
    description:
      "Insurance, education rewards, and welfare programs for 15,000+ staff — because retained people deliver better care, year after year.",
    icon: "heart",
  },
] satisfies WhyUsPoint[];

export const sectors = [
  "IT Parks",
  "Corporate Campuses",
  "Hospitals",
  "Hotels",
  "Residential Communities",
  "Educational Institutions",
  "Manufacturing",
  "Pharma",
  "Retail",
  "Warehouses",
] as const;

export const testimonials = [
  {
    quote:
      "Amaze took over a campus three vendors had struggled with. Within a quarter, facility complaints stopped being a standing agenda item in our reviews.",
    author: "VP, Facilities",
    role: "IT Park · Hyderabad",
  },
  {
    quote:
      "Their engineers treat our equipment like their own. Preventive schedules are actually followed, and our downtime numbers show it.",
    author: "General Manager, Operations",
    role: "Healthcare Group · Hyderabad",
  },
  {
    quote:
      "Same supervisors, same faces, year after year. In this industry, staff retention like theirs is the whole game — and our residents feel it.",
    author: "Estate Manager",
    role: "Gated Community · Telangana",
  },
] satisfies Testimonial[];

export const milestones = [
  {
    year: "2001",
    title: "Founded in Hyderabad",
    description:
      "Amaze begins as the property-services arm of the ACTION GROUP, with security services as its founding discipline.",
  },
  {
    year: "2000s",
    title: "One discipline becomes seven",
    description:
      "Housekeeping, engineering, landscaping, pest control, help desk, and parking are built as in-house divisions — never franchised out.",
  },
  {
    year: "2010s",
    title: "Five-state footprint",
    description:
      "Operations expand across five Indian states as IT parks, hospitals, and townships bring Amaze onto their campuses.",
  },
  {
    year: "Today",
    title: "20M+ sq ft, one standard",
    description:
      "15,000+ trained professionals care for 200+ properties — still fully in-house, still audited to one standard.",
  },
] satisfies Milestone[];

export const propertyTypes = [
  "IT Park / Commercial",
  "Residential Community",
  "Hospital / Healthcare",
  "Hotel / Hospitality",
  "Industrial / Warehouse",
  "Other",
] as const;
