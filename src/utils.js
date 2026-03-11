import TypeColours from "./TypeColours.jsx";

// Original colour palette (backup — kept for reference)
// const typeColors = {
//   Grass: "#78C850",
//   Fire: "#F08030",
//   Water: "#6890F0",
//   Electric: "#F8D030",
//   Psychic: "#F85888",
//   Ghost: "#705898",
//   Dragon: "#7038F8",
//   Fighting: "#C03028",
//   Rock: "#B8A038",
//   Normal: "#A8A878",
// };


// New colour paltte pre any changes
// const TypeColours = {
// 	normal: '#A8A77A',
// 	fire: '#EE8130',
// 	water: '#6390F0',
// 	electric: '#F7D02C',
// 	grass: '#7AC74C',
// 	ice: '#96D9D6',
// 	fighting: '#C22E28',
// 	poison: '#A33EA1',
// 	ground: '#E2BF65',
// 	flying: '#A98FF3',
// 	psychic: '#F95587',
// 	bug: '#A6B91A',
// 	rock: '#B6A136',
// 	ghost: '#735797',
// 	dragon: '#6F35FC',
// 	dark: '#705746',
// 	steel: '#B7B7CE',
// 	fairy: '#D685AD',
// };



// TypeColours uses lowercase keys; data types are title-cased, so we lowercase before lookup
export const getTypeColor = (type) => TypeColours[type.toLowerCase()] ?? "#888888";

// ── Alpha config ─────────────────────────────────────────────
// Adjust these values to control background transparency per element and mode
export const alphaConfig = {
  pill:     { light: 0.1,  dark: 0.15 },
  card:     { light: 0.27, dark: 0.75 },
  barTrack: { light: 0.12, dark: 0.25 },
};

// ── Bar radius ────────────────────────────────────────────────
// Controls right-side corner rounding on both tracks and filled bars (left corners always square)
// Use a plain number for px (e.g. 4.5) or a quoted string for % (e.g. "50%")
export const barRadius = 4.5;
// ─────────────────────────────────────────────────────────────

// ── Card hover config ─────────────────────────────────────────
export const hoverConfig = {
  transitionMs:    600,  // hover-in duration in milliseconds
  transitionOutMs: 1800, // hover-out fade duration in milliseconds
  imageScale:      2.1,  // how much the sprite grows (1.0 = no change)
  imageRiseY:      22,   // px shift (positive = down, negative = up)
};
// ─────────────────────────────────────────────────────────────

// ── Bar track grey reference (saved for comparison) ──────────
// border: "1px solid rgba(80,80,80,0.6)", padding: 1
// track bg: "rgba(90,90,90,0.45)"
// ─────────────────────────────────────────────────────────────

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getPillTypeColor     = (type, isDark) => hexToRgba(getTypeColor(type), isDark ? alphaConfig.pill.dark     : alphaConfig.pill.light);
export const getCardTypeColor     = (type, isDark) => hexToRgba(getTypeColor(type), isDark ? alphaConfig.card.dark     : alphaConfig.card.light);
export const getBarTrackColor     = (type, isDark) => hexToRgba(getTypeColor(type), isDark ? alphaConfig.barTrack.dark : alphaConfig.barTrack.light);
