const express = require('express');
const router = express.Router();
const {validateLogin}=require('../controllers/login.controller');
router.post('/', validateLogin);
router.get('/',(req,res)=>{
    res.render('login');
})
module.exports = router;