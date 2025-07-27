const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  id: { type: Number }, // e.g. 1, 2, 3
  name: { type: String }, // e.g. "S001", "R003"
  type: { 
    type: String, 
    enum: ['Slim', 'Round', 'Dispenser'], 
    default: 'Stock In' 
  },
  status: { 
    type: String, 
    enum: ['Stock In', 'Issued', 'Lost', 'Repaired', 'Damaged'], 
    default: 'Stock In' 
  },
  dateOfPurchase: Date,
  remarks: String,
  records: [{
    salesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sales' },
    date: Date,
    customerName: String
  }]
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;