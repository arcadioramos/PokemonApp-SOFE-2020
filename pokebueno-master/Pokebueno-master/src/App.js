import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Adoptions from "./components/Adoptions";
import Checkout from "./components/Checkout";
import Pokemons from "./components/Pokemons";
import Footer from "./components/Footer/Footer";

class App extends Component {
  state = {
    cart: [],
    adopted: []
  };

  componentDidMount() {
    let { cart, adopted } = this.state;

    cart = JSON.parse(localStorage.getItem("cart"));
    adopted = JSON.parse(localStorage.getItem("adopted"));

    this.setState({ cart, adopted });
  }

  handleOnUpdateCartMethod = cart => {
    this.setState({ cart });
  };

  handleOnUpdateAdoptedtMethod = adopted => {
    this.setState({ adopted });
  };

  myPokemon = () => {
    return (
      <React.Fragment>
        <Pokemons onUpdateCart={this.handleOnUpdateCartMethod} />
      </React.Fragment>
    );
  };

  myAdoptions = () => {
    return (
      <React.Fragment>
        <Adoptions />
      </React.Fragment>
    );
  };

  myCheckout = () => {
    return (
      <React.Fragment>
        <Checkout
          onUpdateCart={this.handleOnUpdateCartMethod}
          onUpdateAdopted={this.handleOnUpdateAdoptedtMethod}
        />
      </React.Fragment>
    );
  };

  render() {
    const { cart, adopted } = this.state;

    return (
      <React.Fragment>
        <NavBar cart={cart} adopted={adopted} />
        <Router>
          <Switch>
            <Route exact path="/" render={this.myPokemon} />
            <Route path="/homepage" render={this.myPokemon} />
            <Route path="/adoptions" render={this.myAdoptions} />
            <Route path="/checkout" render={this.myCheckout} />
          </Switch>
        </Router>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
