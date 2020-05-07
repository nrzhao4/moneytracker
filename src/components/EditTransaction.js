import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class EditTransaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      description: "",
      amount: 0,
      isSpending: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
  }

  onChangeDate(date) {
    this.setState({
      ...this.state,
      date: date
    });
  }

  onChangeDescription(e) {
    this.setState({
      ...this.state,
      description: e.target.value
    });
  }

  onChangeAmount(e) {
    this.setState({
      ...this.state,
      amount: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var spending = false;

    if (Math.sign(this.state.amount) === -1) {
      spending = true;
    }

    const transaction = {
      date: this.state.date,
      description: this.state.description,
      amount: this.state.amount,
      isSpending: spending
    };

    this.props.onAddTransaction(transaction);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <h3>Edit Transaction</h3>
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              value={this.props.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>
              Amount (enter a NEGATIVE number if you SPENT money, POSITIVE if
              you GAINED money):{" "}
            </label>
            <input
              type="text"
              value={this.props.amount}
              onChange={this.onChangeAmount}
            />
          </div>
          <div className="form-group">
            <div className="flexrow">
              <div
                style={{
                  width: "50%",
                  margin: "4px"
                }}
              >
                <button
                  onClick={this.props.onCancelEdit}
                  className="button-secondary"
                >
                  Cancel
                </button>
              </div>
              <div style={{ width: "50%", margin: "8px" }}>
                <input type="submit" value="Done" className="button-primary" />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditTransaction;