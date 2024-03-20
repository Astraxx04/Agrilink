const express = require("express");
const router = express.Router();

const { postCropResult, getAllCropResults } = require("../controllers/cropResults");

router.route("/getAllCropResults").get(getAllCropResults);
router.route("/postCropResult").post(postCropResult);

module.exports = router;