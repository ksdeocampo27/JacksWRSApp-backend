const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
  customerName: { type: String },
  type: { type: String, enum: ['Walk-In', 'Delivery'], required: true },
  item: { type: String }, // e.g. "Slim Refill", "Round Refill", "Bottled Water"
  quantity: { type: Number, required: true },
  pricePerUnit: Number, // price per unit for this sale
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'Gcash', 'Free', 'Marketing', 'Return'], required: true },
  status: { type: String, enum: ['Paid', 'Unpaid', 'Free'] },
  customerContainerQty: { type: Number, default: 0 },
  containerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }],
  remarks: String
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;

  // items:
  // 'Refill (Slim 5gal)'
  // 'Refill (Round 5gal)'
  // 'New (Slim 5gal)'
  // 'New (Round 5gal)'
  // 'Plan A - Standard Plan'
  // 'Plan B - Family Plan'
  // 'Plan C - Business Plan'
  // 'Plan D - Enterprise Plan'
  // 'Plan E - Custom Plan'
  // 'Big Cap'
  // 'Small Cap'
  // 'Faucet'
  // 'Others'
  // 'Bottled Water (500mL)'
  // 'Bottled Water (1000mL)'
  // 'Dispenser"