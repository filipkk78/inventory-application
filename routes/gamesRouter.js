const { Router } = require("express");
const { getGames } = require("../controllers/getGames.js");
const { searchGames } = require("../controllers/searchGames.js");
const gamesRouter = Router();

gamesRouter.get("/", getGames);
gamesRouter.get("/:id", searchGames);

module.exports = gamesRouter;
