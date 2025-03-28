const db = require("../db/queries");

async function deleteGameAuth(req, res) {
  const { title } = req.params;
  const game = await db.getGameByTitle(title);
  res.render("delete-game-auth", { game: game[0] });
}

module.exports = { deleteGameAuth };
