const typeColors = {
  Grass: "#78C850",
  Fire: "#F08030",
  Water: "#6890F0",
  Electric: "#F8D030",
  Psychic: "#F85888",
  Ghost: "#705898",
  Dragon: "#7038F8",
  Fighting: "#C03028",
  Rock: "#B8A038",
  Normal: "#A8A878",
};

export const getTypeColor = (type) => typeColors[type] ?? "#888888";