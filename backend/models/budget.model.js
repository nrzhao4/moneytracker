const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const budgetSchema = new Schema(
  {
    budgetName: { type: String, required: true },
    budgetType: { type: String, required: true },
    description: { type: String, required: false },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
