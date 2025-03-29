const db = require("../db/queries");

async function updateGameForm(req, res) {
  const { title } = req.params;
  const genres = await db.getAllGenres();
  const devs = await db.getAllDevs();
  const game = await db.getGameByTitle(title);
  const selectedGenres = await db.getGameGenres(title);
  const selectedDevs = await db.getGameDevs(title);
  res.render("update-game-form", {
    game: game[0],
    genres: genres,
    devs: devs,
    selectedGenres: selectedGenres,
    selectedDevs: selectedDevs,
  });
}

module.exports = { updateGameForm };
