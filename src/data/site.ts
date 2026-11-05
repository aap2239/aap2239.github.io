import type { SocialLink } from './types';

export const site = {
  name: 'Aishwarya Patange',
  firstName: 'Aishwarya',
  role: 'Data Scientist / ML Engineer',
  location: 'New York, NY',
  email: 'aishwaryapatange@gmail.com',
  url: 'https://aap2239.github.io',
  title: 'Aishwarya Patange — Data Scientist / ML Engineer',
  description:
    'Data scientist and ML engineer in New York. Built an AutoML platform from scratch, computer vision on a live smart-city testbed at Columbia, and LLM systems for cybersecurity. Currently at Gartner.',
  /** Drop your real PDF at public/resume.pdf to replace the placeholder. */
  resumePath: '/resume.pdf',
  ogImage: '/og.jpg',
  hero: {
    eyebrow: 'Aishwarya Patange · Data Scientist / ML Engineer · New York, NY',
    lines: ['Machine', 'learning,', 'made in', 'New York.'],
    /** Which line is set in the accent color (0-based). */
    accentLine: 2,
    sub: 'Data scientist at Gartner. Built an AutoML platform from scratch, trained detectors on live city intersections at Columbia, and shipped LLM systems for cybersecurity. I like the whole pipeline, from messy data to something people use.',
    status: 'Open to conversations · 2026',
    /** The strip along the bottom of the hero. */
    strip: ['Gartner', 'Columbia University', 'torsha.ai', 'COSMOS Labs', 'ChaosTrack', 'Mumbai → New York'],
  },
  about: {
    lead: 'I started in Mumbai as an electronics engineer who spent more time training models than soldering boards.',
    paragraphs: [
      'That turned into building torsha.ai, an end-to-end AutoML platform, at iQGateway in Bangalore. Then a master’s at Columbia, where I trained detection and tracking models on real intersection footage for the COSMOS smart-city testbed and taught deep learning as a TA. Today I do data science at Gartner, working out of the Stamford office and still living in New York.',
      'What I care about: models that hold up outside the notebook. Clean data pipelines, honest evaluation, explainability, and the engineering that gets a model in front of people.',
    ],
    stats: [
      { value: 5, suffix: '+', label: 'years building ML' },
      { value: 4, label: 'cities, two continents' },
      { value: 12, suffix: '+', label: 'open-source projects' },
    ],
  },
  contact: {
    headline: ['Let’s build something', 'that ships.'],
    sub: 'Open to conversations about data science and ML engineering roles, collaborations, or a good chess game. My inbox is open.',
  },
};

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/aap2239', handle: 'aap2239' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aishwaryapatange/', handle: 'aishwaryapatange' },
  { label: 'Medium', href: 'https://medium.com/@aishwaryapatange', handle: '@aishwaryapatange' },
  { label: 'Stack Overflow', href: 'https://stackoverflow.com/users/13231272/aishwarya-patange', handle: 'aishwarya-patange' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/aap2239', handle: 'aap2239' },
];

export const nav = [
  { label: 'Story', href: '#about', mobile: false },
  { label: 'Route', href: '#journey', mobile: false },
  { label: 'Work', href: '#work', mobile: true },
  { label: 'Skills', href: '#skills', mobile: false },
  { label: 'Now', href: '#now', mobile: true },
  { label: 'Contact', href: '#contact', mobile: true },
];
