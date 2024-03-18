const { default: mongoose, model } = require("mongoose");


const CattleSchema=mongoose.Schema({
    id:Number,
    name:String,
    type:String,
    price:Number,
    phone:Number
})

const Cattle=new mongoose.model('CattleData',CattleSchema);
module.exports=Cattle;