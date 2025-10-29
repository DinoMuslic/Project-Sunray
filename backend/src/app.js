const express = require("express");
const app = express();
const cors = require("cors");

const titleRoutes = require("./routes/TitleRoutes")
const watchlistRoutes = require("./routes/WatchlistRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/titles", titleRoutes);
app.use("/api/watchlist", watchlistRoutes);

module.exports = app;