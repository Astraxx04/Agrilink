const mongoose = require("mongoose");

const FertilizersSchema=mongoose.Schema({
    id:Number,
    name:String,
    material:String,
    price:Number,
    phone:Number
});

module.exports = mongoose.model('FertilizerData',FertilizersSchema);