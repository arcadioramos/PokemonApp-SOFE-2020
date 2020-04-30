import React from "react";
import "../styles/card.css";

const ListItem = ({ pokemon, onClick }) => (
  <div className="card-container pill hstack padding-16">
    <img
      className="pokemon-image bg-white pill"
      src={pokemon.sprites.front_default}
      alt="imagen-pokemon"
    />
    <div className="vstack card-text">
      <p>{pokemon.name}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
    </div>
    <div>
      <button
        className="btn-simple square"
        onClick={() => {
          onClick(pokemon);
        }}
      >
        REMOVE FROM BASKET
      </button>
    </div>
  </div>
);

export default ListItem;
