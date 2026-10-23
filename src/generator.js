import { FORGES } from "./words.js";

/** mulberry32 — tiny seeded PRNG so the same seed always forges the same names (shareable links). */
export function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pluralize(word) {
  if (/[^aeiou]y$/i.test(word)) return `${word.slice(0, -1)}ies`;
  if (/(?:s|x|z|ch|sh|[^aeiou]o)$/i.test(word)) return `${word}es`;
  if (/f$/i.test(word)) return `${word.slice(0, -1)}ves`;
  return `${word}s`;
}

export const newSeed = () => Math.floor(Math.random() * 1_000_000_000);

export function forgeNames(type, seed, count = 6) {
  const forge = FORGES[type];
  if (!forge) throw new RangeError(`Unknown forge type: ${type}`);
  const random = seededRandom(seed);
  const pick = (list) => list[Math.floor(random() * list.length)];
  const names = new Set();
  // Bounded loop: word lists are small, so duplicates are possible — never spin forever.
  for (let attempts = 0; names.size < count && attempts < count * 20; attempts++) {
    const name = pick(forge.patterns).replace(/\{(\w+)(?::(plural))?\}/g, (_, slot, plural) => {
      const word = pick(forge[slot]);
      return plural ? pluralize(word) : word;
    });
    names.add(name);
  }
  return [...names];
}

/** Parse a seed from user input; fall back to a fresh one for anything that isn't a sane integer. */
export function parseSeed(value) {
  const seed = Number(value);
  return Number.isInteger(seed) && seed >= 0 && seed < 2 ** 32 ? seed : newSeed();
}
