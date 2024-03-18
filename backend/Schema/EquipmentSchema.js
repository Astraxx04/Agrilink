const { default: mongoose, model } = require("mongoose");


const EquipmentSchema=mongoose.Schema({
    id:Number,
    name:String,
    material:String,
    price:Number,
    Phone:Number
})

const Equipment=new mongoose.model('Equipment',EquipmentSchema);
module.exports=Equipment;