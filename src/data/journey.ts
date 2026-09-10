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
 * Pacing of the desktop scroll animation, in timeline units. One unit is
 * roughly `scrollPerUnit` percent of the viewport height of scrolling.
 *  - hold:  pause at each city before the dot leaves (and after it arrives)
 *  - legs:  travel time for each leg, in order (Mumbai→Bangalore, Bangalore→New York, New York→Stamford)
 *  - world: time for the final pull-back to the whole world
 *  - tail:  beat at the very end before the section unpins
 */
export const pacing = {
  hold: 0.7,
  legs: [1.3, 2.2, 0.9],
  world: 1.4,
  tail: 0.5,
  scrollPerUnit: 75,
};

/**
 * Camera keyframes. `at` says when: a stop (the camera rests there for the
 * hold), the midpoint of a leg, or the final world view. `w` is the visible
 * width in degrees of longitude. Center defaults to the stop's coordinates.
 */
export type CameraKey =
  | { at: 'stop'; i: number; lat?: number; lon?: number; w: number }
  | { at: 'mid'; i: number; lat: number; lon: number; w: number }
  | { at: 'world'; w: number };

export const camera: CameraKey[] = [
  { at: 'stop', i: 0, lat: 17.5, lon: 72.5, w: 42 },
  { at: 'stop', i: 1, lat: 15.5, lon: 76.5, w: 34 },
  { at: 'mid', i: 1, lat: 35, lon: 10, w: 250 },
  { at: 'stop', i: 2, lat: 40.2, lon: -74.5, w: 30 },
  { at: 'stop', i: 3, lat: 40.9, lon: -73.7, w: 16 },
  { at: 'world', w: 360 },
];
