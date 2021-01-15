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

  // filter transactions between certain dates
  getTransactionsBetweenDates(budgetType) {
    var start;
    var end;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    // if monthly budget, get transactions form current month
    // if annual budget, get transactions from current year
    if (budgetType === "month") {
      var currentMonth = currentDate.getMonth() + 1;
      var getDays = () => {
        return new Date(currentYear, currentMonth, 0).getDate();
      };
      start = new Date(`${currentYear}-${currentMonth}-01`);
      end = new Date(`${currentYear}-${currentMonth}-${getDays()}`);
    } else {
      start = new Date(`${currentYear}-01-01`);
      end = new Date(`${currentYear}-12-31`);
    }
    var transactions = this.state.transactions;
    var results = [];

    if (transactions) {
      transactions.forEach((transaction) => {
        if (transaction.isSpending) {
          var date = new Date(transaction.date);
          if (date >= start && date <= end) {
            results.push(transaction);
          }
        }
      });
    }
    return results;
  }

  // given a budget, calculate how much has been spent and how much budget is remaining
  getBudgetRemaining(budget) {
    const amount = budget.amount;
    const transactions = this.getTransactionsBetweenDates(budget.budgetType);
    var spent = 0;
    transactions.forEach((transaction) => {
      spent += transaction.amount;
    });
    const remaining = amount + spent;
    return remaining;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if (this.state.budgets) {
      this.getTransactionsBetweenDates("month");
      var budgets = this.state.budgets.map((budget, index) => {
        return (
          <div className="col s4 m3" key={index}>
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{budget.budgetName}</span>
                <p>{budget.description}</p>
                <p>{budget.budgetType}</p>
                <p>{this.getBudgetRemaining(budget)}</p>
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
        <div className="row">{budgets}</div>
      </div>
    );
  }
}

export default BudgetsLanding;
