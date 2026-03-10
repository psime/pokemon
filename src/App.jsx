import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card.jsx";
import data from "./data.jsx";
import { getTypeColor } from "./utils.js";
import Bars from "./Bars.jsx";

const SORT_OPTIONS = ["Name", "Type", "Hit Points", "Attack"];

function App() {
  const uniqueTypes = [...new Set(data.map((p) => p.type))];
  const [filterSelected, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState("Name");
  const [sortOrder, setSortOrder] = useState("Descending");
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem("pokemon-favourites");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem("pokemon-favourites", JSON.stringify([...favourites]));
  }, [favourites]);

  const toggleFavourite = (id) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleType = (type) => {
    setSelectedTypes((sofar) =>
      sofar.includes(type) ? sofar.filter((t) => t !== type) : [...sofar, type],
    );
  };

  const showOrderToggle = sortBy === "Hit Points" || sortBy === "Attack";

  const filteredList = (() => {
    const filtered = data.filter((p) => {
      const typeMatch = filterSelected.length === 0 || filterSelected.includes(p.type);
      const favMatch = !showFavouritesOnly || favourites.has(p.id);
      return typeMatch && favMatch;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "Name") return a.name.localeCompare(b.name);
      if (sortBy === "Type") {
        const typeCmp = a.type.localeCompare(b.type);
        return typeCmp !== 0 ? typeCmp : a.name.localeCompare(b.name);
      }
      const key = sortBy === "Hit Points" ? "hp" : "attack";
      const dir = sortOrder === "Ascending" ? 1 : -1;
      return (a[key] - b[key]) * dir;
    });
  })();

  return (
    <>
      <h1>Pokemon</h1>
      <h3 style={{ margin: "-8px 0 16px", fontStyle: "italic", fontWeight: "normal" }}>Which one will you catch?</h3>

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: "0 16px 16px" }}>
        <span style={{ fontWeight: "bold", marginRight: 4 }}>Filter by:</span>

        <button
          onClick={() => setSelectedTypes([])}
          style={{
            backgroundColor: filterSelected.length === 0 ? "#555" : "#eee",
            border: filterSelected.length === 0 ? "2px solid #000" : "2px solid #aaa",
            borderRadius: 20,
            padding: "4px 14px",
            cursor: "pointer",
            fontWeight: filterSelected.length === 0 ? "bold" : "normal",
            color: filterSelected.length === 0 ? "#fff" : "#333",
            outline: "none",
          }}
        >
          All
        </button>

        {[...uniqueTypes].sort((a, b) => a.localeCompare(b)).map((type) => {
          const selected = filterSelected.includes(type);
          return (
            <button
              key={type}
              onClick={() => toggleType(type)}
              style={{
                backgroundColor: selected ? getTypeColor(type) : "#eee",
                border: selected ? "2px solid #000" : "2px solid " + getTypeColor(type),
                borderRadius: 20,
                padding: "4px 14px",
                cursor: "pointer",
                fontWeight: selected ? "bold" : "normal",
                color: selected ? "#fff" : "#333",
                outline: "none",
              }}
            >
              {type}
            </button>
          );
        })}

        <button
          onClick={() => setShowFavouritesOnly((v) => !v)}
          style={{
            backgroundColor: showFavouritesOnly ? "#555" : "#eee",
            border: showFavouritesOnly ? "2px solid #000" : "2px solid #aaa",
            borderRadius: 20,
            padding: "4px 10px",
            cursor: "pointer",
            outline: "none",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Filter favourites"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={showFavouritesOnly ? "red" : "none"} stroke={showFavouritesOnly ? "red" : "#555"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {favourites.size > 0 && (
          <button
            onClick={() => setFavourites(new Set())}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, lineHeight: 1, outline: "none", display: "flex", alignItems: "center" }}
            aria-label="Clear all favourites"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="none" stroke="#555" strokeWidth="2"/>
              <line x1="8" y1="8" x2="16" y2="16" stroke="black" strokeWidth="2.5"/>
              <line x1="16" y1="8" x2="8" y2="16" stroke="black" strokeWidth="2.5"/>
            </svg>
          </button>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: "0 16px 16px" }}>
        <span style={{ fontWeight: "bold", marginRight: 4 }}>Sort by:</span>
        {SORT_OPTIONS.map((option) => {
          const selected = sortBy === option;
          return (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              style={{
                backgroundColor: selected ? "#555" : "#eee",
                border: selected ? "2px solid #000" : "2px solid #aaa",
                borderRadius: 20,
                padding: "4px 14px",
                cursor: "pointer",
                fontWeight: selected ? "bold" : "normal",
                color: selected ? "#fff" : "#333",
                outline: "none",
              }}
            >
              {option}
            </button>
          );
        })}

        {showOrderToggle && (
          <>
            <span style={{ fontWeight: "bold", marginLeft: 16, marginRight: 4 }}>Order:</span>
            {["Ascending", "Descending"].map((option) => {
              const selected = sortOrder === option;
              return (
                <button
                  key={option}
                  onClick={() => setSortOrder(option)}
                  style={{
                    backgroundColor: selected ? "#555" : "#eee",
                    border: selected ? "2px solid #000" : "2px solid #aaa",
                    borderRadius: 20,
                    padding: "4px 14px",
                    cursor: "pointer",
                    fontWeight: selected ? "bold" : "normal",
                    color: selected ? "#fff" : "#333",
                    outline: "none",
                  }}
                >
                  {option}
                </button>
              );
            })}
          </>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridAutoRows: "250px",
          gap: 16,
          padding: 16,
        }}
      >
        {filteredList.map((d, i) => {
          const isFav = favourites.has(d.id);
          return (
            <div key={i} style={{ position: "relative" }}>
              <Card backgroundColor={getTypeColor(d.type)}>
                <h2 style={{ margin: "0 0 4px", fontSize: "1.125rem", lineHeight: "1.4", flexShrink: 0, textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>{d.name}</h2>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.id}.png`}
                  alt={d.name}
                  style={{ width: 96, height: 96 }}
                />
                <h3 style={{ margin: "4px 0", fontSize: "0.85rem" }}>{d.type}</h3>
                <Bars hp={d.hp} attack={d.attack} />
              </Card>
              <button
                onClick={() => toggleFavourite(d.id)}
                style={{ position: "absolute", top: 6, right: 8, background: "none", border: "none", cursor: "pointer", padding: 2, lineHeight: 1, zIndex: 1, outline: "none" }}
                aria-label={isFav ? "Unfavourite" : "Favourite"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isFav ? "red" : "none"} stroke={isFav ? "red" : "#555"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
