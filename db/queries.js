const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games ORDER BY title");
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres ORDER BY name");
  return rows;
}

async function getAllDevs() {
  const { rows } = await pool.query("SELECT * FROM devs ORDER BY name");
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

async function addGame(
  title,
  releaseDate,
  imageUrl,
  genreList,
  devList,
  description
) {
  await pool.query(
    "INSERT INTO games (title, release_date, image_url, description) VALUES (($1), ($2), ($3), ($4))",
    [title, releaseDate, imageUrl, description]
  );
  const game = await getGameByTitle(title);
  const gameId = game[0].id;

  for await (dev of devList) {
    await pool.query(
      "INSERT INTO game_dev (game_id, dev_id) VALUES (($1), ($2))",
      [gameId, dev]
    );
  }

  for await (genre of genreList) {
    await pool.query(
      "INSERT INTO game_genre (game_id, genre_id) VALUES (($1), ($2))",
      [gameId, genre]
    );
  }
  return;
}

async function addGenre(name, imageUrl) {
  await pool.query("INSERT INTO genres (name, image_url) VALUES (($1), ($2))", [
    name,
    imageUrl,
  ]);
  return;
}

module.exports = {
  getAllGames,
  getAllGenres,
  getAllDevs,
  getGamesByGenre,
  getGameByTitle,
  getGameDevs,
  getGameGenres,
  addGame,
  addGenre,
};
