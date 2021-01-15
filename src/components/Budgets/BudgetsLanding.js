import React, { Component } from "react";
import { Redirect } from "react-router-dom";

const budgetsUrl = "http://localhost:9000/api/budgets";
const transactionsUrl = "http://localhost:9000/api/transactions";

class BudgetsLanding extends Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
      budgets: null,
      transactions: null,
    };

    this.onAddBudget = this.onAddBudget.bind(this);
    this.getBudgets = this.getBudgets.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
  }

  componentDidMount() {
    this.getBudgets();
    this.getTransactions();
  }

  // Get budgets
  getBudgets() {
    fetch(budgetsUrl)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          budgets: data,
        })
      )
      .catch(function (err) {
        console.log(err);
      });
  }

  // Get transactions
  getTransactions() {
    fetch(transactionsUrl)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          transactions: data,
        })
      )
      .catch(function (err) {
        console.log(err);
      });
  }

  onAddBudget() {
    this.setState({
      redirect: "/budgets/add",
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if (this.state.budgets) {
      var budgets = this.state.budgets.map((budget, index) => {
        return (
          <div className="row" key={index}>
            <div className="col s12 m3">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{budget.budgetName}</span>
                  <p>{budget.description}</p>
                  <p>{budget.budgetType}</p>
                  <p>{budget.amount}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <a className="waves-effect waves-light btn" onClick={this.onAddBudget}>
          New Budget
        </a>
        <div>{budgets}</div>
      </div>
    );
  }
}

export default BudgetsLanding;
