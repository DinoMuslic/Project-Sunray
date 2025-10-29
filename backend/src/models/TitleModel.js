const db = require('../db');

const getTitles = async () => {
    try {   
        const [rows] = await db.query("SELECT DISTINCT title, category FROM titles ORDER BY title");
        return rows;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
}

const insertTitle = async (title, category) => {
    try {
        await db.query("INSERT INTO titles(title, category) VALUES(?, ?)", [title, category])
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
}

const getTitleCounts = async () => {
  try {
    const [rows] = await db.query(`
      SELECT title, COUNT(*) AS count FROM (
        SELECT JSON_UNQUOTE(JSON_EXTRACT(titles, CONCAT('$[', n.n, ']'))) AS title
        FROM watchlists
        JOIN (
          SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3
          UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7
          UNION ALL SELECT 8 UNION ALL SELECT 9
        ) n
        ON n.n < JSON_LENGTH(titles)
      ) AS all_titles
      GROUP BY title
      ORDER BY count DESC
      LIMIT 10
    `);

    return rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

module.exports = { getTitles, insertTitle, getTitleCounts }