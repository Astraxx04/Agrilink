const mongoose = require("mongoose");

const CattleSchema = mongoose.Schema({
    id:Number,
    name:String,
    type:String,
    price:Number,
    phone:Number
});

module.exports = mongoose.model('CattleData',CattleSchema);