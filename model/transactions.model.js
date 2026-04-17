const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['send', 'receive'] },
  amount: {
    type:Number,
    default:0,
  },
  token: { type: mongoose.Schema.Types.ObjectId, ref: 'Token' },
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);