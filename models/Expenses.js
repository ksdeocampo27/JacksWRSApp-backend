const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now }, //Date of expense
    description: {type: String }, //Expense details
    category: { type: String }, // General Category {Assets,Overhead Cost,Liability,Operating Cost,Cost of Goods Sold}
    type: { type: String }, 
    store: String,
    quantity: Number,
    unit: String,
    unitPrice: Number,
    totalAmount: { type: Number, required: true },
    remarks: String
});

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;