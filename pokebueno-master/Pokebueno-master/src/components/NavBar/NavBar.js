import React, { Component } from "react";
import "../../styles/navbar.css";
import "../../styles/main.css";
import bars from "../../images/icons/bars-solid.svg";

export default class NavBar extends Component {
  state = {
    cart: this.props.cart,
    adopted: this.props.adopted,
    toggle: false
  };

  Toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  async componentDidMount() {
    let { adopted, cart } = this.state;

    if (localStorage.getItem("adopted")) {
      adopted = JSON.parse(localStorage.getItem("adopted"));
    }

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    this.setState({ adopted, cart });
  }

  handleOnUpdateCartMethod = cart => {
    this.setState({ cart });
  };

  handleOnUpdateAdoptedtMethod = adopted => {
    this.setState({ adopted });
  };

  render() {
    const { cart, adopted } = this.state;

    const numberOfItems = cart.length;
    const numberOfAdopted = adopted.length;

    return (
      <React.Fragment>
        <div className="hstack navbar">
          <div className="logo-container">
            <img
              href="/homepage"
              className="logo"
              alt="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
            />
          </div>
          <div className="bar-menu">
            <button onClick={this.Toggle}>
              <img src={bars} alt="bar icon" className="menu-bar-icon" />
            </button>
          </div>
          <div
            className={
              this.state.toggle
                ? "vstack collapse-menu show"
                : "hstack collapse-menu"
            }
          >
            <div className="links-container">
              <ul className="hstack list">
                <li className="padding-16">
                  <a href="/homepage" className="link">
                    Pokemons
                  </a>
                </li>
                <li className="padding-16">
                  <a href="/adoptions" className="notification link hstack">
                    <span className="padding-16 pill">Adoptions</span>
                    <span className="badge">{numberOfAdopted}</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="checkout-container">
              <div className="hstack">
                <a href="/checkout" className="notification link hstack">
                  <span className="padding-16 pill">Checkout</span>
                  <span className="badge">{numberOfItems}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
