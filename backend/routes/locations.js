const express = require("express");
const router = express.Router();

const {
    getLocation,
    location
} = require("../controllers/locations");

router.route("/getLocation").get(getLocation);
router.route("/location").get(location);

module.exports = router;