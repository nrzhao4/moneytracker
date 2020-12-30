const router = require("express").Router();
let Budget = require("../models/budget.model");

// GET all budgets
router.route("/").get((req, res) => {
  Budget.find()
    .then((budgets) => res.json(budgets))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST budget
router.route("/").post((req, res) => {
  const dateStart = Date.parse(req.body.dateStart);
  const dateEnd = Date.parse(req.body.dateEnd);
  const budgetName = req.body.budgetName;
  const description = req.body.description;
  const amount = Number(req.body.amount);

  const newBudget = new Budget({
    dateStart,
    dateEnd,
    budgetName,
    description,
    amount,
  });

  newBudget
    .save()
    .then(() => res.json("Budget added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET one budget
router.route("/:id").get((req, res) => {
  Budget.findById(req.params.id)
    .then((budget) => res.json(budget))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Edit budget
router.route("/:id").put((req, res) => {
  Budget.findById(req.params.id)
    .then((budget) => {
      budget.dateStart = req.body.dateStart;
      budget.dateEnd = req.body.dateEnd;
      budget.budgetName = req.body.budgetName;
      budget.description = req.body.description;
      budget.amount = req.body.amount;

      budget
        .save()
        .then(() => res.json("Budget updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete budget
router.route("/:id").delete((req, res) => {
  Budget.findByIdAndDelete(req.params.id)
    .then(() => res.json("Budget deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
