/**
 * Build-time world map geometry. Runs in Astro's frontmatter, never in the browser.
 *
 * Equirectangular projection into a 2000 x 1000 canvas. Land comes from Natural
 * Earth via the `world-atlas` package: the 110m outline for the whole world, plus
 * 50m detail clipped to the regions the journey camera zooms into.
 */
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, FeatureCollection, MultiPolygon, Polygon, Position } from 'geojson';
import land110 from 'world-atlas/land-110m.json';
import land50 from 'world-atlas/land-50m.json';

export const MAP_W = 2000;
export const MAP_H = 1000;

export interface Pt {
  x: number;
  y: number;
}

/** Longitude/latitude to map units. */
export function project(lon: number, lat: number): Pt {
  return {
    x: ((lon + 180) / 360) * MAP_W,
    y: ((90 - lat) / 180) * MAP_H,
  };
}

type Box = { x0: number; y0: number; x1: number; y1: number };

function rings(fc: FeatureCollection | Feature): Position[][] {
  const feats = fc.type === 'FeatureCollection' ? fc.features : [fc];
  const out: Position[][] = [];
  for (const f of feats) {
    const g = f.geometry as Polygon | MultiPolygon;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    for (const poly of polys) for (const ring of poly) out.push(ring);
  }
  return out;
}

/** Sutherland–Hodgman clip of one projected ring against an axis-aligned box. */
function clipRing(ring: Pt[], box: Box): Pt[] {
  const edges: Array<{ inside: (p: Pt) => boolean; intersect: (a: Pt, b: Pt) => Pt }> = [
    {
      inside: (p) => p.x >= box.x0,
      intersect: (a, b) => ({ x: box.x0, y: a.y + ((b.y - a.y) * (box.x0 - a.x)) / (b.x - a.x) }),
    },
    {
      inside: (p) => p.x <= box.x1,
      intersect: (a, b) => ({ x: box.x1, y: a.y + ((b.y - a.y) * (box.x1 - a.x)) / (b.x - a.x) }),
    },
    {
      inside: (p) => p.y >= box.y0,
      intersect: (a, b) => ({ x: a.x + ((b.x - a.x) * (box.y0 - a.y)) / (b.y - a.y), y: box.y0 }),
    },
    {
      inside: (p) => p.y <= box.y1,
      intersect: (a, b) => ({ x: a.x + ((b.x - a.x) * (box.y1 - a.y)) / (b.y - a.y), y: box.y1 }),
    },
  ];
  let output = ring;
  for (const edge of edges) {
    if (output.length === 0) break;
    const input = output;
    output = [];
    let prev = input[input.length - 1];
    for (const cur of input) {
      if (edge.inside(cur)) {
        if (!edge.inside(prev)) output.push(edge.intersect(prev, cur));
        output.push(cur);
      } else if (edge.inside(prev)) {
        output.push(edge.intersect(prev, cur));
      }
      prev = cur;
    }
  }
  return output;
}

function toPath(ringsXY: Pt[][]): string {
  const parts: string[] = [];
  for (const r of ringsXY) {
    if (r.length < 3) continue;
    let d = `M${r[0].x.toFixed(1)},${r[0].y.toFixed(1)}`;
    let last = r[0];
    for (let i = 1; i < r.length; i++) {
      const p = r[i];
      // Drop points that would not move the pen by a visible amount.
      if (Math.abs(p.x - last.x) < 0.15 && Math.abs(p.y - last.y) < 0.15) continue;
      d += `L${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      last = p;
    }
    parts.push(d + 'Z');
  }
  return parts.join('');
}

/**
 * Project a ring and unwrap it across the antimeridian: merged land polygons can
 * jump from lon 180 to -180, which would otherwise draw a band across the map.
 * Returns the unwrapped ring plus copies shifted by a full world width where needed.
 */
function projectRing(ring: Position[]): Pt[][] {
  const pts: Pt[] = [];
  let offset = 0;
  let prevX: number | null = null;
  let minX = Infinity;
  let maxX = -Infinity;
  for (const [lon, lat] of ring) {
    const p = project(lon, lat);
    if (prevX !== null) {
      const dx = p.x + offset - prevX;
      if (dx > MAP_W / 2) offset -= MAP_W;
      else if (dx < -MAP_W / 2) offset += MAP_W;
    }
    const x = p.x + offset;
    prevX = x;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    pts.push({ x, y: p.y });
  }
  const out: Pt[][] = [pts];
  if (minX < 0) out.push(pts.map((p) => ({ x: p.x + MAP_W, y: p.y })));
  if (maxX > MAP_W) out.push(pts.map((p) => ({ x: p.x - MAP_W, y: p.y })));
  return out;
}

function projectRings(topology: unknown, objectName: string): Pt[][] {
  const topo = topology as Topology;
  const obj = topo.objects[objectName] as GeometryCollection;
  const fc = feature(topo, obj) as FeatureCollection | Feature;
  return rings(fc).flatMap(projectRing);
}

/** Low-detail land for the whole world. */
export function worldLandPath(): string {
  return toPath(projectRings(land110, 'land'));
}

/** Higher-detail land, clipped to lon/lat boxes: [[lon0, lat0], [lon1, lat1]]. */
export function detailLandPath(boxesLonLat: Array<[[number, number], [number, number]]>): string {
  const all = projectRings(land50, 'land');
  const out: Pt[][] = [];
  for (const [[lon0, lat0], [lon1, lat1]] of boxesLonLat) {
    const a = project(lon0, lat1);
    const b = project(lon1, lat0);
    const box: Box = { x0: a.x, y0: a.y, x1: b.x, y1: b.y };
    for (const ring of all) {
      // Quick reject on bounding box.
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const p of ring) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      }
      if (maxX < box.x0 || minX > box.x1 || maxY < box.y0 || minY > box.y1) continue;
      const clipped = clipRing(ring, box);
      if (clipped.length >= 3) out.push(clipped);
    }
  }
  return toPath(out);
}

/** Graticule lines every `step` degrees, as one path. */
export function graticulePath(step = 30): string {
  const parts: string[] = [];
  for (let lon = -180; lon <= 180; lon += step) {
    const { x } = project(lon, 0);
    parts.push(`M${x.toFixed(1)},0V${MAP_H}`);
  }
  for (let lat = -90 + step; lat < 90; lat += step) {
    const { y } = project(0, lat);
    parts.push(`M0,${y.toFixed(1)}H${MAP_W}`);
  }
  return parts.join('');
}

/** A gently arced route between two projected points, bulging toward the pole. */
export function arcPath(a: Pt, b: Pt, bulge = 0.18): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 8) return `M${a.x.toFixed(1)},${a.y.toFixed(1)}L${b.x.toFixed(1)},${b.y.toFixed(1)}`;
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - Math.abs(dx) * bulge;
  return `M${a.x.toFixed(1)},${a.y.toFixed(1)}Q${mx.toFixed(1)},${my.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
}
