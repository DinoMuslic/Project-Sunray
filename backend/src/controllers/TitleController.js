const Title = require("../models/TitleModel");

const getTitles = async (req, res) => {
  try {
    const titles = await Title.getTitles();
    res.status(200).json(titles);
  } catch (error) {
    console.error("Error fetching titles:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const insertTitle = async (req, res) => {
  try {
    const { title, category } = req.body;
    await Title.insertTitle(title, category);
    res.status(201).json({ message: "Title added successfully" });
  } catch (error) {
    console.error("Error inserting title:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getTitleCounts = async (req, res) => {
  try {
    const titleCounts = await Title.getTitleCounts();
    res.status(200).json(titleCounts);
  } catch (error) {
    console.error("Error fetching title counts:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getTitles, insertTitle, getTitleCounts };
