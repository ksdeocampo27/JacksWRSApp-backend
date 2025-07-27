const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nickname: String,
  phone: String,
  address: String,
  landmark: String,
  frequency: Number,
  birthday: Date,
  remarks: String,
  lastTransactionDate: Date,
  createdAt: { type: Date, default: Date.now },
  containers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Container' }]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

