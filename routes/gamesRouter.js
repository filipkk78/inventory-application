const { Router } = require("express");
const { getGames } = require("../controllers/getGames.js");
const { getGame } = require("../controllers/getGame.js");
const gamesRouter = Router();

gamesRouter.get("/", getGames);
gamesRouter.get("/:title", getGame);

module.exports = gamesRouter;
