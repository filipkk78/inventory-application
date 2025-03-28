const db = require("../db/queries");

async function getGame(req, res) {
  const { title } = req.params;
  const game = await db.getGameByTitle(title);
  res.render("game-details", { game: game[0] });
}

module.exports = { getGame };
