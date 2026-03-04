import "./App.css";
import Card from "./Card.jsx";
import data from "./data.jsx";
import { getTypeColor } from "./utils.js";


function App() {



  return (
    <>
      <h1>Pokemon</h1>
      <h3>Gotta catch em all</h3>

      {/* {pokes} */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 16,
          padding: 16,
        }}
      >
        {data.map((d, i) => (
          <Card key={i} backgroundColor={getTypeColor(d.type)}>
            <h2>{d.name}</h2>
                <img 
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.id}.png`}
      alt={d.name}
      style={{ width: 120, height: 120 }}
    />
            <h3>{d.type}</h3>
            <span>HP: <strong>{d.hp}</strong></span>
            <br></br>
            <span>Attack: <strong>{d.attack}</strong></span>
          </Card>
        ))}
      </div>


    </>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// import Circle from './Circle.jsx'
// import Square from './Square.jsx'
// import { data } from './data.jsx';


  // const pokes = data.map((d) => {
  //   return d.id + ": " + d.name;
  // });
  // console.log(pokes);