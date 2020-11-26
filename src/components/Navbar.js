import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper black">
            <Link
              to="/"
              style={{
                fontFamily: "Pacifico",
              }}
              className="col s5 brand-logo left white-text"
            >
              <i className="material-icons"></i>
              Centsational $avings
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
