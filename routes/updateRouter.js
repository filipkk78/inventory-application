const { Router } = require("express");
const express = require("express");
const path = require("node:path");
const { updateGame } = require("../controllers/updateGame.js");
const { updateGenre } = require("../controllers/updateGenre.js");

const updateRouter = Router();
const assetsPath = path.join(__dirname, "../public");
updateRouter.use(express.static(assetsPath));
updateRouter.use(express.urlencoded({ extended: true }));

updateRouter.get("/", (req, res) => res.render("update-index"));
updateRouter.get("/game", (req, res) => res.render("update-game-form"));
updateRouter.get("/genre", (req, res) => res.render("update-genre-form"));
// updateRouter.post("/game", updateGame);
// updateRouter.post("/genre", updateGenre);

module.exports = updateRouter;
