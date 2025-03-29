const { Router } = require("express");
const express = require("express");
const { addGame } = require("../controllers/gameController.js");
const { addGenre } = require("../controllers/genreController.js");
const { newGameForm } = require("../controllers/newGameForm.js");
const { newGenreForm } = require("../controllers/newGenreForm.js");

const newRouter = Router();
newRouter.use(express.urlencoded({ extended: true }));

newRouter.get("/game", newGameForm);
newRouter.get("/genre", newGenreForm);
newRouter.post("/game", addGame);
newRouter.post("/genre", addGenre);

module.exports = newRouter;
