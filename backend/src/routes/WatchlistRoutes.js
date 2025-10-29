const express = require("express");
const { getWatchlists, insertWatchlist} = require("../controllers/WatchlistController");


const router = express.Router();

router.get("/", getWatchlists);
router.post("/", insertWatchlist);

module.exports = router;