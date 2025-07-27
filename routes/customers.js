const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Sales = require('../models/Sales');

// ==========================================
// CREATE - Add new inventory item
// ==========================================
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// READ - Get all inventory items
// ==========================================
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - Get a single customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Update a customer by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) return res.status(404).json({ error: 'Customer not found' });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Delete a customer by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET customer profile with sales
router.get('/:id/profile', async (req, res) => {
  try {
    const customerId = req.params.id;

    // Get customer details
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    // Get sales records for this customer, sorted latest first
    const sales = await Sales.find({ customerId }).sort({ date: -1 }).populate("containerIds", "id name status");

    // Last transaction date from sales
    const lastTransaction = sales.length > 0 ? sales[0].date : null;

    res.json({
      customer,
      lastTransaction,
      sales
    });

  } catch (err) {
    console.error("Error fetching customer profile:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;