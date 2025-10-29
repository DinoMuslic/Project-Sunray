const Watchlist = require("../models/WatchlistModel");
const { bannedKeywords } = require("../blocklist");

const getWatchlists = async (req, res) => {
  try {
    const watchlists = await Watchlist.getWatchlists();
    res.status(200).json(watchlists);
  } catch (error) {
    console.error("Error fetching watchlists:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const insertWatchlist = async (req, res) => {
  try {
    const { name, titles } = req.body;

    const blockedTitles = titles.filter((title) =>
      bannedKeywords.some((keyword) =>
        title.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    if (blockedTitles.length > 0) {
      return res
        .status(400)
        .json({
          error: "Some titles are blocked due to licensing restrictions.",
        });
    }

    await Watchlist.insertWatchlist(name, titles);
    res.status(201).json({ message: "Watchlist added successfully" });
  } catch (error) {
    console.error("Error inserting watchlist:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getTitleCounts = async (req, res) => {
  try {
    const titleCounts = await Watchlist.getTitleCounts();
    res.status(200).json(titleCounts);
  } catch (error) {
    console.error("Error fetching title counts:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getWatchlists, insertWatchlist };
