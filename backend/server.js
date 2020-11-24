const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

// Connect to MongoDB database
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    console.log(err);
  });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

// Routes
const transactionRouter = require("./routes/transaction");
const usersRouter = require("./routes/users");
app.use("/api/transactions", transactionRouter);
app.use("/api/users", usersRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
