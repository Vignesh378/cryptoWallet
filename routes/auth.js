const express=require('express');
const Web3=require('web3');
const Qrcode=require('qrcode');
require('dotenv').config();
const router=express.Router();
const  Seeds=require('../model/seeds.model');
const Wallet=require('../model/account.model');
const UserModel=require('../model/user.model');
router.post('/', async (req, res) => {
  try {
    const { seed } = req.body;
  console.log(seed);
    if (!seed) {
      return res.status(400).json({ message: "Seed phrase is required" });
    }

    const apikey = process.env.apikey;
    const network = 'sepolia';
    const node = `https://eth.getblock.io/${network}/?api_key=${apikey}`;
    const web3 = new Web3(node);

    const accountTo = web3.eth.accounts.create();

    const find = await Seeds.findOne({ seed });

if (!find) {
  return res.status(404).json({ message: "Please enter a valid seed" });
}
const qrCode = await Qrcode.toDataURL(accountTo.address); // <-- FIXED
const user = await UserModel.findOne({ seedDetails: find._id });
const walletDoc = await Wallet.create({ address: accountTo.address, qrcode: qrCode });
user.wallets = walletDoc._id;
await user.save();



 res.status(200).json({
  redirect:'/dashboard'
 });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

 module.exports=router;