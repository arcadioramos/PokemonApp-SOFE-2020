import React, { Component } from "react";
import PokeApi from "../../services/PokeApi";
import Card from "../../common/Card";
import "../../styles/pokemons.css";
import "../../styles/card.css";

export default class Pokemons extends Component {
  state = {
    pokemonData: [],
    cart: [],
    nextURL: "",
    prevURL: "",
    initialURL: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9"
  };

  async componentDidMount() {
    let { cart, nextURL, prevURL } = this.state;
    const { initialURL } = this.state;

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      this.props.onUpdateCart(cart);
    }

    if (
      localStorage.getItem("url") &&
      localStorage.getItem("adopting") === "true"
    ) {
      let response = await PokeApi.getAllPokemon(localStorage.getItem("url"));
      await this.loadPokemons(response.results);
      nextURL = response.next;
      prevURL = response.previous;
      localStorage.setItem("adopting", false);
    } else {
      let response = await PokeApi.getAllPokemon(initialURL);
      await this.loadPokemons(response.results);
      nextURL = response.next;
      prevURL = response.previous;
      localStorage.setItem("url", initialURL);
    }

    this.setState({ cart, nextURL, prevURL });
  }

  loadPokemons = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await PokeApi.getPokemon(pokemon);

        delete pokemonRecord.moves;
        delete pokemonRecord.species;
        delete pokemonRecord.stats;
        delete pokemonRecord.forms;
        delete pokemonRecord.game_indices;
        delete pokemonRecord.held_items;

        return pokemonRecord;
      })
    );

    this.setState({ pokemonData: _pokemonData });
  };

  handleAdopt = (pokemon, confirm) => {
    const { cart } = this.state;

    let newPokemon = { ...pokemon };

    newPokemon.id = newPokemon.id + "_" + this.randomID();

    try {
      cart.push(newPokemon);
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("adopting", true);
      this.props.onUpdateCart(cart);
      window.location.reload();
    } catch (err) {
      alert("Cart limit exceeded");
    }

    this.setState({ cart });
  };

  randomID = () => {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  };

  nextPage = async () => {
    let { nextURL, prevURL } = this.state;

    localStorage.setItem("url", nextURL);

    let response = await PokeApi.getAllPokemon(nextURL);
    await this.loadPokemons(response.results);

    nextURL = response.next;
    prevURL = response.previous;

    window.scrollTo(0, 0);

    this.setState({ nextURL, prevURL });
  };

  prevPage = async () => {
    let { nextURL, prevURL } = this.state;

    localStorage.setItem("url", prevURL);

    let response = await PokeApi.getAllPokemon(prevURL);
    await this.loadPokemons(response.results);

    nextURL = response.next;
    prevURL = response.previous;

    window.scrollTo(0, 0);

    this.setState({ nextURL, prevURL });
  };

  render() {
    const { pokemonData } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div className="vstack">
            <h1 className="pokemons-title">Adopt a Pokemon</h1>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return (
                  <Card
                    key={i + pokemon.name}
                    id={i + pokemon.name}
                    pokemon={pokemon}
                    type={"pokemons"}
                    onClick={this.handleAdopt}
                  />
                );
              })}
            </div>
            <div className="hstack padding-16">
              <div className="padding-16">
                <button
                  className="btn-simple pill padding-16"
                  onClick={this.prevPage}
                >
                  Prev
                </button>
              </div>
              <div className="padding-16">
                <button
                  className="btn-simple pill padding-16"
                  onClick={this.nextPage}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
