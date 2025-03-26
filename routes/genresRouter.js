const { Router } = require("express");
const { getGenres } = require("../controllers/getGenres.js");
const { searchGenres } = require("../controllers/searchGenres.js");
const genresRouter = Router();

genresRouter.get("/", getGenres);
genresRouter.get("/:id", searchGenres);

module.exports = genresRouter;
