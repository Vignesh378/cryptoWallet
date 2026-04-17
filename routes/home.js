const path=require("path")
const express=require('express');
const router=express.Router(); 
router.use(express.static(path.join(__dirname,'../public')));
const {handllingNewsFrom}=require('../controllers/home.controller');
router.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'../public/index.html'));
})
router.post('/form',handllingNewsFrom);
router.get('/Company',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/Company.html'));
})
router.get('/News',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/news.html'));
})

module.exports=router;