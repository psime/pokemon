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
        <span style={{ fontWeight: "bold", marginRight: 4 }}>Filter to:</span>

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

      <div className="pokemon-grid">
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

      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 100, paddingBottom: 48 }}>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", backgroundColor: "#24292e", color: "#fff", textDecoration: "none", transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </a>

        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", backgroundColor: "#0a66c2", color: "#fff", textDecoration: "none", transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </>
  );
}

export default App;
