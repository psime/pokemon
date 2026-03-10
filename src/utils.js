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
