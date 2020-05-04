import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function Transactions(props) {
  return (
    <div>
      <h2>Transactions</h2>
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
            {props.transactions.map((data, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {data.date.substring(0, 10)}
                </TableCell>
                <TableCell align="left">{data.description}</TableCell>
                <TableCell align="left">{data.amount}</TableCell>
                <TableCell align="left">
                  <button onClick={() => props.onDelete(data._id, i)}>
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

export default Transactions;
