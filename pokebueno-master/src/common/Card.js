import React from "react";
import "../styles/card.css";
import typeColors from "./TypeColors";

function Card({ pokemon, onClick, id, type }) {
  return (
    <div className="card-container">
      <div className="vsctack">
        <div className="card-image">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-image img-192"
          />
          <div className="card-title">{pokemon.name}</div>
          <div className="hstack padding-16 space-around">
            {pokemon.types.map(type => {
              return (
                <div
                  className="tag to-upper-case"
                  style={{ backgroundColor: typeColors[type.type.name] }}
                >
                  {type.type.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="vstack">
          <div className="hstack">
            <div className="padding-8">
              <p className="title">Weight</p>
              <p>{pokemon.weight}</p>
            </div>
            <div className="padding-8">
              <p className="title">Height</p>
              <p>{pokemon.height}</p>
            </div>
          </div>
          <div className="padding-8">
            <p className="title">Ability</p>
            <p className="to-upper-case">{pokemon.abilities[0].ability.name}</p>
          </div>

          {type === "pokemons" && (
            <div className="padding-16">
              <button
                type="button"
                className="btn-simple pill padding-16 title"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to take the responsability of taking care of this pokemon?"
                    )
                  )
                    onClick(pokemon);
                }}
              >
                Adopt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
