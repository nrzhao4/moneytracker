import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12">
            <h4>
              Welcome to {}
              <span style={{ fontFamily: "Pacifico" }}>
                Centsational Savings
              </span>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Track your expenses and start building your savings - one cent at
              a time
            </p>
            <br />
            <div className="col s4">
              <Link
                to="/register"
                style={{
                  width: "210px",
                  borderRadius: "12px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable pink darken-3"
              >
                Start Saving
              </Link>
            </div>
            <div className="col s4">
              <Link
                to="/signin"
                style={{
                  width: "210px",
                  borderRadius: "12px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-light teal lighten-4 black-text"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
