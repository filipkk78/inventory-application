const db = require("../db/queries");

async function updateGenreForm(req, res) {
  const { name } = req.params;
  const genre = await db.getGenreByName(name);
  res.render("update-genre-form", { genre: genre[0] });
}

module.exports = { updateGenreForm };
