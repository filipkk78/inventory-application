const { Router } = require("express");
const { getGames } = require("../controllers/getGames.js");
const gamesRouter = Router();

gamesRouter.get("/", getGames);

module.exports = gamesRouter;
