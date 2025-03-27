const db = require("../db/queries");

async function getGames(req, res) {
  const { genre } = req.query;
  if (!genre) {
    const games = await db.getAllGames();
    res.render("game-list", { games: games, genre: undefined });
  } else {
    const games = await db.getGamesByGenre(genre);
    res.render("game-list", { games: games, genre: genre });
  }
}

module.exports = { getGames };
