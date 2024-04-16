const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    address: String,
    aadharNo: String,
    panNo: String,
    user_id: String,
});

module.exports = mongoose.model('User', UserSchema);