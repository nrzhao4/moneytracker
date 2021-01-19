import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class AddTransaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      description: "",
      transactionType: "spending",
      amount: "",
      isSpending: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeTransactionType = this.onChangeTransactionType.bind(this);
  }

  onChangeDate(date) {
    this.setState({
      ...this.state,
      date: date,
    });
  }

  onChangeDescription(e) {
    this.setState({
      ...this.state,
      description: e.target.value,
    });
  }

  onChangeAmount(e) {
    this.setState({
      ...this.state,
      amount: e.target.value,
    });
  }

  onChangeTransactionType(e) {
    this.setState({
      ...this.state,
      transactionType: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var spending;
    if (this.state.transactionType == "spending") {
      spending = true;
    }

    const transaction = {
      date: this.state.date,
      description: this.state.description,
      amount: this.state.amount,
      isSpending: spending,
    };

    this.props.onAddTransaction(transaction);
  }

  render() {
    return (
      <div className="row">
        <form className="col s6 offset-s2" onSubmit={this.onSubmit}>
          <div className="row">
            <h5>New Transaction</h5>
          </div>
          <div className="row">
            <div className="col s12">
              <label>Date: </label>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label>Description: </label>
              <input
                type="text"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>
          </div>
          <div className="row">
            <label>Transaction type</label>
            <div className="input-field col s12">
              <select
                className="browser-default"
                value={this.state.transactionType}
                onChange={this.onChangeTransactionType}
              >
                <option value="spending">Spending</option>
                <option value="saving">Saving</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label>Amount</label>
              <input
                type="text"
                value={this.state.amount}
                onChange={this.onChangeAmount}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <button
                className="button-secondary"
                onClick={this.props.onCancelEdit}
              >
                Cancel
              </button>
              <button className="button-primary" onClick={this.onSubmit}>
                Add this transaction
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTransaction;
