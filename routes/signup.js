const express=require('express');
const path=require('path');
const app=express();
const router=express.Router();
router.use(express.static(path.join(__dirname,'public')));
const {handllingSignupFrom}=require('../controllers/Signup.controller')
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/signup.html'));
})
router.post('/',handllingSignupFrom
);
module.exports=router;