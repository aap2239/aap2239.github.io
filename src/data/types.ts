export interface SocialLink {
  label: string;
  href: string;
  /** Short handle shown in the footer, e.g. "@aap2239" */
  handle?: string;
}

export interface Metric {
  /** Final numeric value. Counted up on scroll; rendered as-is without JS. */
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  /** Big numeral shown in the sticky column, e.g. "2024" */
  year: string;
  summary: string;
  bullets: string[];
  metrics: Metric[];
  tags: string[];
  href?: string;
  /** Marks an entry whose content still needs to be filled in. Rendered with a visible TODO style. */
  todo?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  /** Short category label, e.g. "AutoML platform", "LLM system", "Computer vision" */
  kind: string;
  year: string;
  featured?: boolean;
  /** Non-featured projects only appear in the open-source grid when this is true. */
  showcase?: boolean;
  /** Featured cards use problem/approach/outcome; compact cards use description. */
  problem?: string;
  approach?: string;
  outcome?: string;
  description: string;
  metrics?: Metric[];
  tags: string[];
  repo?: string;
  link?: { label: string; href: string };
}

export interface Skill {
  name: string;
  /** Shown with an accent dot and a tooltip naming where it was used. */
  usedIn?: string;
}

export interface SkillStage {
  name: string;
  blurb: string;
  skills: Skill[];
}

export interface Education {
  school: string;
  degree: string;
  track?: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
  href: string;
}

export interface JourneyStop {
  city: string;
  country: string;
  years: string;
  title: string;
  blurb: string;
  lat: number;
  lon: number;
  /** Where the city label sits relative to its marker. */
  label: 'above' | 'below' | 'left' | 'right';
  todo?: boolean;
}

export interface NowItem {
  label: string;
  value: string;
  detail?: string;
  todo?: boolean;
}

export interface Hobby {
  title: string;
  line: string;
}
