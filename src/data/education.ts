import type { Education } from './types';

export const education: Education[] = [
  {
    school: 'Columbia University',
    degree: 'M.S. in Electrical Engineering',
    track: 'Machine Learning & Data Science track',
    start: 'Sep 2022',
    end: 'Dec 2023',
    location: 'New York, NY',
    bullets: [
      'Graduate Teaching Assistant for E4040 Neural Networks & Deep Learning.',
      'Research with Prof. Zoran Kostic on the Smart City Intersections project (COSMOS Labs).',
      'Columbia representative in the NSF Center for Smart Streetscapes.',
      'Coursework: Statistical Learning, Natural Language Processing, Sparse Models for High-Dimensional Data, Algorithms for Data Science, Big Data Analytics.',
    ],
    href: 'https://www.ee.columbia.edu/',
  },
  {
    school: 'University of Mumbai',
    degree: 'B.E. in Electronics & Telecommunication',
    start: 'Aug 2017',
    end: 'May 2021',
    location: 'Mumbai, India',
    bullets: [
      'Ranked in the top 10% of the class.',
      'Built Blind Person’s Assistant, a wearable that uses face detection and recognition to help visually impaired users.',
      'Coursework: Big Data Analytics, Operations Research, Image Processing & Machine Vision, Data Compression & Encryption.',
    ],
    href: 'https://mu.ac.in/',
  },
];
