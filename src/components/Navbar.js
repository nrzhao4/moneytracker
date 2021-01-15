import React from "react";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="z-depth-0">
        <div className="nav-wrapper black">
          <a href="/" className="brand-logo right">
            Centsational Savings
          </a>
          <ul className="left">
            <li>
              <a href="/transactions">Transactions</a>
            </li>
            <li>
              <a href="/budgets">Budgets</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
