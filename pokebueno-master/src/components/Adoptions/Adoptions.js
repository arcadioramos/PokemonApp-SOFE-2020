import React, { Component } from "react";
import Card from "../../common/Card";

export default class Adoptions extends Component {
  state = {
    adopted: []
  };

  componentDidMount() {
    let { adopted } = this.state;

    adopted = JSON.parse(localStorage.getItem("adopted"));

    this.setState({ adopted });
  }

  render() {
    const { adopted } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div className="vstack">
            {adopted ? (
              <h1 className="pokemons-title">Your friends!</h1>
            ) : (
              <h1 className="pokemons-title">
                You dont have any friends yet :(
              </h1>
            )}
            <div className="grid-container">
              {!!adopted &&
                adopted.map((pokemon, i) => {
                  return (
                    <Card
                      key={i + pokemon.name}
                      id={i + pokemon.name}
                      pokemon={pokemon}
                      type={"adoptions"}
                      onClick={this.handleAdopt}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
