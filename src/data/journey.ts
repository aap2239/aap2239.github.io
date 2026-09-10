import type { JourneyStop } from './types';

/**
 * The route, oldest first. Positions are real coordinates; the map projects
 * them at build time. `label` says where the city name sits relative to the
 * marker so neighbouring labels do not collide when the camera is zoomed in.
 */
export const journey: JourneyStop[] = [
  {
    city: 'Mumbai',
    country: 'India',
    years: '2017 – 2021',
    title: 'Where it started',
    blurb:
      'B.E. in Electronics & Telecommunication at the University of Mumbai, top 10% of the class. Built a wearable assistant for the visually impaired and realized I would rather train models than tune circuits.',
    lat: 19.076,
    lon: 72.877,
    label: 'left',
  },
  {
    city: 'Bangalore',
    country: 'India',
    years: '2021 – 2022',
    title: 'First production ML',
    blurb:
      'Associate Data Scientist at iQGateway. Led the design of torsha.ai, an end-to-end AutoML platform, and learned what it takes to get a model in front of paying users.',
    lat: 12.972,
    lon: 77.594,
    label: 'right',
  },
  {
    city: 'New York',
    country: 'USA',
    years: '2022 – 2023',
    title: 'Columbia & COSMOS Labs',
    blurb:
      'M.S. in Electrical Engineering, ML & Data Science track. Trained YOLOv8 detectors on live intersection feeds, cut streaming latency to 80 ms, and TA’d Neural Networks & Deep Learning.',
    lat: 40.713,
    lon: -74.006,
    label: 'below',
  },
  {
    city: 'Stamford',
    country: 'USA',
    years: '2024 – now',
    title: 'Gartner',
    blurb:
      'Data science at Gartner, with the office in Stamford and home still in New York. TODO: one line on what you work on and why it matters.',
    lat: 41.053,
    lon: -73.539,
    label: 'above',
    todo: true,
  },
];

/**
 * Camera keyframes for the desktop scroll animation. `t` is timeline time:
 * whole numbers are the stops (0 = Mumbai … 3 = Stamford), 4 is the world view.
 * `w` is the visible width in degrees of longitude. Center defaults to the stop.
 */
export const camera: Array<{ t: number; lat?: number; lon?: number; w: number }> = [
  { t: 0, lat: 17.5, lon: 72.5, w: 42 },
  { t: 1, lat: 15.5, lon: 76.5, w: 34 },
  { t: 1.5, lat: 35, lon: 10, w: 250 },
  { t: 2, lat: 40.2, lon: -74.5, w: 30 },
  { t: 3, lat: 40.9, lon: -73.7, w: 16 },
  { t: 4, lat: 0, lon: 0, w: 360 },
];
