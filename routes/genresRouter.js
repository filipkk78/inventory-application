const { Router } = require("express");
const { getGenres } = require("../controllers/getGenres.js");
const genresRouter = Router();

genresRouter.get("/", getGenres);

module.exports = genresRouter;
