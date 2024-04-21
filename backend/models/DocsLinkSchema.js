const mongoose = require("mongoose");

const DocsLinkSchema = mongoose.Schema({
    user_id: Number,
    aadharLink: {
        public_id: String,
        url: String
    },
    panLink: {
        public_id: String,
        url: String
    },
    profileLink: {
        public_id: String,
        url: String
    }
});

module.exports = mongoose.model('DocsLinkData',DocsLinkSchema);