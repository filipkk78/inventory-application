const db = require("../db/queries");

async function getGame(req, res) {
  const { title } = req.params;
  const game = await db.getGameByTitle(title);
  const genres = await db.getGameGenres(title);
  const devs = await db.getGameDevs(title);
  res.render("game-details", { game: game[0], genres: genres, devs: devs });
}

module.exports = { getGame };
