import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const apiUrl = "http://localhost:9000/api/budgets";

class AddBudget extends Component {
  constructor() {
    super();
    this.state = {
      budgetName: "",
      budgetType: "month",
      description: "",
      amount: 0,
      redirect: null,
    };
    this.onChangeBudgetName = this.onChangeBudgetName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeBudgetType = this.onChangeBudgetType.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeBudgetName(e) {
    this.setState({
      ...this.state,
      budgetName: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      ...this.state,
      description: e.target.value,
    });
  }

  onChangeBudgetType(e) {
    this.setState({
      ...this.state,
      budgetType: e.target.value,
    });
  }

  onChangeAmount(e) {
    this.setState({
      ...this.state,
      amount: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const budget = {
      budgetName: this.state.budgetName,
      description: this.state.description,
      budgetType: this.state.budgetType,
      amount: this.state.amount,
    };
    console.log(budget);
    axios.post(apiUrl, budget).then(
      this.setState({
        redirect: "/budgets",
      })
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="row">
        <form className="col s4 offset-s4" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="budget_name"
                type="text"
                onChange={this.onChangeBudgetName}
                value={this.state.budgetName}
              />
              <label htmlFor="budget_name">Budget Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="description"
                type="text"
                onChange={this.onChangeDescription}
                value={this.state.description}
              />
              <label htmlFor="description">Budget Description</label>
            </div>
            <div className="row">
              <label>Budget Type</label>
              <div className="input-field col s12">
                <select
                  className="browser-default"
                  value={this.state.budgetType}
                  onChange={this.onChangeBudgetType}
                >
                  <option value="month">Monthly</option>
                  <option value="annual">Annually</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="amount"
                  type="text"
                  onChange={this.onChangeAmount}
                  value={this.state.amount}
                />
                <label htmlFor="amount">Amount</label>
              </div>
            </div>
            <button
              className="btn waves-effect waves-light"
              onClick={this.onSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddBudget;
