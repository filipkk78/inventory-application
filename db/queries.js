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

async function getGameByTitle(title) {
  const { rows } = await pool.query("SELECT * FROM games WHERE title = ($1)", [
    title,
  ]);
  return rows;
}

async function getGameGenres(title) {
  const { rows } = await pool.query(
    "SELECT name FROM genres WHERE id IN (SELECT genre_id FROM game_genre WHERE game_id = (SELECT id FROM games WHERE title = ($1)))",
    [title]
  );
  return rows;
}

async function getGameDevs(title) {
  const { rows } = await pool.query(
    "SELECT name FROM devs WHERE id IN (SELECT dev_id FROM game_dev WHERE game_id = (SELECT id FROM games WHERE title = ($1)))",
    [title]
  );
  return rows;
}

module.exports = {
  getAllGames,
  getAllGenres,
  getGamesByGenre,
  getGameByTitle,
  getGameDevs,
  getGameGenres,
};
