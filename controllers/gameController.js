const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const validateGame = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage(`Title must be between 1 and 80 characters`),
  body("releaseDate")
    .trim()
    .isISO8601()
    .withMessage(`Date must be in the yyyy-mm-dd format`),
  body("imageUrl")
    .optional()
    .default("https://placehold.co/600x900?text=Game+Placeholder&font=roboto")
    .trim()
    .isURL()
    .withMessage("Image url must be an url"),
  body("genreList")
    .customSanitizer((value) => JSON.parse(value))
    .toArray()
    .isArray({ min: 1 })
    .withMessage("You must select at least one genre"),
  body("devList")
    .customSanitizer((value) => JSON.parse(value))
    .toArray()
    .isArray({ min: 1 })
    .withMessage("You must select at least one developer"),
  body("description")
    .isString({ min: 30, max: 200 })
    .withMessage("Description must be between 30 and 200 characters long"),
];

exports.addGame = [
  validateGame,
  async (req, res) => {
    res.set("Content-Type", "application/json");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const genres = await db.getAllGenres();
      const devs = await db.getAllDevs();
      return res.status(400).render("game-form", {
        genres: genres,
        devs: devs,
        errors: errors.array(),
      });
    }
    const { title, releaseDate, imageUrl, genreList, devList, description } =
      req.body;
    await db.addGame(
      title,
      releaseDate,
      imageUrl,
      genreList,
      devList,
      description
    );
    res.redirect("/");
  },
];

const validateAdminPwd = [
  body("pwd")
    .trim()
    .equals(process.env.ADMIN_PWD)
    .withMessage("Incorrect password"),
];

exports.deleteGame = [
  validateAdminPwd,
  async (req, res) => {
    const { title } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("delete-game-auth", {
        errors: errors.array(),
        game: await db.getGameByTitle(title),
      });
    }
    await db.deleteGame(title);
    res.redirect("/");
  },
];

exports.updateGame = [
  validateGame,
  async (req, res) => {
    res.set("Content-Type", "application/json");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { title } = req.body;
      const genres = await db.getAllGenres();
      const devs = await db.getAllDevs();
      const selectedGenres = await db.getGameGenres(title);
      const selectedDevs = await db.getGameDevs(title);
      const game = await db.getGameByTitle(title);
      return res.status(400).render("game-form", {
        genres: genres,
        devs: devs,
        selectedGenres: selectedGenres,
        selectedDevs: selectedDevs,
        game: game,
        errors: errors.array(),
      });
    }
    const {
      title,
      releaseDate,
      imageUrl,
      genreList,
      devList,
      description,
      oldTitle,
    } = req.body;
    await db.updateGame(
      title,
      releaseDate,
      imageUrl,
      genreList,
      devList,
      description,
      oldTitle
    );
    res.redirect("/");
  },
];
