import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class Transactions extends React.Component {
  constructor() {
    super();

    this.state = {
      transactions: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/transactions")
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

  render() {
    return (
      <div>
        <h2>Transactions</h2>
        <TableContainer component={Paper}>
          <Table className={makeStyles.table} aria-label="transactions table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell alight="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.transactions.map(data => (
                <TableRow key={data.id}>
                  <TableCell component="th" scope="row">
                    {data.date}
                  </TableCell>
                  <TableCell align="right">{data.description}</TableCell>
                  <TableCell alight="right">{data.amount}</TableCell>
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
