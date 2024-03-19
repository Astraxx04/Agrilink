const express = require("express");
const router = express.Router();

const {
    getEquipment,
    postEquipment,
    getCrop,
    postCrop,
    getFertilizer,
    postFertilizer,
    getCattle,
    postCattle,
} = require("../controllers/market");

router.route("/getEquipment").get(getEquipment);
router.route("/postEquipment").post(postEquipment);

router.route("/getCrop").get(getCrop);
router.route("/postCrop").post(postCrop);

router.route("/getFertilizer").get(getFertilizer);
router.route("/postFertilizer").post(postFertilizer);

router.route("/getCattle").get(getCattle);
router.route("/postCattle").post(postCattle);

module.exports = router;