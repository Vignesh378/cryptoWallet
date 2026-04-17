const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  symbol: String,       
  name: String,
  balance: {
    type:String,
    default:0,
  },
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }
});

module.exports = mongoose.model('Token', tokenSchema);