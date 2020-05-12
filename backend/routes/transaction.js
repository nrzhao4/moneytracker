const router = require("express").Router();
let Transaction = require("../models/transaction.model");

// GET all transactions
router.route("/").get((req, res) => {
  Transaction.find()
    .then(transactions => res.json(transactions))
    .catch(err => res.status(400).json("Error: " + err));
});

// POST transaction
router.route("/").post((req, res) => {
  const date = Date.parse(req.body.date);
  const description = req.body.description;
  const amount = Number(req.body.amount);
  const isSpending = req.body.isSpending;

  const newTransaction = new Transaction({
    date,
    description,
    amount,
    isSpending
  });

  newTransaction
    .save()
    .then(() => res.json("Transaction added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// GET one transaction
router.route("/:id").get((req, res) => {
  Transaction.findById(req.params.id)
    .then(transaction => res.json(transaction))
    .catch(err => res.status(400).json("Error: " + err));
});

// Edit trasaction
router.route("/:id").put((req, res) => {
  Transaction.findById(req.params.id)
    .then(transaction => {
      transaction.date = req.body.date;
      transaction.description = req.body.description;
      transaction.amount = req.body.amount;
      transaction.isSpending = req.body.isSpending;

      transaction
        .save()
        .then(() => res.json("Transaction updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// DELETE transaction
router.route("/:id").delete((req, res) => {
  Transaction.findByIdAndDelete(req.params.id)
    .then(() => res.json("Transaction deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
