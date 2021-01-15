import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeLanding from "./components/HomeLanding";
import Navbar from "./components/Navbar";
import TransactionsLanding from "./components/Transactions/TransactionsLanding";
import BudgetsLanding from "./components/Budgets/BudgetsLanding";
import AddBudget from "./components/Budgets/AddBudget";

const apiUrl = "http://localhost:9000/api/transactions";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Route exact path="/" component={HomeLanding} />
        <Route exact path="/transactions" component={TransactionsLanding} />
        <Route exact path="/budgets" component={BudgetsLanding} />
        <Route exaxt path="/budgets/add" component={AddBudget} />
      </Router>
    );
  }
}

export default App;
