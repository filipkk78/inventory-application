const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games ORDER BY title");
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres ORDER BY name");
  return rows;
}

async function getGamesByGenre(genre) {
  const { rows } = await pool.query(
    "SELECT * FROM games WHERE id IN (SELECT game_id FROM game_genre WHERE genre_id = (SELECT id FROM genres WHERE name = ($1)))",
    [genre]
  );
  return rows;
}

module.exports = {
  getAllGames,
  getAllGenres,
  getGamesByGenre,
};
