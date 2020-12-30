const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

const transactionRouter = require("./routes/transaction");
app.use("/api/transactions", transactionRouter);

const budgetRouter = require("./routes/budget");
app.use("/api/budgets", budgetRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
