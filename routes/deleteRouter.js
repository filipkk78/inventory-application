const { Router } = require("express");
const express = require("express");
const { deleteGame } = require("../controllers/gameController.js");
const { deleteGenre } = require("../controllers/genreController.js");
const { deleteGenreAuth } = require("../controllers/deleteGenreAuth.js");
const { deleteGameAuth } = require("../controllers/deleteGameAuth.js");

const deleteRouter = Router();
deleteRouter.use(express.urlencoded({ extended: true }));

deleteRouter.get("/game/:title", deleteGameAuth);
deleteRouter.get("/genre/:name", deleteGenreAuth);
deleteRouter.post("/game", deleteGame);
deleteRouter.post("/genre", deleteGenre);

module.exports = deleteRouter;
