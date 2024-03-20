const mongoose = require('mongoose');

const LandResultsSchema = mongoose.Schema({
    id:Number,
    location:String,
    district:String,
    state:String,
    area:String,
    type:String,
    estimate:String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('LandResults', LandResultsSchema);