const express = require("express");
const { getTitles, insertTitle, getTitleCounts } = require("../controllers/TitleController");


const router = express.Router();

router.get("/", getTitles);
router.get("/top", getTitleCounts);
router.post("/", insertTitle);

module.exports = router;