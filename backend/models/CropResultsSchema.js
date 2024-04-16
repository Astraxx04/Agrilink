const mongoose = require('mongoose');

const CropResultsSchema = mongoose.Schema({
    user_id:String,
    crop:String,
    fertilizer:String,
    cost:String,
    revenue:String,
    quantity:String,
    duration:String,
    demand:String,
    mixedcrop:String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('CropResults', CropResultsSchema);