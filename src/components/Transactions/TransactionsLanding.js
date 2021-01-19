import React from "react";
import Transactions from "./Transactions";
import AddTransaction from "./AddTransaction";
import EditTransaction from "./EditTransaction";
import axios from "axios";

const apiUrl = "http://localhost:9000/api/transactions";

class TransactionsLanding extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      showAddTransaction: false,
      showEditTransaction: false,
      showTransactionTable: true,
    };

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onAddTransaction = this.onAddTransaction.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.onDeleteTransaction = this.onDeleteTransaction.bind(this);
    this.onEditTransaction = this.onEditTransaction.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
  }

  // Get transactions from the API
  getTransactions() {
    fetch(apiUrl)
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

  // Show add transaction modal when clicked
  onAddButtonClick() {
    this.setState((prevState) => ({
      showAddTransaction: !prevState.showAddTransaction,
      showTransactionTable: false,
    }));
  }

  // Post the new transaction, get transactions from API to update table
  async onAddTransaction(transaction) {
    await axios.post(apiUrl, transaction).then(
      this.setState((prevState) => ({
        showAddTransaction: !prevState.showAddTransaction,
        showTransactionTable: !prevState.showTransactionTable,
      }))
    );
    this.getTransactions();
  }

  onDeleteTransaction(id, i) {
    // Delete transaction by id
    fetch(`${apiUrl}/${id}`, {
      method: "delete",
    })
      .then((response) => response.json())
      .then(() => {
        var newTransactions = [...this.state.transactions]; // Create copy of transactions
        newTransactions.splice(i, 1); // Remove deleted transaction
        this.setState({ transactions: newTransactions }); // Set state to new transactions
      })
      .catch((err) => {
        console.log(err);
      });
    this.getTransactions();
  }

  // When user clicks the Edit button
  onEditTransaction(id) {
    fetch(`${apiUrl}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          showEditTransaction: true,
          showAddTransaction: false,
          showTransactionTable: false,
          transactionToEdit: {
            id: id,
            date: data.date,
            description: data.description,
            amount: data.amount,
            isSpending: data.isSpending,
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // When user finishes editing a transaction
  async onSubmitEdit(id, transaction) {
    await axios.put(`${apiUrl}/${id}`, transaction).then(
      this.setState((prevState) => ({
        showEditTransaction: false,
        showTransactionTable: true,
        showAddTransaction: false,
        transactionToEdit: {},
      }))
    );
    this.getTransactions();
  }

  onCancelEdit() {
    this.setState({
      showEditTransaction: false,
      showAddTransaction: false,
      showTransactionTable: true,
      transactionToEdit: {},
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="row">
        <div className="col s10 offset-s1">
          <h3>Your Transactions</h3>
          {!this.state.showAddTransaction && !this.state.showEditTransaction ? (
            <button
              onClick={this.onAddButtonClick}
              className="button-primary"
              style={{ width: "50%%" }}
            >
              Add Transaction
            </button>
          ) : null}
          <div className="card">
            {this.state.showAddTransaction ? (
              <AddTransaction
                onAddTransaction={this.onAddTransaction}
                onCancelEdit={this.onCancelEdit}
              />
            ) : null}
            {this.state.showEditTransaction ? (
              <EditTransaction
                transaction={this.state.transactionToEdit}
                onCancelEdit={this.onCancelEdit}
                onSubmitEdit={this.onSubmitEdit}
              />
            ) : null}
          </div>
          <div className="transaction-table">
            {this.state.showTransactionTable ? (
              <Transactions
                transactions={this.state.transactions}
                onDelete={this.onDeleteTransaction}
                onEdit={this.onEditTransaction}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionsLanding;
