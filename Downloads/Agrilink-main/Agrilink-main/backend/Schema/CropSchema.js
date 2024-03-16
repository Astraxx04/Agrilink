const { default: mongoose, model } = require("mongoose");


const CropSchema=mongoose.Schema({
    id:Number,
    name:String,
    material:String,
    price:Number,
    phone:Number
})

const Crop=new mongoose.model('CropData',CropSchema);
module.exports=Crop;