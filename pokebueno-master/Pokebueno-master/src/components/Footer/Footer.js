import React, { Component } from "react";
import "../../styles/main.css";
import "../../styles/footer.css";
import nearsoft from "../../images/nearsoft.png";

export default class Footer extends Component {
  render() {
    return (
      <footer className="hstack footer">
        <img
          src={nearsoft}
          alt="Nearsoft Logo"
          className="nearsoft-logo padding-16"
        />
      </footer>
    );
  }
}
