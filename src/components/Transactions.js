import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const apiUrl = "http://localhost:9000/transactions";

class Transactions extends React.Component {
  constructor() {
    super();

    this.state = {
      transactions: []
    };

    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    // Get transactions
    fetch(apiUrl)
      .then(response => response.json())
      .then(data =>
        this.setState({
          transactions: data
        })
      )
      .catch(function (err) {
        console.log(err);
      });
  }

  onDelete(id, i) {
    // Delete transaction by id
    fetch(`${apiUrl}/${id}`, {
      method: "delete"
    })
      .then(response => response.json())
      .then(() => {
        var newTransactions = [...this.state.transactions]; // Create copy of transactions
        newTransactions.splice(i, 1); // Remove deleted transaction
        this.setState({ transactions: newTransactions }); // Set state to new transactions
      })
      .catch(err => {
        console.log(err);
      });
  }

  calculateTotal() {
    var sum = 0;
    for (var i = 0; i < this.state.transactions.length; i++) {
      if (this.state.transactions[i].isSpending) {
        sum += this.state.transactions[i].amount;
      } else {
        sum -= this.state.transactions[i].amount;
      }
    }
    return sum;
  }

  render() {
    return (
      <div>
        <h2>Transactions</h2>
        <div>
          <h3>Total spending: {this.calculateTotal()}</h3>
        </div>
        <TableContainer component={Paper}>
          <Table className={makeStyles.table} aria-label="transactions table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.transactions.map((data, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {data.date.substring(0, 10)}
                  </TableCell>
                  <TableCell align="left">{data.description}</TableCell>
                  <TableCell align="left">{data.amount}</TableCell>
                  <TableCell align="left">
                    <button onClick={() => this.onDelete(data._id, i)}>
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default Transactions;
