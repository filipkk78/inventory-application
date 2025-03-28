const { Router } = require("express");
const express = require("express");
// const { updateGame } = require("../controllers/updateGame.js");
const { updateGenre } = require("../controllers/genreController.js");
// const { updateGameForm } = require("../controllers/updateGameForm.js");
const { updateGenreForm } = require("../controllers/updateGenreForm.js");

const updateRouter = Router();
updateRouter.use(express.urlencoded({ extended: true }));

updateRouter.get("/", (req, res) => res.render("update-index"));
updateRouter.get("/game/:title", (req, res) => res.render("update-game-form"));
updateRouter.get("/genre/:name", updateGenreForm);
// updateRouter.post("/game", updateGame);
updateRouter.post("/genre", updateGenre);

module.exports = updateRouter;
