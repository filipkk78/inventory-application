const { Router } = require("express");
const express = require("express");
const path = require("node:path");
const { addGame } = require("../controllers/newGame.js");
const { addGenre } = require("../controllers/newGenre.js");

const newRouter = Router();
const assetsPath = path.join(__dirname, "../public");
newRouter.use(express.static(assetsPath));
newRouter.use(express.urlencoded({ extended: true }));

newRouter.get("/", (req, res) => res.render("new-index"));
newRouter.get("/game", (req, res) => res.render("game-form"));
newRouter.get("/genre", (req, res) => res.render("genre-form"));
// newRouter.post("/game", addGame);
// newRouter.post("/genre", addGenre);

module.exports = newRouter;
