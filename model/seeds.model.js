const mongoose=require('mongoose');
const { type } = require('os');

const SeedSchema=new mongoose.Schema({
    seed:{
        type:String,
        required:true,
        unique:true,
    }
    
    
},{timestamps:true});

const Seeds=mongoose.model('Seeds',SeedSchema);

module.exports=Seeds;