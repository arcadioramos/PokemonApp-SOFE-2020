import React, { Component } from "react";
import ListItem from "../../common/ListItem";

export default class Checkout extends Component {
  state = {
    cart: []
  };

  componentDidMount() {
    let { cart } = this.state;

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      cart = [];
    }

    this.setState({ cart });
  }

  removeFromCart = pokemon => {
    const { cart } = this.state;

    for (const item of cart) {
      if (item.id === pokemon.id) {
        cart.splice(cart.indexOf(item), 1);
        window.location.href = "/checkout";
      }
    }

    this.props.onUpdateCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    this.setState({ cart });
  };

  submit = () => {
    let { cart } = this.state;

    let adoptedList = JSON.parse(localStorage.getItem("adopted"));

    if (adoptedList) {
      const newAdoptedList = adoptedList.concat(cart);
      adoptedList = newAdoptedList;
    } else {
      const newAdoptedList = cart;
      adoptedList = newAdoptedList;
    }

    localStorage.setItem("adopted", JSON.stringify(adoptedList));

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.props.onUpdateCart(cart);
    this.props.onUpdateAdopted(JSON.parse(localStorage.getItem("adopted")));
    window.location.href = "/adoptions";

    this.setState({ cart });
  };

  render() {
    const { cart } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div className="vstack">
            {cart.length > 0 ? (
              <h1 className="pokemons-title">Checkout</h1>
            ) : (
              <h1 className="pokemons-title">
                Oops, there's not any pokemon in your cart!
              </h1>
            )}
            <div className="vstack">
              {cart.map((pokemon, i) => {
                return (
                  <div>
                    <ListItem
                      key={i + pokemon.name}
                      id={i + pokemon.name}
                      pokemon={pokemon}
                      onClick={this.removeFromCart}
                    />
                    <br />
                  </div>
                );
              })}
            </div>
            <div className="btn-adopt padding-16" />
            {cart.length > 0 && (
              <button
                className="btn-simple padding-16"
                onClick={() => {
                  if (window.confirm("Are you sure you want to adopt'em?"))
                    this.submit();
                }}
              >
                Adopt 'em
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
