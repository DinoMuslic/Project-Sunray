const db = require('../db');

const getWatchlists = async () => {
    try {   
        const [rows] = await db.query("SELECT * FROM watchlists");
        return rows;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
}

const insertWatchlist = async (name, titles) => {
    try {
        const titlesJson = JSON.stringify(titles);
        await db.query("INSERT INTO watchlists(name, titles) VALUES(?, ?)", [name, titlesJson])
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
}

module.exports = { getWatchlists, insertWatchlist }