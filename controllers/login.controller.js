const UserModel = require("../model/user.model");
const Wallet = require('../model/account.model');
const qrCode = require('qrcode');
const {setUser}=require('../services/auth')


async function validateLogin(req, res)  {
    try {
        const { email, password } = req.body;
// This will only work if the email and password match exactly
 console.log('hello')
   console.log(email,password);
const user = await UserModel.findOne({ email});
    console.log(user)  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
   const wallet = await Wallet.findById(user.wallets);
     
     const token= setUser(user); 
     res.cookie("uid",token);
      return  res.render('dashboard',{walletAddress:wallet.address,qrCode:wallet.qrcode});
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports={validateLogin};