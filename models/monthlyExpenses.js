const mongoose = require('mongoose');

const monthlyExpensesSchema = mongoose.Schema({
  period: String,
  name: String,
  cost: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

// period = how often do I pay for these things
// name = name of the expense
// cost = cost of the expense
// owner = who's spending money

const monthlyExpense = mongoose.model('monthlyexpenses', monthlyExpensesSchema);

module.exports = monthlyExpense;