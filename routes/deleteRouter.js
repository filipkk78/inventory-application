const { Router } = require("express");
const express = require("express");
// const { deleteGame } = require("../controllers/deleteGame.js");
// const { deleteGenre } = require("../controllers/deleteGenre.js");

const deleteRouter = Router();
deleteRouter.use(express.urlencoded({ extended: true }));

deleteRouter.get("/", (req, res) => res.render("delete-index"));
deleteRouter.get("/game", (req, res) => res.render("delete-game-form"));
deleteRouter.get("/genre", (req, res) => res.render("delete-genre-form"));
// deleteRouter.post("/game", deleteGame);
// deleteRouter.post("/genre", deleteGenre);

module.exports = deleteRouter;
