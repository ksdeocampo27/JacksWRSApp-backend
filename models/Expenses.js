const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now }, //Date of expense
    description: {type: String, required: true}, //Expense details
    category: String, // General Category {Assets,Overhead Cost,Liability,Operating Cost,Cost of Goods Sold}
    type: String, 
    store: String,
    quantity: Number,
    unit: String,
    unitPrice: Number,
    amount: { type: Number, required: true}
});

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;