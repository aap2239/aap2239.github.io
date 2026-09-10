import type { JourneyStop } from './types';

/**
 * The route, oldest first. `x`/`y` are positions in the desktop SVG
 * (viewBox 0 0 1200 520). The map is abstract, not geographic.
 */
export const journey: JourneyStop[] = [
  {
    city: 'Mumbai',
    country: 'India',
    years: '2017 – 2021',
    title: 'Where it started',
    blurb:
      'B.E. in Electronics & Telecommunication at the University of Mumbai, top 10% of the class. Built a wearable assistant for the visually impaired and realized I would rather train models than tune circuits.',
    x: 150,
    y: 390,
  },
  {
    city: 'Bangalore',
    country: 'India',
    years: '2021 – 2022',
    title: 'First production ML',
    blurb:
      'Associate Data Scientist at iQGateway. Led the design of torsha.ai, an end-to-end AutoML platform, and learned what it takes to get a model in front of paying users.',
    x: 430,
    y: 440,
  },
  {
    city: 'New York',
    country: 'USA',
    years: '2022 – 2023',
    title: 'Columbia & COSMOS Labs',
    blurb:
      'M.S. in Electrical Engineering, ML & Data Science track. Trained YOLOv8 detectors on live intersection feeds, cut streaming latency to 80 ms, and TA’d Neural Networks & Deep Learning.',
    x: 850,
    y: 160,
  },
  {
    city: 'Stamford',
    country: 'USA',
    years: '2024 – now',
    title: 'Gartner',
    blurb:
      'Data science at Gartner, with the office in Stamford and home still in New York. TODO: one line on what you work on and why it matters.',
    x: 1070,
    y: 100,
    todo: true,
  },
];
