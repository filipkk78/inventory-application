const db = require("../db/queries");

async function deleteGenreAuth(req, res) {
  const { name } = req.params;
  const genre = await db.getGenreByName(name);
  res.render("delete-genre-auth", { genre: genre[0] });
}

module.exports = { deleteGenreAuth };
