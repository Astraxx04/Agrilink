const express = require("express");
const router = express.Router();

const { postDocsLinks } = require("../controllers/documentsLink");

router.route("/postDocsLink").post(postDocsLinks);

module.exports = router;