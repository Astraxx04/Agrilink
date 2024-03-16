const { default: mongoose, model } = require("mongoose");


const FertilizersSchema=mongoose.Schema({
    id:Number,
    name:String,
    material:String,
    price:Number,
    phone:Number
})

const Fertilizer=new mongoose.model('FertilizerData',FertilizersSchema);
module.exports=Fertilizer;