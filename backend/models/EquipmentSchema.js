const mongoose = require("mongoose");

const EquipmentSchema = mongoose.Schema({
    id:Number,
    name:String,
    material:String,
    price:Number,
    Phone:Number
})

module.exports = mongoose.model('Equipment', EquipmentSchema);