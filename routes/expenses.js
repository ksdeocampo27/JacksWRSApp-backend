const express = require('express');
const router = express.Router();
const Expenses = require('../models/Expenses');

// CREATE - Add new expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expenses(req.body);
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expenses.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - Get single expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expenses.findById(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Update expense by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedExpense = await Expenses.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExpense) return res.status(404).json({ error: 'Expense not found' });
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Delete expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedExpense = await Expenses.findByIdAndDelete(req.params.id);
    if (!deletedExpense) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
