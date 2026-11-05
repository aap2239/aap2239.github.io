import type { NowItem } from './types';

/** Update this whenever life changes. The stamp below is shown on the page. */
export const nowUpdated = 'November 2026';

export const now: NowItem[] = [
  {
    label: 'Building',
    value: 'An agent that documents my life',
    detail: 'Phone, laptop, and speech capture stitched into a searchable diary. Retrieval again, on far messier data than work.',
  },
  {
    label: 'Reading',
    value: 'Hyperion',
    detail: 'Dan Simmons. Six pilgrims, one Shrike, and a lot of pages left.',
  },
  {
    label: 'Listening',
    value: 'The Strokes, on repeat',
    detail: 'With a steady diet of Desi hip hop when the volume needs to go up.',
  },
  {
    label: 'Watching',
    value: 'Whatever is playing',
    detail: 'Big movie buff. Strong opinions, held loosely, offered freely.',
  },
  {
    label: 'Following',
    value: 'Manchester City & the Knicks',
    detail: 'One of these teams causes more stress than the other.',
  },
  {
    label: 'Playing',
    value: 'Chess, and guitar',
    detail: 'Openings I know, endgames I am learning. Riffs over scales.',
  },
];
