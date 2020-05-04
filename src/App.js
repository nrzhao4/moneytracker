import React from "react";
import Transactions from "./components/Transactions";
import AddTransaction from "./components/AddTransaction";
import axios from "axios";

const apiUrl = "http://localhost:9000/transactions";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      showAddTransaction: false,
      id: 1
    };

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onAddTransaction = this.onAddTransaction.bind(this);
  }

  onAddButtonClick() {
    this.setState(prevState => ({
      showAddTransaction: !prevState.showAddTransaction
    }));
  }

  onAddTransaction(transaction) {
    axios.post(apiUrl, transaction).then(
      this.setState(prevState => ({
        showAddTransaction: !prevState.showAddTransaction,
        id: prevState.id + 1
      }))
    );
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.showAddTransaction ? (
          <AddTransaction onAddTransaction={this.onAddTransaction} />
        ) : (
          <button onClick={this.onAddButtonClick}>Add Transaction</button>
        )}
        <Transactions key={this.state.id} />
      </div>
    );
  }
}

export default App;
