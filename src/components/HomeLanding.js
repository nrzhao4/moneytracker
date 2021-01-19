import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class HomeLanding extends Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
    };
    this.onClickTransactions = this.onClickTransactions.bind(this);
    this.onClickBudgets = this.onClickBudgets.bind(this);
  }

  onClickTransactions() {
    console.log("clicked transactions");
    this.setState({
      redirect: "/transactions",
    });
  }

  onClickBudgets() {
    console.log("clicked budgets");
    this.setState({
      redirect: "/budgets",
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <div>
          <h2 className="center">Welcome to Centsational Savings</h2>
        </div>
        <div className="flexrow">
          <button
            className="button-primary"
            onClick={this.onClickTransactions}
            style={{ width: "10%", margin: "8px" }}
          >
            View your transactions
          </button>
          <button
            className="button-primary"
            onClick={this.onClickBudgets}
            style={{ width: "10%", margin: "8px" }}
          >
            View your budgets
          </button>
        </div>
      </div>
    );
  }
}

export default HomeLanding;
