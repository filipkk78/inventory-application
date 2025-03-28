const db = require("../db/queries");

async function newGameForm(req, res) {
  const genres = await db.getAllGenres();
  const devs = await db.getAllDevs();
  res.render("game-form", { genres: genres, devs: devs });
}

module.exports = { newGameForm };
