const { signupUser, loginUser, logoutUser, getUserDetails } = require("../controllers/user");

const express = require("express");
const router = express.Router();

router.route("/signupUser").post(signupUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").post(logoutUser);
router.route("/getUserDetails/:userId").get(getUserDetails);

module.exports = router;