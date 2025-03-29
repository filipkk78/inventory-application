const { Router } = require("express");
const express = require("express");
const { updateGame } = require("../controllers/gameController.js");
const { updateGenre } = require("../controllers/genreController.js");
const { updateGameForm } = require("../controllers/updateGameForm.js");
const { updateGenreForm } = require("../controllers/updateGenreForm.js");

const updateRouter = Router();
updateRouter.use(express.urlencoded({ extended: true }));

updateRouter.get("/game/:title", updateGameForm);
updateRouter.get("/genre/:name", updateGenreForm);
updateRouter.post("/game", updateGame);
updateRouter.post("/genre", updateGenre);

module.exports = updateRouter;
