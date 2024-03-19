const mongoose = require("mongoose");

const CropSchema = mongoose.Schema({
    id:Number,
    name:String,
    material:String,
    price:Number,
    phone:Number
});

module.exports = mongoose.model('CropData',CropSchema);