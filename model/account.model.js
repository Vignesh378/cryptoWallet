const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  tokens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }],
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  qrcode:{
    type:String,
    required:true,
    unique:true,
  }
});

module.exports = mongoose.model('Wallet', walletSchema);