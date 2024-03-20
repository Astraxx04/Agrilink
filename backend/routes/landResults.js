const express = require("express");
const router = express.Router();

const { postLandResult, getAllLandResults } = require("../controllers/landResults");

router.route("/getAllLandResults").get(getAllLandResults);
router.route("/postLandResult").post(postLandResult);

module.exports = router;