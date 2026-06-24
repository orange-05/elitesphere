import { ServiceItem, IndustryItem } from "../types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    shortDescription: "Drive pipeline growth with precision content maps, modern SEO, and premium paid advertising.",
    iconName: "TrendingUp",
    subServices: [
      "Social Media Management",
      "Content Marketing",
      "Search Engine Optimization (SEO)",
      "Paid Advertising (PPC)",
      "Online Reputation Management"
    ],
    fullDetails: "Our digital marketing wing crafts high-converting buyer journeys tailored to target audiences. We focus on customer acquisition cost efficiency and lifetime value expansion through rigorous data analytics, behavioral tracking, and premium messaging."
  },
  {
    id: "branding-design",
    title: "Branding & Creative Design",
    shortDescription: "Formulate strategic voice guidelines, brand assets, and high-fidelity corporate presentation decks.",
    iconName: "Award",
    subServices: [
      "Logo Design & Visual Assets",
      "Corporate Brand Identity Systems",
      "Premium Marketing Materials",
      "High-Fidelity Executive Presentations"
    ],
    fullDetails: "Branding forms the identity and promise of your organization. We re-engineer existing brand perceptions to align with strategic goals, establishing custom typography, visual accents, and guidelines that instantly build market authority."
  },
  {
    id: "website-development",
    title: "Website Development",
    shortDescription: "Engineered speed, fully custom animations, responsive layouts, and bulletproof web architecture.",
    iconName: "Globe",
    subServices: [
      "Enterprise Business Websites",
      "Educational Institution Portals",
      "High-Conversion Landing Pages",
      "Continuous Website SLA & Maintenance"
    ],
    fullDetails: "Your digital storefront is the terminal point for all media acquisition. We construct responsive, secure, search-engine-optimized web platforms built on modern code structures that prioritize speed, ease of custom updates, and conversion mechanics."
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    shortDescription: "Accelerate revenue goals with market validation, startup scale playbook formulation, and risk audits.",
    iconName: "Briefcase",
    subServices: [
      "Sustainable Growth Strategy",
      "Competitive Market Research",
      "Early & Seed Stage Startup Cohorts",
      "Structured Business Planning"
    ],
    fullDetails: "We provide executive leaders with objective strategic feedback and data. From auditing addressable markets to modeling unit economics, we build actionable playbooks to unlock new channels and scale up teams smoothly."
  },
  {
    id: "educational-consulting",
    title: "Educational Institution Consulting",
    shortDescription: "Specialized student enrolment optimization, institutional branding, and campaign pipelines.",
    iconName: "BookOpen",
    subServices: [
      "Admission Attraction Strategy",
      "Institutional Reputation Branding",
      "High-Conversion Student Recruitment Campaigns",
      "Multi-Channel Digital Presence Management"
    ],
    fullDetails: "The educational sector operates under unique regulatory and demographic cycles. We partner with universities, private colleges, and K-12 systems to design robust admissions channels, virtual tours, and modern digital outreach."
  }
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "educational-institutions",
    name: "Educational Institutions",
    description: "Empowering universities, colleges, and training sanctuaries with premium enrolment strategies and institutional brand authority.",
    iconName: "GraduationCap",
    details: "We navigate complex student recruitment cycles with custom outreach, online tour platforms, and structured program marketing."
  },
  {
    id: "startups",
    name: "Startups",
    description: "Accelerating early-stage concepts through rapid product-market validation, structured unit economics, and Series A readiness frameworks.",
    iconName: "Rocket",
    details: "Minimizing burn-rates by building robust customer acquisition loops and scalable business operations plans."
  },
  {
    id: "smes",
    name: "SMEs & Small Businesses",
    description: "Re-engineering traditional services and local business channels into high-velocity digital market leaders.",
    iconName: "Building",
    details: "Upgrading operational systems, search engine profiles, high-intent landing systems, and team analytics."
  },
  {
    id: "healthcare",
    name: "Healthcare Providers",
    description: "Connecting private patient networks, regional healthcare systems, and tech developers with trust-driven branding campaigns.",
    iconName: "HeartPulse",
    details: "Creating helpful health content maps, patient satisfaction surveys, and maintaining high privacy standard visuals."
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    description: "Integrating multi-channel storefront operations, brand storytelling, and localized SEO optimization maps.",
    iconName: "ShoppingBag",
    details: "Formulating repeat-buyer loyalty strategies, conversion rate optimization, and stunning product launch systems."
  },
  {
    id: "hospitality",
    name: "Hospitality & Leisure",
    description: "Positioning travel hubs, boutique resorts, and premium event systems as premium leaders.",
    iconName: "Utensils",
    details: "Constructing visual content loops, brand guidelines, customer experience surveys, and local search superiority."
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description: "Positioning legal practices, engineering consultancies, and financial firms as absolute industry authorities.",
    iconName: "Shield",
    details: "Designing premium whitepapers, informative SEO resources, and direct executive appointment scheduling modules."
  }
];
