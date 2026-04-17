const mongoose=require('mongoose');
const { type } = require('os');
const { ref } = require('process');

const UserSchema=new mongoose.Schema({
 username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
 seedDetails:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'./seeds.model.js',
 },
 wallets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }]
},{timestamps:true});

const UserModel= mongoose.model('User',UserSchema);

module.exports=UserModel;